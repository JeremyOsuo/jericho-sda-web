"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdventistLogo from "./AdventistLogo";
import { departments } from "@/data/departments";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinistriesOpen, setIsMinistriesOpen] = useState(false);
  const [isMobileMinistriesOpen, setIsMobileMinistriesOpen] = useState(false);

  const { urgentBannerActive, urgentBannerText } = useSiteSettings();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMinistriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {urgentBannerActive && (
          <aside
            aria-label="Urgent Church Notice"
            className="bg-amber-400 text-[#001f44] py-2 px-4 text-xs font-semibold text-center border-b border-amber-500 shadow-sm flex items-center justify-center gap-2"
          >
            <span className="font-mono uppercase tracking-wider text-[10px] bg-[#001f44] text-white px-1.5 py-0.5 rounded">
              Notice
            </span>
            <span className="font-serif">{urgentBannerText}</span>
          </aside>
        )}

        {/* Main Navbar */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#001f44]/85 backdrop-blur-md shadow-sm border-b border-white/10 py-3"
              : "bg-[#001f44] border-b border-white/10 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
            
            {/* Church Brand: Double-click jumps to Treasury on port 3000 */}
            <div
              onDoubleClick={() => {
                window.location.href = "http://localhost:3000";
              }}
              className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
              title="Double-click for Treasury Desk"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shadow-sm shrink-0">
                <AdventistLogo className="w-5 h-5 text-[#001f44]" />
              </div>
              <div className="leading-tight">
                <span className="text-white font-serif font-semibold text-sm tracking-wide block">
                  Jericho SDA Church
                </span>
                <span className="text-[10px] text-amber-300/90 block">
                  Nairobi Eastlands
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-medium text-stone-200">
              <Link href="/" className="hover:text-amber-300 transition py-1">
                Home
              </Link>
              <Link href="/#about" className="hover:text-amber-300 transition py-1">
                About Us
              </Link>
              <Link href="/magazine" className="hover:text-amber-300 transition py-1 text-amber-300 font-semibold">
                Magazine
              </Link>

              {/* Ministries Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsMinistriesOpen(true)}
                onMouseLeave={() => setIsMinistriesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsMinistriesOpen((p) => !p)}
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 cursor-pointer"
                >
                  <span>Ministries</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isMinistriesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMinistriesOpen && (
                  <div className="absolute top-full left-0 w-64 bg-[#001f44] border border-white/15 rounded-xl shadow-xl p-2 space-y-1 mt-1">
                    <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                        Departments
                      </span>
                      <Link
                        href="/ministries"
                        onClick={() => setIsMinistriesOpen(false)}
                        className="text-[11px] text-stone-300 hover:text-white"
                      >
                        All Ministries &rarr;
                      </Link>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-0.5 pt-1">
                      {departments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          onClick={() => setIsMinistriesOpen(false)}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                        >
                          <span className="truncate">{dept.name}</span>
                          <span className="text-[10px] text-stone-400">{dept.meetingTime.split(" ")[0]}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/leadership" className="hover:text-amber-300 transition py-1">
                Leadership
              </Link>
              <Link href="/estates" className="hover:text-amber-300 transition py-1">
                Prayer Cells
              </Link>
              <Link href="/care" className="hover:text-amber-300 transition py-1">
                Pastoral Care
              </Link>
              <Link href="/camp-meeting" className="hover:text-amber-300 transition py-1">
                Camp Meeting
              </Link>
              <Link href="/events" className="hover:text-amber-300 transition py-1">
                Events
              </Link>
            </nav>

            {/* Desktop Giving */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/giving"
                className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm transition"
              >
                Online Giving
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/giving"
                className="bg-amber-400 text-[#001f44] font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm"
              >
                Give
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="p-1.5 text-stone-200 hover:text-white rounded-lg focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#001f44] text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10 border-l border-white/10">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div
                onDoubleClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "http://localhost:3000";
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none"
                title="Double-click for Treasury Desk"
              >
                <div className="w-7 h-7 rounded bg-amber-400 flex items-center justify-center">
                  <AdventistLogo className="w-4 h-4 text-[#001f44]" />
                </div>
                <span className="font-serif font-semibold text-sm">Jericho SDA</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="p-1.5 text-stone-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-1 overflow-y-auto flex-1 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/magazine"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-amber-300 font-semibold"
              >
                The Jericho Herald (Magazine)
              </Link>
              <Link
                href="/leadership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Church Leadership
              </Link>
              <Link
                href="/estates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Prayer Cells &amp; Estates
              </Link>
              <Link
                href="/care"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Pastoral Care
              </Link>
              <Link
                href="/camp-meeting"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Camp Meeting
              </Link>
              <Link
                href="/events"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                2026 Calendar
              </Link>

              {/* Ministries Accordion */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsMobileMinistriesOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/10 text-amber-300 font-semibold cursor-pointer"
                >
                  <span>Church Ministries</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${isMobileMinistriesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileMinistriesOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-0.5 border-l border-white/15 ml-3 mt-1 max-h-48 overflow-y-auto">
                    <Link
                      href="/ministries"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2.5 py-1 text-xs text-amber-200 font-semibold"
                    >
                      All Ministries &rarr;
                    </Link>
                    {departments.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/departments/${d.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-2.5 py-1 text-xs text-stone-300 hover:text-white"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Giving Action */}
            <div className="p-5 border-t border-white/10 bg-[#001737]">
              <Link
                href="/giving"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-center text-xs uppercase tracking-wider py-3 rounded-lg shadow-sm"
              >
                Online Giving &bull; Paybill 752922
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}