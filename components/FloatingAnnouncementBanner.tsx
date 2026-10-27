"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { currentAnnouncements } from "@/data/bulletin";

export default function FloatingAnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasAnnouncements =
    Array.isArray(currentAnnouncements) && currentAnnouncements.length > 0;

  useEffect(() => {
    if (!hasAnnouncements || currentAnnouncements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentAnnouncements.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [hasAnnouncements]);

  if (!isMounted || !isVisible || !hasAnnouncements) return null;

  const active = currentAnnouncements[currentIndex];
  if (!active) return null;

  return (
    <aside
      aria-label="Church Announcements"
      className="fixed bottom-20 sm:bottom-6 right-3 left-3 sm:left-auto sm:right-6 sm:max-w-sm z-30 pointer-events-auto select-none"
    >
      <div className="bg-[#001737]/95 backdrop-blur-xl text-white border border-amber-400/40 rounded-2xl shadow-2xl p-3.5 flex items-start gap-3">
        <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-mono uppercase tracking-widest font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
              {active.badge || active.category || "Notice"}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentIndex + 1} of {currentAnnouncements.length}
            </span>
          </div>

          <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
            {active.headline}
          </h4>

          <p className="text-[11px] text-slate-300 font-serif line-clamp-2 mt-0.5 leading-relaxed">
            {active.detail}
          </p>

          {active.actionUrl && (
            <Link
              href={active.actionUrl}
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 hover:text-amber-200 mt-2"
            >
              <span>{active.actionLabel || "Learn More"}</span>
              <span>→</span>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 text-base leading-none shrink-0 cursor-pointer"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}