import { APP_STORE_URL, PLAY_STORE_URL } from "../lib/app-links";

const badgeClass =
  "group bg-white p-3 rounded-2xl shadow-md hover:scale-[1.06] hover:shadow-xl transition-all duration-300";
const imageClass =
  "h-14 sm:h-16 w-auto rounded-xl ring-2 ring-teal-300 group-hover:ring-teal-500 transition-all";

export default function AppDownloadBadges() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 px-10 py-8 rounded-2xl shadow-lg">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeClass}
      >
        <img
          src="/icons/playstore.png"
          alt="Download on Play Store"
          className={imageClass}
        />
      </a>
      {APP_STORE_URL ? (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={badgeClass}
        >
          <img
            src="/icons/apple.png"
            alt="Download on App Store"
            className={imageClass}
          />
        </a>
      ) : (
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
      )}
    </div>
  );
}
