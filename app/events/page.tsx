"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { churchCalendar2026, type EventCategory, type Quarter, type ChurchEvent } from "@/data/events";

export default function EventsCalendarPage() {
  const [selectedQuarter, setSelectedQuarter] = useState<"ALL" | Quarter>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | EventCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return churchCalendar2026.filter((evt) => {
      // Quarter filter
      if (selectedQuarter !== "ALL" && evt.quarter !== selectedQuarter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "ALL" && evt.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesDept = evt.department.toLowerCase().includes(q);
        const matchesLeader = evt.inCharge?.toLowerCase().includes(q) ?? false;
        const matchesMonth = evt.month.toLowerCase().includes(q);
        return matchesTitle || matchesDept || matchesLeader || matchesMonth;
      }
      return true;
    });
  }, [selectedQuarter, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. RICH NAVY HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Jericho SDA Church • 2026 Calendar of Events</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Worship, Ministry &amp; Youth Calendar
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;To every thing there is a season, and a time to every purpose under the heaven.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — Ecclesiastes 3:1
            </span>
          </p>

          {/* Quick Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">📅 Total Events:</span>
              <strong className="text-white">{churchCalendar2026.length}</strong>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">🏕️ Camp Meeting:</span>
              <strong className="text-white">Aug 9 – 15, 2026</strong>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">🔥 Ambassadors Retreat:</span>
              <strong className="text-white">Aug 20 – 22, 2026</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT & INTERACTIVE FILTER DESK */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20 space-y-8">
        
        {/* Filter Control Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Interactive Schedule Desk
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#002f6c]">
                Filter by Quarter, Ministry, or Leader
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, elder, or leader..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-serif text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
              />
            </div>
          </div>

          {/* Quarter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase mr-1">Quarter:</span>
            {[
              { id: "ALL", label: "All 2026" },
              { id: "Q1", label: "Q1 (Jan – Mar)" },
              { id: "Q2", label: "Q2 (Apr – Jun)" },
              { id: "Q3", label: "Q3 (Jul – Sep)" },
              { id: "Q4", label: "Q4 (Oct – Dec)" },
            ].map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedQuarter(q.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedQuarter === q.id
                    ? "bg-[#002f6c] text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase mr-1">Ministry:</span>
            {[
              { id: "ALL", label: "All Categories" },
              { id: "ambassadors", label: "🔥 Ambassadors & Youth" },
              { id: "communion", label: "🍇 Holy Communion" },
              { id: "prayer", label: "🙏 Prayer & Revival" },
              { id: "music", label: "🎶 Music Ministry" },
              { id: "children-pathfinders", label: "⛺ Pathfinders & Children" },
              { id: "church-wide", label: "⛪ Church-Wide" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id as any)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-[#c99700] text-[#001737] shadow"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
            Showing {filteredEvents.length} scheduled {filteredEvents.length === 1 ? "event" : "events"}
          </p>
          {(selectedQuarter !== "ALL" || selectedCategory !== "ALL" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedQuarter("ALL");
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-xs text-[#002f6c] font-bold hover:underline cursor-pointer"
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvents.map((evt: ChurchEvent) => (
            <div
              key={evt.id}
              className={`bg-white rounded-3xl p-6 border transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 ${
                evt.highlight
                  ? "border-amber-400/80 bg-gradient-to-br from-amber-50/30 to-white"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#002f6c] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {evt.quarter}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#b08400]">
                      {evt.dates}
                    </span>
                  </div>

                  {evt.highlight && (
                    <span className="bg-amber-100 text-[#b08400] border border-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                      ★ Major Event
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-[#002f6c]">
                    {evt.title}
                  </h3>
                  <span className="text-xs font-serif text-blue-800 font-semibold block mt-0.5">
                    {evt.department}
                  </span>
                </div>

                {evt.description && (
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    {evt.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-serif">
                <div>
                  {evt.inCharge && (
                    <span>In-Charge: <strong className="text-slate-800">{evt.inCharge}</strong></span>
                  )}
                </div>
                {evt.id.includes("camp-meeting") && (
                  <Link href="/camp-meeting" className="text-[#002f6c] font-bold hover:underline">
                    Camp Guide →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow space-y-3">
            <span className="text-4xl">📅</span>
            <h3 className="text-lg font-bold font-serif text-slate-800">
              No matching church events found
            </h3>
            <p className="text-xs text-slate-500 font-serif max-w-sm mx-auto">
              Try adjusting your search keywords or switching back to &ldquo;All 2026&rdquo;.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}