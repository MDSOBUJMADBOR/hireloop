"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "For Recruiters", href: "/recruiters" }, 
    { label: "Pricing", href: "/pricing" },
  ];
 
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold tracking-tight">
            <span className="text-blue-500">hire</span>
            <span className="text-orange-500">loop</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="rounded-lg p-2 text-white md:hidden"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "max-h-[500px] border-t border-white/10"
            : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 border-t border-white/10 pt-4">
            <Link
              href="/login"
              className="block rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Sign In
            </Link> 

            <Link
              href="/signup"
              className="mt-3 block rounded-xl bg-violet-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-violet-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}