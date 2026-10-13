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
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Jericho SDA Church &bull; Departmental Roster</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Church Ministries &amp; Departments
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; 1 Corinthians 12:4-5
            </cite>
          </blockquote>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-300 font-serif">
            <div>
              <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-sans">
                Active Departments
              </span>
              <strong className="text-white text-sm font-sans">17 Ministries</strong>
            </div>
            <div className="border-l border-white/15 pl-6">
              <span className="text-amber-300 block text-[11px] uppercase tracking-wider font-sans font-semibold">
                Sanctuary Location
              </span>
              <strong className="text-stone-100 text-sm font-sans">Jericho Estate</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH DESK */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-6">
        
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-base font-serif text-[#001f44]">
                Explore Ministry Departments
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Find a ministry to join or connect with departmental leadership.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ministry or leader..."
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
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#001f44] text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat === "ALL" ? "All Ministries (17)" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between px-1 text-xs">
          <p className="text-stone-500 font-medium">
            Showing <strong className="text-stone-800">{filteredDepartments.length}</strong> {filteredDepartments.length === 1 ? "Department" : "Departments"}
          </p>
          {(selectedCategory !== "ALL" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-[#001f44] font-medium hover:underline cursor-pointer"
            >
              Reset Filters &larr;
            </button>
          )}
        </div>

        {/* 3. DEPARTMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDepartments.map((dept: Department) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group bg-white rounded-xl p-5 border border-stone-200 shadow-sm hover:border-[#001f44]/40 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 group-hover:bg-[#001f44] group-hover:text-white flex items-center justify-center font-serif text-xs font-semibold text-[#001f44] transition">
                    {dept.name.charAt(0)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                    {dept.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-serif font-semibold text-stone-900 group-hover:text-[#001f44] transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed mt-1 line-clamp-2">
                    {dept.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2">
                <div className="text-xs text-stone-500 font-serif">
                  Leader: <strong className="text-stone-800 font-sans font-medium">{dept.leader}</strong>
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-[#001f44]">
                  <span>View Ministry Profile</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredDepartments.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm space-y-2">
            <h3 className="text-base font-serif text-stone-800">
              No matching church ministries found
            </h3>
            <p className="text-xs text-stone-500 font-serif max-w-sm mx-auto">
              Try adjusting your search keywords or resetting the category filter back to &ldquo;All Ministries&rdquo;.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-xs text-[#001f44] font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}