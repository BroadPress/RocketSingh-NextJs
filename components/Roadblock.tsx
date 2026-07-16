"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const COOKIE_NAME = "roadblock_seen";
const IMAGE_LOAD_BUDGET_MS = 6_000;
const CLOSE_UNLOCK_SECONDS = 6;
const AUTO_CLOSE_SECONDS = 6;

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setDailyCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=86400; Path=/; SameSite=Lax`;
}

/** Prefetch so the browser starts the download before React paints. */
function injectPreload(href: string) {
  if (document.querySelector(`link[data-roadblock-preload="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.setAttribute("data-roadblock-preload", href);
  document.head.appendChild(link);
}

function loadImage(src: string, signal: AbortSignal) {
  return new Promise<boolean>((resolve) => {
    if (signal.aborted) {
      resolve(false);
      return;
    }

    const img = new Image();
    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      img.onload = null;
      img.onerror = null;
      resolve(ok);
    };

    img.onload = () => done(true);
    img.onerror = () => done(false);
    signal.addEventListener("abort", () => done(false), { once: true });
    img.src = src;
  });
}

type RoadBlockProps = {
  onSettled?: () => void;
};

const RoadBlock = ({ onSettled }: RoadBlockProps) => {
  const today = new Date();
  const day = today.getDate();
  const month = MONTH_NAMES[today.getMonth()];

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [showRoadBlock, setShowRoadBlock] = useState(false);
  const [displayTimeLeft, setDisplayTimeLeft] = useState(CLOSE_UNLOCK_SECONDS);
  const [isNarrow, setIsNarrow] = useState(false);
  const settledRef = useRef(false);

  const settle = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    onSettled?.();
  }, [onSettled]);

  const onClose = useCallback(() => {
    document.body.classList.remove("hideScroll");
    document.body.classList.add("showScroll");
    setShowRoadBlock(false);
    settle();
  }, [settle]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 549px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Show roadblock overlay immediately; load image within 6s; once per day via cookie
  useEffect(() => {
    const seen = getCookie(COOKIE_NAME);
    if (seen === todayKey()) {
      settle();
      return;
    }

    const primary = `/roadblock/${month}/${day}.jpg`;
    const fallback = "/roadblock/default/default.jpg";
    injectPreload(primary);
    injectPreload(fallback);

    // Appear first — overlay before image finishes
    setShowRoadBlock(true);
    document.body.classList.add("hideScroll");
    setDailyCookie(COOKIE_NAME, todayKey());

    const controller = new AbortController();
    let finished = false;

    const finish = (src: string | null) => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);

      if (!src) {
        document.body.classList.remove("hideScroll");
        setShowRoadBlock(false);
        settle();
        return;
      }

      setImageSrc(src);
    };

    const timeout = window.setTimeout(() => {
      controller.abort();
      finish(null);
    }, IMAGE_LOAD_BUDGET_MS);

    (async () => {
      // Load both in parallel so a missing daily image doesn't delay the default
      const primaryOk = loadImage(primary, controller.signal);
      const fallbackOk = loadImage(fallback, controller.signal);

      if (await primaryOk) {
        finish(primary);
        return;
      }
      if (controller.signal.aborted || finished) return;

      if (await fallbackOk) {
        finish(fallback);
        return;
      }
      if (controller.signal.aborted || finished) return;

      finish(null);
    })();

    return () => {
      finished = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [month, day, settle]);

  // Countdown + auto-close only after the banner image is visible
  useEffect(() => {
    if (!showRoadBlock || !imageReady) return;

    const autoClose = window.setTimeout(onClose, AUTO_CLOSE_SECONDS * 1000);
    const tick = window.setInterval(() => {
      setDisplayTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      window.clearTimeout(autoClose);
      window.clearInterval(tick);
    };
  }, [showRoadBlock, imageReady, onClose]);

  if (!showRoadBlock) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#D0D0D0]">
      <div className="relative">
        {imageReady && (
          <button
            type="button"
            onClick={displayTimeLeft <= 0 ? onClose : undefined}
            aria-label={displayTimeLeft <= 0 ? "Close advertisement" : undefined}
            className={
              isNarrow
                ? "absolute top-10 right-0"
                : "absolute -top-2.5 -right-2.5 sm:-top-2.5 sm:-right-2.5"
            }
            style={{
              backgroundColor: "#055d59",
              borderRadius: "50%",
              border: "0px",
              width: "40px",
              height: "40px",
              textAlign: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: displayTimeLeft <= 0 ? "pointer" : "not-allowed",
            }}
          >
            {displayTimeLeft <= 0 ? "X" : displayTimeLeft}
          </button>
        )}

        {imageSrc ? (
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={imageSrc}
              fetchPriority="high"
              decoding="sync"
              ref={(el) => {
                if (el?.complete && el.naturalWidth > 0) setImageReady(true);
              }}
              onLoad={() => setImageReady(true)}
              className="img-fluid rounded"
              style={{
                borderRadius: "3%",
                objectFit: "contain",
                height: "550px",
                width: "550px",
                opacity: imageReady ? 1 : 0,
                display: "block",
              }}
              alt="Advertisement"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default RoadBlock;
