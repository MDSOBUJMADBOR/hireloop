"use client";

import { Search, MapPin } from "lucide-react";

export default function HeroSection() {
  const trendingJobs = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  return (
    <section >
      <div className="mx-auto max-w-7xl px-4 py-16 ">
        {/* Top Badge */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-b from-zinc-900 to-black px-8 py-3 shadow-lg">
            <span className="text-xl">💼</span>

            <span className="text-2xl font-bold">50,000+</span>

            <span className="uppercase tracking-[0.25em] text-zinc-400">
              New Jobs This Month
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-10 text-center">
          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Find Your Dream Job Today
          </h1>

          <p className="mx-auto mt-10 max-w-4xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
            HireLoop connects top talent with world-class companies.
            Browse thousands of curated opportunities and land your
            next role — faster.
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 md:flex-row">
            {/* Job Search */}
            <div className="flex flex-1 items-center gap-3 px-6 py-5">
              <Search className="h-6 w-6 text-zinc-400" />

              <input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Divider */}
            <div className="hidden w-px bg-white/10 md:block" />

            {/* Location */}
            <div className="flex flex-1 items-center gap-3 px-6 py-5">
              <MapPin className="h-6 w-6 text-zinc-400" />

              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Search Button */}
            <button className="m-2 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 transition hover:bg-indigo-500">
              <Search className="h-7 w-7" />
            </button>
          </div>
        </div>

        {/* Trending */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="font-medium text-white">
            Trending Position
          </span>

          {trendingJobs.map((job) => (
            <button
              key={job}
              className="rounded-full border border-white/10 bg-zinc-900 px-5 py-2 text-zinc-300 transition hover:bg-zinc-800"
            >
              {job}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}