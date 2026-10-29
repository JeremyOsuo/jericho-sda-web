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

  // Desktop Dropdown States
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  // Mobile Accordion States
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileDeptsOpen, setMobileDeptsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const { urgentBannerActive, urgentBannerText } = useSiteSettings();

  const aboutRef = useRef<HTMLDivElement>(null);
  const deptsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

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

  // Click outside listener for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (aboutRef.current && !aboutRef.current.contains(target)) {
        setIsAboutOpen(false);
      }
      if (deptsRef.current && !deptsRef.current.contains(target)) {
        setIsDepartmentsOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setIsServicesOpen(false);
      }
      if (eventsRef.current && !eventsRef.current.contains(target)) {
        setIsEventsOpen(false);
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
              ? "bg-[#001f44]/90 backdrop-blur-md shadow-sm border-b border-white/10 py-3"
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
            <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-200">
              <Link href="/" className="hover:text-amber-300 transition py-1">
                Home
              </Link>

              {/* 1. ABOUT US */}
              <div
                ref={aboutRef}
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsAboutOpen((p) => !p)}
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 cursor-pointer"
                >
                  <span>About Us</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAboutOpen && (
                  <div className="absolute top-full left-0 w-56 bg-[#001f44] border border-white/15 rounded-xl shadow-xl p-2 space-y-1 mt-1">
                    <Link
                      href="/#about"
                      onClick={() => setIsAboutOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold text-amber-300">Overview</div>
                      <div className="text-[10px] text-stone-400">Mission, vision & mandate</div>
                    </Link>
                    <Link
                      href="/leadership"
                      onClick={() => setIsAboutOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Leadership</div>
                      <div className="text-[10px] text-stone-400">Church pastors & elders</div>
                    </Link>
                    <Link
                      href="/strategic-plan"
                      onClick={() => setIsAboutOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Strategic Plan 2026–2030</div>
                      <div className="text-[10px] text-stone-400">Our 5-year church roadmap</div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. DEPARTMENTS */}
              <div
                ref={deptsRef}
                className="relative"
                onMouseEnter={() => setIsDepartmentsOpen(true)}
                onMouseLeave={() => setIsDepartmentsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsDepartmentsOpen((p) => !p)}
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 cursor-pointer"
                >
                  <span>Departments</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isDepartmentsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDepartmentsOpen && (
                  <div className="absolute top-full left-0 w-64 bg-[#001f44] border border-white/15 rounded-xl shadow-xl p-2 space-y-1 mt-1">
                    <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                        Ministries
                      </span>
                      <Link
                        href="/ministries"
                        onClick={() => setIsDepartmentsOpen(false)}
                        className="text-[11px] text-stone-300 hover:text-white"
                      >
                        All Ministries &rarr;
                      </Link>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-0.5 pt-1">
                      {departments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          onClick={() => setIsDepartmentsOpen(false)}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                        >
                          <span className="truncate">{dept.name}</span>
                          <span className="text-[10px] text-stone-400">
                            {dept.meetingTime.split(" ")[0]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. SERVICES */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsServicesOpen((p) => !p)}
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 cursor-pointer"
                >
                  <span>Services</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <div className="absolute top-full left-0 w-60 bg-[#001f44] border border-white/15 rounded-xl shadow-xl p-2 space-y-1 mt-1">
                    <Link
                      href="/giving"
                      onClick={() => setIsServicesOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold text-amber-300">Treasury</div>
                      <div className="text-[10px] text-stone-400">Tithe, Offering & Giving Portal</div>
                    </Link>
                    <Link
                      href="/care"
                      onClick={() => setIsServicesOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Pastoral Care</div>
                      <div className="text-[10px] text-stone-400">Counseling, visits & dedications</div>
                    </Link>
                    <Link
                      href="/estates"
                      onClick={() => setIsServicesOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Prayer Cells & Welfare</div>
                      <div className="text-[10px] text-stone-400">Estate fellowship & member support</div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. MAGAZINE */}
              <Link
                href="/magazine"
                className="text-amber-300 hover:text-amber-200 font-semibold transition py-1"
              >
                Magazine
              </Link>

              {/* 5. PROGRAM & EVENTS (Includes Camp Meeting) */}
              <div
                ref={eventsRef}
                className="relative"
                onMouseEnter={() => setIsEventsOpen(true)}
                onMouseLeave={() => setIsEventsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsEventsOpen((p) => !p)}
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 cursor-pointer"
                >
                  <span>Program &amp; Events</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isEventsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isEventsOpen && (
                  <div className="absolute top-full left-0 w-56 bg-[#001f44] border border-white/15 rounded-xl shadow-xl p-2 space-y-1 mt-1">
                    <Link
                      href="/events"
                      onClick={() => setIsEventsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-stone-200 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Church Calendar</div>
                      <div className="text-[10px] text-stone-400">Upcoming Sabbath services & events</div>
                    </Link>
                    <Link
                      href="/camp-meeting"
                      onClick={() => setIsEventsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs text-amber-300 hover:text-white hover:bg-white/10 transition"
                    >
                      <div className="font-semibold">Camp Meeting</div>
                      <div className="text-[10px] text-stone-400">Annual spiritual convocation</div>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Giving Button */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/giving"
                className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition"
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
            {/* Drawer Header */}
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

            {/* Drawer Links */}
            <div className="p-5 space-y-2 overflow-y-auto flex-1 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-stone-200 hover:text-white"
              >
                Home
              </Link>

              {/* Mobile Accordion: About Us */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white"
                >
                  <span>About Us</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l border-white/15 ml-3 mt-1 text-xs text-stone-300">
                    <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Overview</Link>
                    <Link href="/leadership" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Leadership</Link>
                    <Link href="/strategic-plan" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Strategic Plan 2026–2030</Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Departments */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileDeptsOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white"
                >
                  <span>Departments</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${mobileDeptsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDeptsOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l border-white/15 ml-3 mt-1 max-h-44 overflow-y-auto text-xs text-stone-300">
                    <Link href="/ministries" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-amber-300 font-semibold">All Ministries &rarr;</Link>
                    {departments.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/departments/${d.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 hover:text-white truncate"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Services */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white"
                >
                  <span>Services</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l border-white/15 ml-3 mt-1 text-xs text-stone-300">
                    <Link href="/giving" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-amber-300 font-semibold">Treasury (Giving)</Link>
                    <Link href="/care" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Pastoral Care</Link>
                    <Link href="/estates" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Prayer Cells &amp; Estates</Link>
                  </div>
                )}
              </div>

              {/* Mobile Magazine Item */}
              <Link
                href="/magazine"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-amber-300 font-semibold"
              >
                The Jericho Herald (Magazine)
              </Link>

              {/* Mobile Accordion: Program & Events (Includes Camp Meeting) */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileEventsOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white"
                >
                  <span>Program &amp; Events</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${mobileEventsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileEventsOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l border-white/15 ml-3 mt-1 text-xs text-stone-300">
                    <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 hover:text-white">Church Calendar</Link>
                    <Link href="/camp-meeting" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-amber-300 hover:text-white">Camp Meeting</Link>
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