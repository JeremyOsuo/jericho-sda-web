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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Prevent background scrolling only when mobile drawer sheet is explicitly open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close desktop dropdown on outside click
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
      {/* 1. TOP HEADER (DESKTOP & MOBILE BRANDING) */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        {urgentBannerActive && (
          <aside
            aria-label="Urgent Church Notice"
            className="bg-amber-400 text-[#001737] py-2 px-4 text-xs font-bold text-center border-b border-amber-500 shadow-md flex items-center justify-center gap-2 pointer-events-auto"
          >
            <span className="font-mono uppercase tracking-wider text-[10px] bg-[#001737] text-white px-2 py-0.5 rounded font-black">
              Urgent Notice
            </span>
            <span className="font-serif">{urgentBannerText}</span>
          </aside>
        )}

        <div
          className={`w-full transition-all duration-300 pointer-events-auto ${
            isScrolled
              ? "bg-[#001737]/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10"
              : "bg-gradient-to-b from-[#001129]/95 via-[#001129]/70 to-transparent py-4 sm:py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Church Brand with Secret Double-Click to Admin */}
            <div
              onDoubleClick={() => router.push("/admin")}
              className="flex items-center gap-2.5 group shrink-0 cursor-pointer select-none"
              title="Jericho SDA Sanctuary"
            >
              <Link
                href="/"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
              >
                <AdventistLogo className="w-5 h-5 sm:w-6 sm:h-6 text-[#001737]" />
              </Link>
              <Link href="/">
                <span className="text-white font-serif font-black text-xs sm:text-sm tracking-wide block leading-tight">
                  JERICHO SDA
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-300 block">
                  Sanctuary
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[11px] font-extrabold tracking-wide uppercase text-blue-100/90 shrink-0">
              <Link href="/" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Home
              </Link>
              <Link href="/bulletin" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Bulletin
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
                  className="flex items-center gap-1 hover:text-amber-300 transition py-1 whitespace-nowrap uppercase cursor-pointer"
                >
                  <span>Ministries</span>
                  <span className={`text-[9px] transition-transform ${isMinistriesOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {isMinistriesOpen && (
                  <div className="absolute top-full -left-4 w-72 bg-[#001737] border border-white/10 rounded-2xl shadow-2xl p-2.5 space-y-1 backdrop-blur-xl">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300 block font-bold">
                        Departments
                      </span>
                      <Link
                        href="/ministries"
                        onClick={() => setIsMinistriesOpen(false)}
                        className="text-[10px] text-blue-200 hover:text-amber-300 underline font-bold"
                      >
                        All Ministries →
                      </Link>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto space-y-0.5 pr-1">
                      {departments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          onClick={() => setIsMinistriesOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-100 hover:text-white hover:bg-white/10 transition normal-case"
                        >
                          <span className="text-base">{dept.emoji}</span>
                          <span className="truncate">{dept.shortName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/leadership" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Leadership
              </Link>
              <Link href="/estates" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Prayer Cells
              </Link>
              <Link href="/care" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Pastoral Care
              </Link>
              <Link href="/camp-meeting" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Camp Meeting
              </Link>
              <Link href="/events" className="hover:text-amber-300 transition py-1 whitespace-nowrap">
                Events
              </Link>
            </nav>

            {/* Desktop Giving Action */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/giving"
                className="bg-[#002f6c] hover:bg-[#00224f] border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow transition hover:scale-105"
              >
                Online Giving
              </Link>
            </div>

            {/* Mobile Top Giving Quick Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/giving"
                className="bg-amber-400 text-[#001737] font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow active:scale-95"
              >
                Giving
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#001229]/95 backdrop-blur-lg border-t border-white/15 px-2 py-2 flex items-center justify-around text-center shadow-2xl pointer-events-auto"
      >
        <Link
          href="/"
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-300 hover:text-amber-300 active:scale-90 transition"
        >
          <span className="text-lg">⛪</span>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Home</span>
        </Link>

        <Link
          href="/estates"
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-300 hover:text-amber-300 active:scale-90 transition"
        >
          <span className="text-lg">📍</span>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Cells</span>
        </Link>

        {/* Center Giving Button */}
        <Link
          href="/giving"
          className="-mt-5 bg-gradient-to-tr from-amber-400 to-amber-300 text-[#001737] w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-[#001229] active:scale-90 transition font-black"
        >
          <span className="text-base leading-none">💳</span>
          <span className="text-[8px] uppercase tracking-tighter font-extrabold mt-0.5">Give</span>
        </Link>

        <Link
          href="/camp-meeting"
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-300 hover:text-amber-300 active:scale-90 transition"
        >
          <span className="text-lg">🏕️</span>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Camp</span>
        </Link>

        {/* Menu Sheet Trigger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-300 hover:text-amber-300 active:scale-90 transition cursor-pointer"
        >
          <span className="text-lg">☰</span>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Menu</span>
        </button>
      </nav>

      {/* 3. MOBILE FULL MENU BOTTOM SHEET */}
      {isMenuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 999999 }}
          className="lg:hidden flex flex-col justify-end bg-black/75 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-200"
        >
          {/* Backdrop Tap to Close */}
          <div
            className="flex-1 w-full"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="bg-[#001737] border-t-2 border-amber-400/40 rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden text-white shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Sheet Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#001126] shrink-0">
              <div
                onDoubleClick={() => {
                  setIsMenuOpen(false);
                  router.push("/admin");
                }}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <AdventistLogo className="w-5 h-5 text-amber-400" />
                <span className="font-serif font-black text-sm tracking-wide text-white">
                  JERICHO SDA DIRECTORY
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-base font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Sheet Body Links */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Navigation Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  ⛪ Home
                </Link>
                <Link
                  href="/bulletin"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  📖 Bulletin
                </Link>
                <Link
                  href="/leadership"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  👥 Officers
                </Link>
                <Link
                  href="/care"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  🏡 Pastoral Care
                </Link>
                <Link
                  href="/camp-meeting"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  🏕️ Camp 2026
                </Link>
                <Link
                  href="/events"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 block"
                >
                  📅 2026 Calendar
                </Link>
              </div>

              {/* Ministries Accordion */}
              <div className="border border-white/10 bg-white/5 rounded-2xl p-3">
                <button
                  type="button"
                  onClick={() => setIsMobileMinistriesOpen((p) => !p)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-300 cursor-pointer"
                >
                  <span>🏛️ All 17 Church Ministries</span>
                  <span>{isMobileMinistriesOpen ? "▲" : "▼"}</span>
                </button>

                {isMobileMinistriesOpen && (
                  <div className="mt-3 max-h-48 overflow-y-auto space-y-1.5 pt-2 border-t border-white/10">
                    <Link
                      href="/ministries"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xs font-bold text-amber-200 underline pb-1"
                    >
                      View Ministries Hub Page →
                    </Link>
                    {departments.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/departments/${d.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-xs text-blue-100 hover:text-white py-1"
                      >
                        <span>{d.emoji}</span>
                        <span className="normal-case">{d.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Paybill Strip */}
            <div className="p-4 bg-[#001026] border-t border-white/10 shrink-0">
              <Link
                href="/giving"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-[#002f6c] text-white border border-white/20 font-bold text-center text-xs uppercase tracking-wider py-3 rounded-xl block shadow"
              >
                Tithe &amp; Offerings (Paybill 752922)
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}