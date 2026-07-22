"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, BookOpen, HelpCircle, Handshake } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { brandAbout, brandTagline } from "../app/data/brandContent";

const mobileNavItems = [
  { label: "Home", href: "/", Icon: Home, isActive: (path: string) => path === "/" },
  { label: "Services", href: "/services", Icon: Wrench, isActive: (path: string) => path.startsWith("/services") },
  { label: "Book", href: "/book", Icon: BookOpen, isActive: (path: string) => path === "/book" },
  { label: "FAQ", href: "/faq", Icon: HelpCircle, isActive: (path: string) => path === "/faq" },
  { label: "Partner", href: "/partnership", Icon: Handshake, isActive: (path: string) => path.startsWith("/partnership") },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <>

      <footer className="relative footer border-t z-10 pt-6 pb-24 md:pt-12 md:pb-10">

        {/* MOBILE FLOATING NAV */}
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-3xl rounded-b-none border border-b-0 border-teal-200/60 bg-white px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/10 md:hidden">
          <div className="grid grid-cols-5 gap-1">
            {mobileNavItems.map(({ label, href, Icon, isActive }) => {
              const active = isActive(pathname);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-center text-[10px] font-medium transition ${
                    active
                      ? "bg-teal-100 text-teal-900 shadow-sm"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-900"
                  }`}
                >
                  <Icon size={20} className="mb-1 text-teal-600" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between gap-10">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[45%]">
            <div className="mb-6">
              <BrandLogo
                imageClassName="h-12 w-12"
                textClassName="brand-name text-2xl font-bold tracking-tight"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </div>

            <p className="text-[15px] leading-relaxed mb-4">
              {brandAbout.hero}
            </p>
            <p className="text-[15px] leading-relaxed mb-4">
              {brandAbout.platform}
            </p>
            <p className="text-[15px] leading-relaxed mb-4 font-medium text-teal-800">
              {brandTagline}
            </p>
          
          </div>

          {/* RIGHT COLUMNS */}
          <div className="w-full lg:w-[50%] grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 pt-6">
            {/* Browse More */}
            <div>
              <h3 className="font-semibold mb-3 text-[16px]">Browse More</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] pl-0">
                <li className="py-1 cursor-pointer">
                  <Link href="/vmgo" className="hover:text-green-700">Vision & Mission</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/history" className="hover:text-green-700">History</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/why" className="hover:text-green-700">Why Us</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/timeline" className="hover:text-green-700">Timeline</Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-3 text-[16px]">Resources</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] pl-0">
                <li className="py-1 cursor-pointer">
                  <Link href="/gallery" className="hover:text-green-700">Gallery</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/qr" className="hover:text-green-700">QR</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/glossary" className="hover:text-green-700">Glossary</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/message" className="hover:text-green-700">Message</Link>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-3 text-[16px]">Links</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] pl-0">
                <li className="py-1 cursor-pointer">
                  <Link href="/calendar" className="hover:text-green-700">Calendar</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/faq" className="hover:text-green-700">FAQ</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/testimonials" className="hover:text-green-700">Testimonials</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/video" className="hover:text-green-700">Video</Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold mb-3 text-[16px]">Explore</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] pl-0">
                <li className="py-1 cursor-pointer">
                  <Link href="/refund" className="hover:text-green-700">Refund Policy</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/partnership" className="hover:text-green-700">Partnership</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/blog" className="hover:text-green-700">Blog</Link>
                </li>
                <li className="py-1 cursor-pointer">
                  <Link href="/team" className="hover:text-green-700">Team</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOCIAL + CONTACT SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between gap-8 mt-10">

          {/* SOCIAL ICONS */}
          <div className="flex gap-6 justify-center">
            <a href="#" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/x.svg`} className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
            </a>
            <a href="https://biratinfo.com/author/rocketsingh" target="_blank" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/biratinfo.svg`} className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
            </a>
            <a href="#" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/youtube.svg`} className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
            </a>
            <a href="#" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/trello.svg`} className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
            </a>
            <a href="https://t.ly/hEgTt" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/powerpoint.svg`} className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
            </a>
            <a href="#" className="flex items-center hover:opacity-60 transition hover:scale-110">
              <img src={`/icons/viber.svg`} className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px] cursor-pointer" />
            </a>
          </div>

          {/* CONTACT BOXES */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <a href="mailto:support@rocketsingh.app" className="flex items-center gap-2 border-2 rounded-lg px-7 py-3 w-full sm:w-auto">
              <img src="/icons/email.svg" alt="email" className="h-6 w-6" />
              <span className="text-sm">support@rocketsingh.app</span>
            </a>

            <a href="tel:+918190074189" className="flex items-center gap-2 border-2 rounded-lg px-7 py-3 w-full sm:w-auto">
              <img src="/icons/phone.svg" alt="phone" className="h-6 w-6" />
              <span className="text-sm">+91-8190074189</span>
            </a>

            <a href="https://wa.me/918190074189" target="_blank" className="flex items-center gap-2 border-2 rounded-lg px-6 py-3 w-full sm:w-auto">
              <img src="/icons/whatsapp.svg" alt="whatsapp" className="h-6 w-6" />
              <span className="text-sm">+91-8190074189</span>
            </a>
          </div>
        </div>

        {/* HORIZONTAL LINE */}
        <div className="w-full border-t mt-14 mb-6"></div>

        {/* FOOTER BOTTOM */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-12 flex flex-col lg:flex-row justify-center items-center lg:justify-between text-[13px] gap-3 text-center md:text-left font-semibold">
          <p className="flex flex-col md:flex-row gap-4 md:gap-1 items-center">
            <span>All Rights Reserved. © 2018-{currentYear}</span>
            <span>RocketSingh</span> <span><span className="hidden md:inline">| </span>सिद्धिर्भवति कर्मजा</span> 
            {/* <span>Built With : <a href="https://broadpress.org" target="_blank" className="hover:border-b hover:border-black text-gray-500">BroadPress</a></span> */}
          </p>

          <div className="flex gap-4 justify-center md:justify-end font-semibold mt-2 lg:mt-0">
            <Link href="/privacy" className="cursor-pointer">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link href="/disclaimer" className="cursor-pointer">Disclaimer</Link>
            <span className="hidden md:inline">|</span>
            <Link href="/tos" className="cursor-pointer">Terms of Service</Link>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;