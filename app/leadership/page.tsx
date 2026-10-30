"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import { churchLeadership } from "@/data/leadership";
import { Search, ArrowRight, Mail, MessageCircle, X } from "lucide-react";

export default function LeadershipPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal Feedback States
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState("Leadership Directory Notice");
  const [noticeMessage, setNoticeMessage] = useState("");

  const churchPhone = "254700000000";

  const categories = [
    "All",
    "Pastoral",
    "Elders",
    "Secretariat & Finance",
    "Deaconry",
    "Departmental",
  ];

  const leadersList = Array.isArray(churchLeadership) ? churchLeadership : [];

  const filteredLeaders = useMemo(() => {
    return leadersList.filter((leader) => {
      const matchesCategory =
        activeCategory === "All" || leader.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        leader.name.toLowerCase().includes(q) ||
        leader.role.toLowerCase().includes(q) ||
        leader.bio.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [leadersList, activeCategory, searchQuery]);

  const handleInquireLeader = () => {
    setNoticeTitle("Church Officer Inquiry");
    setNoticeMessage(
      `Looking for an associate elder, committee member, or department coordinator not appearing for "${searchQuery}"? You can reach the Church Secretariat desk directly on WhatsApp.`
    );
    setIsNoticeOpen(true);
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 font-sans pb-32"
    >
      {/* 1. HERO - Dignified deep navy with authentic sanctuary imagery */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <img
            src="/choir-hero.jpg"
            alt="Jericho SDA Sanctuary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001f44] via-[#001f44]/80 to-[#001f44]" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">
              Jericho SDA Church &bull; Servant Leadership
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Church Officers &amp; Leadership
          </h1>

          <blockquote className="text-blue-100 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;He who is greatest among you shall be your servant. And whoever
            exalts himself will be humbled, and he who humbles himself will be
            exalated.&rdquo;
            <cite className="block not-italic text-xs font-sans font-semibold text-amber-300 mt-1.5">
              &mdash; Matthew 23:11-12
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. FILTER TABS & SEARCH TOOLBAR */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-blue-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-blue-50/70 text-blue-900 hover:bg-blue-100/80 border border-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-semibold font-mono shrink-0">
              {filteredLeaders.length} Officers Listed
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by leader name, role, or ministry..."
              className="w-full text-xs sm:text-sm pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition shadow-xs text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP DIRECTORY GRID */}
      <section className="max-w-5xl mx-auto px-6 pt-10">
        {filteredLeaders.length === 0 ? (
          <div className="bg-white/80 rounded-2xl p-12 text-center text-slate-500 text-xs font-serif border border-blue-100 space-y-3">
            <p>No church officers found matching &ldquo;{searchQuery}&rdquo;.</p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                type="button"
                onClick={handleInquireLeader}
                className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inquire via Secretariat</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white/85 backdrop-blur-md rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-300 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                {/* PHOTO FRAME / MONOGRAM */}
                <div className="relative w-full h-52 bg-slate-100 border-b border-blue-100/60 overflow-hidden flex items-center justify-center">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50/50 p-6 text-center select-none">
                      <div className="w-16 h-16 rounded-full bg-blue-950 text-amber-300 flex items-center justify-center font-serif text-lg font-bold shadow-xs mb-2 border border-blue-900">
                        {leader.avatarInitials}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Sanctuary Officer
                      </span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-blue-700 font-bold bg-white/95 border border-blue-100 px-2.5 py-0.5 rounded-full shadow-xs">
                    {leader.category}
                  </span>
                </div>

                {/* DETAILS CONTAINER */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-bold text-blue-700 mt-0.5">
                        {leader.role}
                      </p>
                      {leader.term && (
                        <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                          {leader.term}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-1">
                      {leader.bio}
                    </p>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {leader.email ? (
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-blue-700 hover:text-blue-900 font-mono text-[11px] truncate max-w-[160px] flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3 shrink-0" />
                        <span className="truncate">{leader.email}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px]">
                        Sanctuary Office
                      </span>
                    )}

                    <Link
                      href={`/care?leader=${encodeURIComponent(leader.name)}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
                    >
                      <span>Pastoral Care</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-7 border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 inline-block uppercase tracking-wider">
              Pastoral &amp; Elder Appointments
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-blue-950">
              Need Spiritual Counsel or Home Dedication?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Our pastors and elders are available for home and hospital
              visitations, child dedications, pre-marital counseling, and
              spiritual encouragement.
            </p>
          </div>

          <Link
            href="/care"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Contact Pastoral Care</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Human Inquiry Notice Modal */}
      <ErrorModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        title={noticeTitle}
        message={noticeMessage}
        supportPhone={churchPhone}
      />
    </main>
  );
}