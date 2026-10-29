"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  MessageCircle,
  Phone,
  ShieldCheck,
  ArrowRight,
  Home,
  Users,
  Clock,
} from "lucide-react";

interface EstateGroup {
  id: string;
  name: string;
  zone: string;
  leaderTitle: string;
  leaderName: string;
  phone: string;
  coverageArea: string;
  schedule?: string;
}

const ESTATE_PLACEHOLDERS: EstateGroup[] = [
  {
    id: "jericho-core",
    name: "Jericho Central Fellowship",
    zone: "Jericho",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder Otieno",
    phone: "+254700000001",
    coverageArea: "Jericho Market, Social Hall area, and surrounding residential courts",
    schedule: "Wednesdays &bull; 6:00 PM – 7:15 PM",
  },
  {
    id: "buruburu-phase-1-2",
    name: "Buruburu Phase 1 & 2 Fellowship",
    zone: "Buruburu",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder Mwangi",
    phone: "+254700000002",
    coverageArea: "Phase 1 courts, Phase 2, Mesora shopping centre vicinity",
    schedule: "Wednesdays &bull; 6:30 PM – 7:30 PM",
  },
  {
    id: "buruburu-phase-3-4-5",
    name: "Buruburu Phase 3, 4 & 5 Fellowship",
    zone: "Buruburu",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder Mwangi / Eld. Kariuki",
    phone: "+254700000003",
    coverageArea: "Phase 3, Phase 4, Phase 5, and Mumias Road area",
    schedule: "Wednesdays &bull; 6:30 PM – 7:30 PM",
  },
  {
    id: "maringo-ofafa",
    name: "Maringo & Ofafa Fellowship",
    zone: "Maringo",
    leaderTitle: "Elder in Charge",
    leaderName: "Deacon Omondi",
    phone: "+254700000004",
    coverageArea: "Maringo residential blocks, Ofafa 1, and adjacent avenues",
    schedule: "Wednesdays &bull; 6:00 PM – 7:00 PM",
  },
  {
    id: "lumumba-uhuru",
    name: "Lumumba & Uhuru Estate Fellowship",
    zone: "Lumumba",
    leaderTitle: "Elder in Charge",
    leaderName: "Eld. Charles Omollo",
    phone: "+254700000005",
    coverageArea: "Lumumba Dispensary area, Uhuru Estate blocks",
    schedule: "Wednesdays &bull; 6:00 PM – 7:15 PM",
  },
  {
    id: "bahati-kimathi",
    name: "Bahati & Kimathi Fellowship",
    zone: "Bahati",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder Mutua",
    phone: "+254700000006",
    coverageArea: "Bahati, Kimathi Estate, and near Chief's Camp",
    schedule: "Wednesdays &bull; 6:15 PM – 7:15 PM",
  },
  {
    id: "harambee-rabai",
    name: "Harambee & Rabai Fellowship",
    zone: "Harambee",
    leaderTitle: "Elder in Charge",
    leaderName: "Elder Nathan Khamala",
    phone: "+254700000007",
    coverageArea: "Harambee Estate courts, Rabai Road residential corridor",
    schedule: "Wednesdays &bull; 6:30 PM – 7:30 PM",
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
    <div
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 font-sans pb-32"
    >
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <img
            src="/choir-hero.jpg"
            alt="Jericho SDA Sanctuary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001f44] via-[#001f44]/80 to-[#001f44]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Neighborhood Fellowships &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal tracking-tight">
            Estate Prayer Groups &amp; Fellowships
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Connect with church members living near you. Midweek fellowships, intercessory prayer sessions, and welfare visits are organized and communicated directly within each estate&apos;s WhatsApp community.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-100 relative z-10">
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

      {/* 2. BODY CONTENT */}
      <main className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        {/* Interactive Area Quick-Picker & Search Bar */}
        <section className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-blue-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-blue-950 font-normal">
                Find Your Local Estate
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select your area chip or search by court to reach the elder in charge.
              </p>
            </div>

            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-blue-500" />
              <input
                type="text"
                placeholder="Search court, road, or leader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition shadow-xs"
              />
            </div>
          </div>

          {/* Quick-Picker Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-slate-400 font-semibold shrink-0 mr-1">
              Filter Zone:
            </span>
            {zones.map((zone) => {
              const isActive = selectedZone === zone;
              return (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 border border-blue-100"
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
                className="bg-white/85 backdrop-blur-md rounded-3xl border border-blue-100 shadow-xs hover:border-blue-300 hover:shadow-md transition p-6 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {estate.zone}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      East Zone
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-blue-700 transition">
                      {estate.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      <span className="font-semibold text-slate-700">Coverage: </span>
                      {estate.coverageArea}
                    </p>
                  </div>

                  {estate.schedule && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: estate.schedule }} />
                    </div>
                  )}

                  <div className="pt-1 text-xs text-slate-600">
                    <p>
                      <span className="text-slate-400">{estate.leaderTitle}: </span>
                      <strong className="text-slate-800">{estate.leaderName}</strong>
                    </p>
                  </div>
                </div>

                {/* Direct Connect Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${estate.phone}`}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            );
          })}
        </section>

        {filteredEstates.length === 0 && (
          <div className="text-center py-12 bg-white/80 border border-blue-100 rounded-2xl p-6">
            <p className="text-slate-500 text-sm font-medium">
              No fellowship matches &ldquo;{searchTerm}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedZone("All");
              }}
              className="text-xs text-blue-600 font-bold mt-2 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* 4. Fallback for Unlisted Areas */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-slate-900 text-base">
              Don&apos;t see your estate listed?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              If you reside in outlying areas (such as Donholm, Umoja, Pipeline, or South B/C), get in touch with the Church Secretariat or Personal Ministries team to be mapped to the closest prayer circle.
            </p>
          </div>
          <Link
            href="/care"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition whitespace-nowrap self-start sm:self-auto shadow-xs"
          >
            Contact Secretariat &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}