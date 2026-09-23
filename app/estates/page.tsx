"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { prayerCells, type PrayerCell } from "@/data/prayerCells";

export default function EstatesPage() {
  useEffect(() => {
    console.log("🔥 HYDRATION SUCCESSFUL: CLIENT JS IS RUNNING!");
  }, []);

  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique zones dynamically from prayerCells data
  const zonesList = useMemo(() => {
    return Array.from(new Set(prayerCells.map((cell) => cell.zone)));
  }, []);

  // Filter prayer cells based on selected zone and search input
  const filteredCells = useMemo(() => {
    return prayerCells.filter((cell: PrayerCell) => {
      const matchesZone =
        selectedZone === "All" || cell.zone === selectedZone;
      const matchesQuery =
        cell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cell.estate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cell.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cell.venue.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesZone && matchesQuery;
    });
  }, [selectedZone, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. RICH NAVY HERO BANNER WITH GEOMETRIC TEXTURE */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Total Member Involvement (TMI)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Neighborhood Prayer Cells
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — Acts 2:46
            </span>
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT (FLOATING ON TEXTURED BACKGROUND) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 space-y-8">
        
        {/* Search & Zone Filters Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Small Groups Directory
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#002f6c]">
                Find a Gathering Near You
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
              Showing {filteredCells.length} of {prayerCells.length} Fellowships
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search cell by estate name, elder, venue, or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Filter by Geographic Zone:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedZone("All")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer pointer-events-auto select-none ${
                  selectedZone === "All"
                    ? "bg-[#002f6c] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Zones ({prayerCells.length})
              </button>

              {zonesList.map((zone) => {
                const count = prayerCells.filter((c) => c.zone === zone).length;
                const isSelected = selectedZone === zone;
                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setSelectedZone(zone)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer pointer-events-auto select-none ${
                      isSelected
                        ? "bg-[#002f6c] text-white shadow-md scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {zone} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prayer Cells Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCells.map((cell: PrayerCell) => (
            <div
              key={cell.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-[#002f6c] border border-blue-100 truncate max-w-[170px]">
                    {cell.zone}
                  </span>
                  <span className="text-xs text-amber-600 font-bold font-mono">
                    📍 {cell.estate}
                  </span>
                </div>

                <h3 className="font-bold text-lg font-serif text-slate-900 leading-snug">
                  {cell.name}
                </h3>

                <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                  {cell.description}
                </p>

                <div className="text-xs text-slate-600 space-y-1.5 pt-1 font-serif bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div>
                    Leader: <strong className="text-[#002f6c]">{cell.leader}</strong>
                  </div>
                  <div>
                    Gathering: <strong className="text-slate-800">{cell.meetingDay} • {cell.meetingTime}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Venue: {cell.venue}
                  </div>
                </div>

                {/* Focus Area Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cell.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-semibold"
                    >
                      • {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${cell.contactPhone.replace(/\s+/g, "")}`}
                  className="text-xs font-bold text-[#002f6c] hover:underline flex items-center gap-1"
                >
                  <span>📞 Call Leader</span>
                </a>

                <Link
                  href="/care"
                  className="bg-[#002f6c] hover:bg-[#001f49] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition"
                >
                  Join Cell →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredCells.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
            <div className="text-3xl">🔍</div>
            <p className="text-sm font-serif text-slate-600">
              No prayer cells found matching &ldquo;{searchQuery}&rdquo; in {selectedZone}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedZone("All");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#002f6c] underline cursor-pointer hover:text-black"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}
      </div>
    </main>
  );
}