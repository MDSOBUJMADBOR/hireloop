import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";


function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-16 lg:flex-row">
          {/* Left */}
          <div className="max-w-sm">
            <h2 className="text-5xl font-bold">
              <span className="text-blue-600">hire</span>
              <span className="text-amber-700">loop</span>
            </h2>

            <p className="mt-8 leading-8 text-gray-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="mt-20 flex gap-3">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-gray-300 transition hover:bg-blue-600 hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:gap-24">
            <div>
              <h3 className="mb-6 text-lg font-medium text-indigo-500">
                Product
              </h3>

              <ul className="space-y-4">
                <li><Link href="#" className="hover:text-white">Job discovery</Link></li>
                <li><Link href="#" className="hover:text-white">Worker AI</Link></li>
                <li><Link href="#" className="hover:text-white">Companies</Link></li>
                <li><Link href="#" className="hover:text-white">Salary data</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-medium text-indigo-500">
                Navigations
              </h3>

              <ul className="space-y-4">
                <li><Link href="#" className="hover:text-white">Help center</Link></li>
                <li><Link href="#" className="hover:text-white">Career library</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-medium text-indigo-500">
                Resources
              </h3>

              <ul className="space-y-4">
                <li><Link href="#" className="hover:text-white">Brand Guideline</Link></li>
                <li><Link href="#" className="hover:text-white">Newsroom</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row md:items-center">
          <p>Copyright 2024 — Programming Hero</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Terms & Policy
            </Link>

            <Link href="#" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;