"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { departments, type Department } from "@/data/departments";

export default function MinistriesHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "ALL",
    "Spiritual & Worship",
    "Youth & Children",
    "Family & Nurture",
    "Outreach & Mission",
  ];

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesCat =
        selectedCategory === "ALL" || dept.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        dept.name.toLowerCase().includes(q) ||
        dept.tagline.toLowerCase().includes(q) ||
        dept.leader.toLowerCase().includes(q) ||
        dept.keyResponsibilities.some((r) => r.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. DEEP NAVY HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Jericho SDA Sanctuary • Ministry Roster</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            All 17 Church Ministries
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — 1 Corinthians 12:4-5
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-mono backdrop-blur">
              🏛️ Total Departments: <strong className="text-white">17 Active</strong>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-mono backdrop-blur">
              📍 Location: <strong className="text-white">Jericho Sanctuary</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH DESK */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20 space-y-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Explore Ministries
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#002f6c]">
                Find a Department or Service Opportunity
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ministry or leader..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-serif text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#002f6c] text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "ALL" ? "All Ministries (17)" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
            Showing {filteredDepartments.length} {filteredDepartments.length === 1 ? "Department" : "Departments"}
          </p>
          {(selectedCategory !== "ALL" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-xs text-[#002f6c] font-bold hover:underline cursor-pointer"
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* 3. DEPARTMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept: Department) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-amber-50 group-hover:border-amber-300 flex items-center justify-center text-2xl transition">
                    {dept.emoji}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {dept.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-[#002f6c] transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed mt-1 line-clamp-2">
                    {dept.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-serif text-slate-500">
                  <span>Leader: </span>
                  <strong className="text-slate-800 font-bold">{dept.leader}</strong>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#002f6c] group-hover:text-amber-600 transition">
                  <span>View Ministry Profile</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow space-y-3">
            <span className="text-4xl">🏛️</span>
            <h3 className="text-lg font-bold font-serif text-slate-800">
              No matching church ministries found
            </h3>
            <p className="text-xs text-slate-500 font-serif max-w-sm mx-auto">
              Try adjusting your search keywords or resetting the category filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}