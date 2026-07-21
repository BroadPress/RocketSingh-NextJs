import type { Metadata } from "next";
import Image from "next/image";
import PlatformStoreButtons from "../../components/PlatformStoreButtons";

export const metadata: Metadata = {
  title: "Download App | RocketSingh",
  description: "Download the RocketSingh app for superfast on demand home services.",
};

export default function DownloadAppPage() {
  return (
    <div className="min-h-[calc(100dvh-12rem)] bg-gradient-to-b from-white via-teal-50 to-white pb-24 md:pb-16">
      <section className="bg-[#0E4541] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Download App</h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-teal-50">
          Scan the QR code or use the store buttons below to get the RocketSingh app.
        </p>
      </section>

      <div className="flex flex-col items-center justify-center px-6 py-10 sm:py-14">
        <figure className="w-full max-w-[min(78vw,300px)] sm:max-w-[320px] p-4 sm:p-5">
          <Image
            src="/d/download-qr.png"
            alt="Scan to download the RocketSingh app"
            width={1024}
            height={1024}
            priority
            className="h-auto w-full object-contain"
          />
        </figure>

        <div className="mt-8 w-full max-w-md">
          <PlatformStoreButtons className="px-4 py-6 rounded-2xl shadow-lg bg-white/70" />
        </div>
      </div>
    </div>
  );
}
