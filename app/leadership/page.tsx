"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { churchLeadership } from "@/data/leadership";

export default function LeadershipPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Pastoral",
    "Elders",
    "Secretariat & Finance",
    "Deaconry",
    "Departmental",
  ];

  const filteredLeaders = useMemo(() => {
    return churchLeadership.filter((leader) => {
      const matchesCategory =
        activeCategory === "All" || leader.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        leader.name.toLowerCase().includes(q) ||
        leader.role.toLowerCase().includes(q) ||
        leader.bio.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Jericho SDA Church &bull; Servant Leadership</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Church Officers &amp; Leadership
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;He who is greatest among you shall be your servant. And whoever exalts himself will be humbled, and he who humbles himself will be exalted.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Matthew 23:11-12
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. FILTER TABS & SEARCH TOOLBAR */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-4">
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#001f44] text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-stone-400 font-medium shrink-0">
              {filteredLeaders.length} Officers Listed
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by leader name, role, or ministry..."
              className="w-full text-xs sm:text-sm pl-10 pr-16 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#001f44] bg-stone-50/60"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP DIRECTORY GRID */}
      <section className="max-w-5xl mx-auto px-6 pt-12">
        {filteredLeaders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-stone-400 text-xs font-serif border border-stone-200">
            No church officers found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                {/* PHOTO FRAME / ELEGANT INITIALS MONOGRAM */}
                <div className="relative w-full h-52 bg-stone-100 border-b border-stone-100 overflow-hidden flex items-center justify-center">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50 p-6 text-center select-none">
                      <div className="w-16 h-16 rounded-full bg-[#001f44] text-amber-300 flex items-center justify-center font-serif text-lg font-semibold shadow-sm mb-2">
                        {leader.avatarInitials}
                      </div>
                      <span className="text-[11px] font-serif text-stone-500">
                        Sanctuary Officer
                      </span>
                    </div>
                  )}

                  {/* Category Tag */}
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-[#001f44] font-semibold bg-white/95 border border-stone-200 px-2.5 py-0.5 rounded shadow-sm">
                    {leader.category}
                  </span>
                </div>

                {/* DETAILS CONTAINER */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div>
                      <h3 className="font-serif font-semibold text-base text-stone-900 leading-snug">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-medium text-[#001f44] mt-0.5">
                        {leader.role}
                      </p>
                      {leader.term && (
                        <span className="text-[11px] text-stone-400 block mt-0.5 font-mono">
                          {leader.term}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3 pt-1">
                      {leader.bio}
                    </p>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    {leader.email ? (
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-[#001f44] hover:underline font-medium text-[11px] truncate max-w-[170px]"
                      >
                        {leader.email}
                      </a>
                    ) : (
                      <span className="text-stone-400 text-[11px] font-serif">
                        Sanctuary Office
                      </span>
                    )}

                    <Link
                      href="/care"
                      className="text-xs font-semibold text-[#001f44] hover:underline shrink-0"
                    >
                      Pastoral Care &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. PASTORAL APPOINTMENT CTA */}
      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="bg-[#001f44] rounded-xl p-7 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-left">
            <span className="text-xs text-amber-300 font-medium uppercase tracking-wider block">
              Pastoral &amp; Elder Appointments
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white">
              Need Spiritual Counsel or Home Dedication?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-serif leading-relaxed">
              Our pastors and elders are available for home and hospital visitations, child dedications, pre-marital counseling, and spiritual encouragement.
            </p>
          </div>

          <Link
            href="/care"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-sm"
          >
            Contact Pastoral Care &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}