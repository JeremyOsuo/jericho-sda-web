"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { prayerCells, type PrayerCell } from "@/data/prayerCells";

export default function EstatesPage() {
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
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Total Member Involvement (TMI) &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Neighborhood Prayer Cells
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Acts 2:46
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        
        {/* Search & Zone Filters Container */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-serif text-[#001f44]">
                Find a Gathering Near You
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Join weekly cottage meetings and mid-week prayer bands across Nairobi Eastlands.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-medium self-start sm:self-auto">
              Showing {filteredCells.length} of {prayerCells.length} Fellowships
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by estate name, elder, venue, or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-300 rounded-lg pl-9 pr-14 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
            />
            <svg
              className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-stone-500 hover:text-stone-900 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Zone Filter Tabs */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400 block">
              Filter by Zone:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedZone("All")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                  selectedZone === "All"
                    ? "bg-[#001f44] text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
                    className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? "bg-[#001f44] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {zone} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prayer Cells Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCells.map((cell: PrayerCell) => (
            <div
              key={cell.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-[#001f44] border border-stone-200">
                    {cell.zone}
                  </span>
                  <span className="text-xs text-amber-800 font-medium">
                    {cell.estate}
                  </span>
                </div>

                <h3 className="font-serif font-semibold text-base text-stone-900 leading-snug">
                  {cell.name}
                </h3>

                <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3">
                  {cell.description}
                </p>

                <div className="text-xs text-stone-700 space-y-1 pt-1 font-serif bg-stone-50 p-3 rounded-lg border border-stone-200/70">
                  <div>
                    Leader: <strong className="text-[#001f44] font-sans font-medium">{cell.leader}</strong>
                  </div>
                  <div>
                    Schedule: <span className="text-stone-800">{cell.meetingDay} &bull; {cell.meetingTime}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Venue: {cell.venue}
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {cell.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-stone-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${cell.contactPhone.replace(/\s+/g, "")}`}
                  className="font-medium text-[#001f44] hover:underline"
                >
                  Call Leader ({cell.contactPhone})
                </a>

                <Link
                  href="/care"
                  className="bg-[#001f44] hover:bg-[#001530] text-white text-[11px] font-medium px-3 py-1.5 rounded transition"
                >
                  Join Cell &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredCells.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
            <h3 className="text-base font-serif text-stone-800">
              No prayer cells found matching &ldquo;{searchQuery}&rdquo; in {selectedZone}.
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              Try searching by a broader term or reset your zone filter.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedZone("All");
                  setSearchQuery("");
                }}
                className="text-xs font-medium text-[#001f44] underline cursor-pointer"
              >
                Reset Filters &amp; View All
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}