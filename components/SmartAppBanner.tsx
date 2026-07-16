"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.pracas.rocketsingh";
const AUTO_HIDE_MS = 30_000;
const SCROLL_THRESHOLD = 8;

function isMobileBrowser() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function isStandaloneApp() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

function whenPageFullyLoaded() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

type SmartAppBannerProps = {
  /** Wait until roadblock has finished (shown & closed, skipped, or timed out). */
  ready?: boolean;
};

export default function SmartAppBanner({ ready = true }: SmartAppBannerProps) {
  const [visible, setVisible] = useState(false);
  const [hostname, setHostname] = useState("rocketsingh.app");

  useEffect(() => {
    if (!ready) return;
    if (isStandaloneApp()) return;
    if (!isMobileBrowser()) return;

    let cancelled = false;
    let hidden = false;
    let timer: number | undefined;

    const hide = () => {
      if (hidden) return;
      hidden = true;
      setVisible(false);
      delete document.documentElement.dataset.smartBanner;
    };

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) hide();
    };

    (async () => {
      // Only after roadblock is done AND the page has fully loaded
      await whenPageFullyLoaded();
      if (cancelled || !ready) return;

      setHostname(window.location.hostname.replace(/^www\./, ""));
      setVisible(true);
      document.documentElement.dataset.smartBanner = "visible";

      timer = window.setTimeout(hide, AUTO_HIDE_MS);
      window.addEventListener("scroll", onScroll, { passive: true });
    })();

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      delete document.documentElement.dataset.smartBanner;
    };
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      className="smart-app-banner"
      role="region"
      aria-label="Install RocketSingh App"
    >
      <div className="smart-app-banner__card">
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          unoptimized
          className="smart-app-banner__icon"
        />

        <div className="smart-app-banner__copy">
          <p className="smart-app-banner__title">Install RocketSingh App</p>
          <p className="smart-app-banner__domain">{hostname}</p>
        </div>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="smart-app-banner__install"
        >
          Install
        </a>
      </div>
    </div>
  );
}
