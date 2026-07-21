"use client";

import { useEffect, useState } from "react";

import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/app-links";
import { detectClientPlatform, type ClientPlatform } from "../lib/platform";

const badgeClass =
  "group bg-white p-3 rounded-2xl shadow-md hover:scale-[1.06] hover:shadow-xl transition-all duration-300";
const imageClass =
  "h-14 sm:h-16 w-auto rounded-xl ring-2 ring-teal-300 group-hover:ring-teal-500 transition-all";

type Props = {
  /** Extra class names for the outer flex container. */
  className?: string;
};

function PlayStoreBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={badgeClass}
    >
      <img
        src="/icons/playstore.png"
        alt="Get it on Google Play"
        className={imageClass}
      />
    </a>
  );
}

function AppStoreBadge() {
  if (APP_STORE_URL) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeClass}
      >
        <img
          src="/icons/apple.png"
          alt="Download on the App Store"
          className={imageClass}
        />
      </a>
    );
  }

  return (
    <div
      className="relative rounded-2xl bg-white p-3 shadow-md opacity-75 cursor-not-allowed"
      aria-disabled="true"
      title="Coming soon to the App Store"
    >
      <img
        src="/icons/apple.png"
        alt="App Store — coming soon"
        className={`${imageClass} grayscale`}
      />
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-semibold text-teal-800 sm:text-xs">
        Coming Soon
      </span>
    </div>
  );
}

export default function PlatformStoreButtons({ className = "" }: Props) {
  const [platform, setPlatform] = useState<ClientPlatform | null>(null);

  useEffect(() => {
    setPlatform(detectClientPlatform());
  }, []);

  const showAndroid = platform === "desktop" || platform === "android";
  const showIos = platform === "desktop" || platform === "ios";

  return (
    <div
      className={`flex min-h-[5.5rem] flex-wrap items-center justify-center gap-6 sm:gap-8 ${className}`}
      aria-busy={platform === null}
    >
      {platform === null ? null : (
        <>
          {showAndroid && <PlayStoreBadge />}
          {showIos && <AppStoreBadge />}
        </>
      )}
    </div>
  );
}
