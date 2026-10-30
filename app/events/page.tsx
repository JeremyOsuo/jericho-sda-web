"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  churchCalendar2026,
  type EventCategory,
  type Quarter,
  type ChurchEvent,
} from "@/data/events";
import { MessageCircle, Search, X } from "lucide-react";

export default function EventsCalendarPage() {
  const [selectedQuarter, setSelectedQuarter] = useState<"ALL" | Quarter>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | EventCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Church Calendar Inquiries");
  const [modalMessage, setModalMessage] = useState("");

  const eventsList: ChurchEvent[] = Array.isArray(churchCalendar2026)
    ? churchCalendar2026
    : [];

  const filteredEvents = useMemo(() => {
    return eventsList.filter((evt) => {
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
        const matchesTitle = evt.title?.toLowerCase().includes(q) ?? false;
        const matchesDept = evt.department?.toLowerCase().includes(q) ?? false;
        const matchesLeader = evt.inCharge?.toLowerCase().includes(q) ?? false;
        const matchesMonth = evt.month?.toLowerCase().includes(q) ?? false;
        return matchesTitle || matchesDept || matchesLeader || matchesMonth;
      }
      return true;
    });
  }, [eventsList, selectedQuarter, selectedCategory, searchQuery]);

  const handleInquireUnlisted = () => {
    setModalTitle("Calendar Booking Inquiry");
    setModalMessage(
      `Could not find "${searchQuery}" on the published 2026 calendar? Departmental workshops, weddings, and special prayer convocations can be verified directly with the Church Clerk desk.`
    );
    setIsErrorModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Jericho SDA Church &bull; 2026 Master Calendar</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Worship, Ministry &amp; Youth Calendar
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;To every thing there is a season, and a time to every purpose under the heaven.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Ecclesiastes 3:1
            </cite>
          </blockquote>

          {/* Clean Summary Stats Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-300 font-serif">
            <div>
              <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-sans">
                Total Events
              </span>
              <strong className="text-white text-sm font-sans">
                {eventsList.length} Scheduled
              </strong>
            </div>
            <div className="border-l border-white/15 pl-6">
              <span className="text-amber-300 block text-[11px] uppercase tracking-wider font-sans font-semibold">
                Camp Meeting
              </span>
              <strong className="text-stone-100 text-sm font-sans">
                Aug 9 – 15, 2026
              </strong>
            </div>
            <div className="border-l border-white/15 pl-6">
              <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-sans">
                Ambassadors Retreat
              </span>
              <strong className="text-stone-100 text-sm font-sans">
                Aug 20 – 22, 2026
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER DESK & SEARCH TOOLBAR */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-6">
        {/* Filter Control Box */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-base font-serif text-[#001f44]">
                Browse Church Schedule
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Filter by ecclesiastical quarter, ministry department, or duty leader.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, leader, or month..."
                className="w-full bg-stone-50/70 border border-stone-300 rounded-lg pl-9 pr-14 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
          </div>

          {/* Quarter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider mr-1">
              Quarter:
            </span>
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
                className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
                  selectedQuarter === q.id
                    ? "bg-[#001f44] text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
            <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider mr-1">
              Ministry:
            </span>
            {[
              { id: "ALL", label: "All Categories" },
              { id: "ambassadors", label: "Ambassadors & Youth" },
              { id: "communion", label: "Holy Communion" },
              { id: "prayer", label: "Prayer & Revival" },
              { id: "music", label: "Music Ministry" },
              { id: "children-pathfinders", label: "Pathfinders & Adventurers" },
              { id: "church-wide", label: "Church-Wide" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-amber-400 text-[#001f44] font-semibold"
                    : "bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between px-1 text-xs">
          <p className="text-stone-500 font-medium">
            Showing <strong className="text-stone-800">{filteredEvents.length}</strong> scheduled{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </p>
          {(selectedQuarter !== "ALL" || selectedCategory !== "ALL" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedQuarter("ALL");
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-[#001f44] font-medium hover:underline cursor-pointer"
            >
              Reset Filters &larr;
            </button>
          )}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((evt: ChurchEvent) => (
            <div
              key={evt.id}
              className={`bg-white rounded-xl p-5 border transition shadow-sm flex flex-col justify-between space-y-3 ${
                evt.highlight
                  ? "border-amber-300/80 bg-amber-50/20"
                  : "border-stone-200"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#001f44] text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                      {evt.quarter}
                    </span>
                    <span className="text-xs font-medium text-amber-800 font-mono">
                      {evt.dates}
                    </span>
                  </div>

                  {evt.highlight && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Featured Event
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-base text-stone-900 leading-snug">
                    {evt.title}
                  </h3>
                  <span className="text-xs text-[#001f44] font-medium block mt-0.5">
                    {evt.department}
                  </span>
                </div>

                {evt.description && (
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {evt.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div>
                  {evt.inCharge && (
                    <span>
                      Leader: <strong className="text-stone-700">{evt.inCharge}</strong>
                    </span>
                  )}
                </div>
                {evt.id?.includes("camp-meeting") && (
                  <Link
                    href="/camp-meeting"
                    className="text-[#001f44] font-medium hover:underline"
                  >
                    Camp Guide &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-xl p-10 sm:p-12 text-center border border-stone-200 shadow-sm space-y-3">
            <h3 className="text-base font-serif text-stone-800">
              No matching church events found
            </h3>
            <p className="text-xs text-stone-500 font-serif max-w-sm mx-auto leading-relaxed">
              Try adjusting your search terms or resetting the quarter filter back to &ldquo;All 2026&rdquo;.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedQuarter("ALL");
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-xs text-[#001f44] font-medium underline cursor-pointer"
              >
                Clear all filters
              </button>
              <span className="text-stone-300">&bull;</span>
              <button
                type="button"
                onClick={handleInquireUnlisted}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inquire with Clerk Desk</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Human Inquiry Notice Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        supportPhone="254700000000"
      />
    </main>
  );
}