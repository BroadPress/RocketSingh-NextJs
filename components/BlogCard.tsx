"use client";

import Link from "next/link";
import { useState } from "react";

type BlogCardProps = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export default function BlogCard({ slug, title, description, image }: BlogCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col">
      <Link href={`/blog/${slug}`} className="block">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-3">
          <Link href={`/blog/${slug}`} className="hover:text-[#0D5D59] transition-colors">
            {title}
          </Link>
        </h3>
        <p className={`text-gray-600 mb-4 ${expanded ? "" : "line-clamp-4"}`}>{description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-[#0D5D59] font-semibold hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
          <Link
            href={`/blog/${slug}`}
            className="text-gray-500 text-sm font-medium hover:text-[#0D5D59] hover:underline"
          >
            Full article →
          </Link>
        </div>
      </div>
    </article>
  );
}
