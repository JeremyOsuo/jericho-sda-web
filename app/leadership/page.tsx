"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { churchLeadership } from "@/data/leadership";

export default function LeadershipPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Pastoral", "Elders", "Secretariat & Finance", "Deaconry", "Departmental"];

  const filteredLeaders = useMemo(() => {
    return churchLeadership.filter((leader) => {
      const matchesCategory = activeCategory === "All" || leader.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        leader.name.toLowerCase().includes(q) ||
        leader.role.toLowerCase().includes(q) ||
        leader.bio.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative bg-gradient-to-br from-[#001737] via-[#002f6c] to-[#001433] text-white pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-3.5 h-3.5 text-amber-300" />
            <span>Jericho SDA Church • Servant Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Church Officers & Leadership
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;He who is greatest among you shall be your servant. And whoever exalts himself will be humbled, and he who humbles himself will be exalted.&rdquo;
            <span className="block text-xs font-sans font-bold text-amber-300 mt-1">
              — Matthew 23:11-12
            </span>
          </p>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & SEARCH TOOLBAR */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 space-y-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    activeCategory === cat
                      ? "bg-[#002f6c] text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-slate-400 font-semibold shrink-0">
              {filteredLeaders.length} Officers Listed
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by leader name, office, or responsibilities..."
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50/50"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-md font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP CARDS GRID (WITH BLANK IMAGE FRAMES) */}
      <section className="max-w-6xl mx-auto px-6 pt-12">
        {filteredLeaders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs font-serif border border-slate-200">
            No church officers found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002f6c]/30 transition-all flex flex-col justify-between"
              >
                {/* PHOTO FRAME / BLANK IMAGE PLACEHOLDER */}
                <div className="relative w-full h-56 bg-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center group">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    /* Elegant Blank Placeholder Frame */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200/70 p-6 text-center select-none border-dashed border-2 border-slate-300/80 m-2 rounded-2xl">
                      <div className="w-16 h-16 rounded-full bg-[#001737] text-amber-300 flex items-center justify-center font-black font-mono text-xl shadow-inner mb-2 group-hover:scale-105 transition-transform">
                        {leader.avatarInitials}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Photo Placeholder
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5 font-sans">
                        (Add to /public/images/leaders/)
                      </span>
                    </div>
                  )}

                  {/* Category Pill Over Image */}
                  <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[#002f6c] font-black bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                    {leader.category}
                  </span>
                </div>

                {/* DETAILS CONTAINER */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-lg font-serif text-slate-900 leading-tight">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#002f6c] mt-0.5">
                        {leader.role}
                      </p>
                      {leader.term && (
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          {leader.term}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                      {leader.bio}
                    </p>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    {leader.email ? (
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-[#002f6c] hover:underline font-bold text-[11px] truncate max-w-[170px]"
                      >
                        ✉️ {leader.email}
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-serif">
                        Jericho Church Office
                      </span>
                    )}

                    <Link
                      href="/care"
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-[#002f6c] shrink-0"
                    >
                      Request Visit →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. PASTORAL APPOINTMENT CTA */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="bg-[#001f4d] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
              Pastoral & Elder Appointments
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-serif">
              Need Spiritual Counsel or Home Dedication?
            </h3>
            <p className="text-xs text-blue-200 max-w-xl font-serif leading-relaxed">
              Our pastors and elders are available for home and hospital visitations, child dedications, pre-marital counseling, and biblical encouragement.
            </p>
          </div>

          <Link
            href="/care"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-[#001737] font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow"
          >
            Contact Pastoral Care ↗
          </Link>
        </div>
      </section>
    </main>
  );
}