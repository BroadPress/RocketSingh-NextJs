"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AppDownloadBadges from "../components/AppDownloadBadges";
import ServiceCard from "../components/ServiceCard";
import { homeAboutSections, brandAbout } from "./data/brandContent";

const displayLocation = "Chennai, India";

const heroContent = {
  title: `Professional Home Services in ${displayLocation}`,
  subtitle: "AI Powered Services",
};

const sections = homeAboutSections;

const expertServices = [
  {
    title: "Spa at Home",
    desc: "A trained therapist visits your home to provide massages, body treatments, and skincare — wellness services delivered on-site by a verified professional.",
    image: "/services/spa-at-home.jpg",
    href: "/services/spa-at-home",
  },
  {
    title: "Bridal Makeup",
    desc: "A professional makeup artist visits your location to provide a customized bridal look that enhances your natural beauty for your special day.",
    image: "/services/bridal-makeup.jpg",
    href: "/services/bridal-makeup",
  },
  {
    title: "Salon at Home",
    desc: "A verified beauty professional visits your home for haircuts, styling, skincare, and makeup — salon services provided on-site at your location.",
    image: "/services/salon-at-home.jpg",
    href: "/services/salon-at-home",
  },
];

const testimonials = [
  {
    name: "Rajesh Devan",
    image: "/home/testimonials/1.png",
    feedback:
      "Amazing service! The team is punctual, professional, and pays attention to every detail. Highly recommend.",
  },
  {
    name: "Sumnitra Patel",
    image: "/home/testimonials/2.png",
    feedback:
      "Our office has never been cleaner. Consistent, thorough, and friendly staff. Very satisfied!",
  },
  {
    name: "Vikas Pandey",
    image: "/home/testimonials/3.png",
    feedback:
      "Post-renovation cleanup was perfect. Efficient and detail-oriented team. Definitely recommend!",
  },
];

