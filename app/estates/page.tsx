"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EstateGroup {
  id: string;
  name: string;
  zone: string;
  leaderTitle: string;
  leaderName: string;
  phone: string;
  coverageArea: string;
}

const ESTATE_PLACEHOLDERS: EstateGroup[] = [
  {
    id: "jericho-core",
    name: "Jericho Central Fellowship",
    zone: "Jericho",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000001",
    coverageArea: "Jericho Market, Social Hall area, and surrounding courts",
  },
  {
    id: "buruburu-phase-1-2",
    name: "Buruburu Phase 1 & 2 Fellowship",
    zone: "Buruburu",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000002",
    coverageArea: "Phase 1 courts, Phase 2, Mesora shopping centre vicinity",
  },
  {
    id: "buruburu-phase-3-4-5",
    name: "Buruburu Phase 3, 4 & 5 Fellowship",
    zone: "Buruburu",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000003",
    coverageArea: "Phase 3, Phase 4, Phase 5, and Mumias Road area",
  },
  {
    id: "maringo-ofafa",
    name: "Maringo & Ofafa Fellowship",
    zone: "Maringo",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000004",
    coverageArea: "Maringo residential blocks, Ofafa 1, and adjacent avenues",
  },
  {
    id: "lumumba-uhuru",
    name: "Lumumba & Uhuru Estate Fellowship",
    zone: "Lumumba",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000005",
    coverageArea: "Lumumba Dispensary area, Uhuru Estate blocks",
  },
  {
    id: "bahati-kimathi",
    name: "Bahati & Kimathi Fellowship",
    zone: "Bahati",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000006",
    coverageArea: "Bahati, Kimathi Estate, and near Chief's Camp",
  },
  {
    id: "harambee-rabai",
    name: "Harambee & Rabai Fellowship",
    zone: "Harambee",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder [Name Placeholder]",
    phone: "+254700000007",
    coverageArea: "Harambee Estate courts, Rabai Road residential corridor",
  },
];

export default function EstatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");

  const zones = ["All", "Jericho", "Buruburu", "Maringo", "Lumumba", "Bahati", "Harambee"];

  const filteredEstates = ESTATE_PLACEHOLDERS.filter((estate) => {
    const query = searchTerm.toLowerCase();
    const matchesZone = selectedZone === "All" || estate.zone === selectedZone;
    const matchesSearch =
      estate.name.toLowerCase().includes(query) ||
      estate.zone.toLowerCase().includes(query) ||
      estate.coverageArea.toLowerCase().includes(query) ||
      estate.leaderName.toLowerCase().includes(query);
    return matchesZone && matchesSearch;
  });

  return (
    <main className="bg-[#fcfbf9] text-stone-900 min-h-screen pb-24 pt-32 sm:pt-40">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* 1. Header Banner */}
        <section className="bg-[#001f44] text-white rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-400/10 border border-amber-300/20 px-3 py-1 rounded-full inline-block">
              Neighborhood Fellowships
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-50 leading-tight">
              Estate Prayer Groups &amp; Fellowships
            </h1>
            <p className="text-stone-300 text-sm sm:text-base font-serif leading-relaxed pt-1">
              Connect with church members living near you. Midweek fellowships, intercessory prayer sessions, and welfare visits are organized and communicated directly within each estate&apos;s WhatsApp community.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Coordinated by Personal Ministries &amp; Board of Elders</span>
            </div>
            <Link
              href="/care"
              className="text-amber-300 hover:text-white font-medium underline underline-offset-4 transition"
            >
              Need Direct Pastoral Visit? &rarr;
            </Link>
          </div>
        </section>

        {/* 2. Interactive Area Quick-Picker & Search Bar */}
        <section className="space-y-4 pb-2 border-b border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#001f44]">
                Find Your Local Estate
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-serif mt-0.5">
                Select your area chip or search by court to reach the elder in charge.
              </p>
            </div>

            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search court, road, or leader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44] transition shadow-sm"
              />
            </div>
          </div>

          {/* Quick-Picker Pills (Smooth scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-stone-400 font-medium shrink-0 mr-1">
              Filter Zone:
            </span>
            {zones.map((zone) => {
              const isActive = selectedZone === zone;
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#001f44] text-white shadow-sm"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Estate Directory Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEstates.map((estate) => {
            const rawPhone = estate.phone.replace("+", "");
            const prefilledMessage = encodeURIComponent(
              `Praise God ${estate.leaderName}, I reside in ${estate.zone} and would like to connect with the estate fellowship and be added to the WhatsApp group.`
            );
            const whatsappLink = `https://api.whatsapp.com/send?phone=${rawPhone}&text=${prefilledMessage}`;

            return (
              <div
                key={estate.id}
                className="bg-white rounded-xl border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition p-6 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
                      {estate.zone}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      Eastlands Zone
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-semibold text-lg text-stone-900 group-hover:text-[#001f44] transition">
                      {estate.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      <span className="font-medium text-stone-700">Coverage: </span>
                      {estate.coverageArea}
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-stone-600 space-y-1">
                    <p>
                      <span className="text-stone-400">{estate.leaderTitle}: </span>
                      <span className="font-medium text-stone-800">{estate.leaderName}</span>
                    </p>
                  </div>
                </div>

                {/* Direct Connect Buttons */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    Connect via WhatsApp
                  </a>
                  <a
                    href={`tel:${estate.phone}`}
                    className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition border border-stone-200"
                  >
                    Call
                  </a>
                </div>
              </div>
            );
          })}
        </section>

        {filteredEstates.length === 0 && (
          <div className="text-center py-12 bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-stone-500 text-sm font-serif">
              No fellowship matches your current selection.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedZone("All");
              }}
              className="text-xs text-[#001f44] font-semibold mt-2 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* 4. Fallback for Unlisted Areas */}
        <section className="bg-stone-100 rounded-xl p-6 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif font-semibold text-stone-900 text-sm">
              Don&apos;t see your estate listed?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
              If you reside in outlying areas (such as Donholm, Umoja, Pipeline, or South B/C), get in touch with the Church Secretariat or Personal Ministries team to be mapped to the closest prayer circle.
            </p>
          </div>
          <Link
            href="/care"
            className="px-5 py-2.5 bg-[#001f44] hover:bg-[#001633] text-white rounded-lg text-xs font-semibold transition whitespace-nowrap self-start sm:self-auto"
          >
            Contact Secretariat
          </Link>
        </section>

      </div>
    </main>
  );
}