const featuredBlogs = [
  { title: "AC Cleaning Tips", desc: "Simple tricks to keep your air conditioner clean and efficient.", image: "/home/blog/1.jpg", slug: "ac-cleaning" },
  { title: "Bathroom Cleaning Tips", desc: "Expert bathroom sanitization for a hygienic home.", image: "/home/blog/2.jpg", slug: "bathroom-cleaning" },
  { title: "Garden Cleaning Tips", desc: "Tips for keeping your garden clean and well-maintained.", image: "/home/blog/3.jpg", slug: "garden-cleaning" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full font-sans text-gray-800">
      {/* HERO */}
      <section className="w-full bg-white text-teal-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-10 sm:py-16 flex flex-col md:flex-row items-center gap-4 md:gap-16">
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <p className="tracking-wide text-teal-900 text-xs sm:text-sm font-medium">
              SuperFast on Demand Home Service
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-teal-900">
              {heroContent.title}
            </h1>
            <p className="text-base sm:text-lg text-teal-900 font-medium">{heroContent.subtitle}</p>
            <p className="text-sm sm:text-base text-gray-900 max-w-md">
              {brandAbout.short}
            </p>
            <div className="hidden md:flex flex-wrap items-center gap-3 pt-3">
              <Link href="/book" className="bg-[#0E4541] text-white font-semibold px-6 sm:px-8 py-2.5 rounded-full shadow-lg hover:bg-teal-900 transition-all duration-300 animate-pulse-soft">
                Book a Service
              </Link>
              <Link href="/services" className="border border-teal-700 text-teal-900 font-medium px-6 sm:px-7 py-2.5 rounded-full hover:bg-teal-50 transition-all duration-300">
                All Services
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-teal-100 bg-gray-50">
              <Image
                src="/home/hero.png"
                alt="Rocket Singh — Superfast Service"
                width={1024}
                height={512}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="w-full md:hidden flex justify-center gap-3 pt-4">
            <Link href="/book" className="bg-[#0E4541] text-white font-semibold px-6 py-2.5 rounded-full shadow-lg animate-pulse-soft">
              Book a Service
            </Link>
            <Link href="/services" className="border border-teal-700 text-teal-900 font-medium px-6 py-2.5 rounded-full hover:bg-teal-50">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-10 bg-gray-50 overflow-hidden">
        <div className="flex gap-12 animate-scroll whitespace-nowrap">
          {Array.from({ length: 14 }, (_, i) => (
            <img key={i} src={`/partners/${i + 1}.png`} alt={`partner ${i + 1}`} className="h-12 opacity-70" />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <img key={`dup-${i}`} src={`/partners/${i + 1}.png`} alt="" className="h-12 opacity-70" aria-hidden />
          ))}
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <div className="w-full bg-gradient-to-r from-teal-50 via-white to-teal-50 pt-2 pb-10 sm:py-20 flex justify-center">
        <div className="text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-900 mb-3">Download Our App</h2>
          <p className="text-gray-700 mb-8 text-base sm:text-lg">
            Book services faster, track professionals, and manage everything in one place.
          </p>
          <AppDownloadBadges />
        </div>
      </div>

      {/* EXPERT SERVICES */}
      <section className="bg-white py-20 px-6 sm:px-12 lg:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-teal-900 mb-4">Our Expert Services</h2>
        <p className="text-gray-700 text-lg mb-12">Our top services — quick, professional, and trusted across India.</p>
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {expertServices.map((service) => (
            <ServiceCard key={service.title} image={service.image} title={service.title} desc={service.desc} href={service.href} />
          ))}
        </div>
        <div className="mt-16">
          <Link href="/services" className="inline-block bg-[#0E4541] text-white px-8 py-3 rounded-lg shadow-lg hover:bg-teal-900 transition text-lg font-semibold">
            View All Services
          </Link>
        </div>
      </section>

      {/* ABOUT TABS */}
      <section id="about-section" className="bg-gradient-to-b from-white via-teal-50 to-white py-20 px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-900 mb-4 tracking-wide">About Us</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            {brandAbout.intro}
          </p>
        </div>
        <div id="back-to-top-trigger" aria-hidden="true" className="h-0 w-full" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {Object.keys(sections).map((key) => (
              <div key={key} className="group" onMouseEnter={() => setActiveSection(key)} onMouseLeave={() => setActiveSection("")}>
                <button
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg cursor-pointer ${
                    activeSection === key
                      ? "bg-[#0E4541] text-white shadow-xl"
                      : "bg-white border border-teal-100 text-teal-900 hover:border-teal-200 hover:shadow-md"
                  }`}
                >
                  {sections[key as keyof typeof sections].title}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-[2200ms] ease-out ${
                    activeSection === key ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 border-l-4 border-teal-600 pl-6 bg-white rounded-r-2xl shadow-sm py-5 px-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {sections[key as keyof typeof sections].desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <img
                src="/about/about.png"
                alt="About RocketSingh"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-8 border-white transition-all duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials-section" className="bg-gradient-to-r from-teal-50 via-white to-teal-50 py-20 px-6 sm:px-12 lg:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-teal-900 mb-10">Testimonials</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow border border-teal-100">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden shadow-md ring-4 ring-teal-200">
                <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
              </div>
              <p className="text-gray-700 italic mb-4 leading-relaxed">&ldquo;{t.feedback}&rdquo;</p>
              <h4 className="text-teal-800 font-bold text-lg">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredBlogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition block">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="text-[#0D5D59] font-semibold hover:underline">View All Blog Posts →</Link>
        </div>
      </section>

      {/* FLOATING CONTACT */}
      {/* <div className={`fixed right-4 bottom-20 flex flex-col items-center gap-3 z-50 transition-transform duration-300 ${isScrolled ? "-translate-y-3" : "translate-y-0"}`}>
        <a href="https://wa.me/918190074189" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
        </a>
        <a href="tel:+918190074189" className="w-11 h-11 bg-[#0E4541] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <img src="/icons/phone.svg" alt="Phone" className="w-6 h-6" />
        </a>
      </div> */}

      <style jsx global>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(14, 69, 65, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(14, 69, 65, 0.7); }
        }
        .animate-pulse-soft { animation: pulse-soft 2.2s ease-in-out infinite; }
        @keyframes slideFade {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slideFade { animation: slideFade 0.9s ease-out; }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
