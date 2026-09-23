"use client";

import { useState } from "react";
import Link from "next/link";
import { weeklyServiceRoster, currentAnnouncements } from "@/data/bulletin";

export default function PublicationShelf() {
  const [activeTab, setActiveTab] = useState<"bulletin" | "announcements">("bulletin");

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
      {/* Top Controls & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
            Official Church Communications
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-serif text-[#002f6c] mt-0.5">
            Sabbath Bulletin & Announcements
          </h3>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveTab("bulletin")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === "bulletin"
                ? "bg-[#002f6c] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📜 Order of Service
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "announcements"
                ? "bg-[#002f6c] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>📢 Announcements</span>
            <span className="w-4 h-4 rounded-full bg-amber-400 text-[#001737] text-[10px] font-mono font-black flex items-center justify-center">
              {currentAnnouncements.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: ORDER OF DIVINE SERVICE */}
      {activeTab === "bulletin" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-amber-50/40 border border-blue-100 p-4 rounded-2xl">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              {weeklyServiceRoster.date}
            </span>
            <h4 className="text-base font-bold font-serif text-[#002f6c] mt-0.5">
              Theme: &ldquo;{weeklyServiceRoster.sabbathTheme}&rdquo;
            </h4>
            <p className="text-xs text-slate-600 font-serif mt-1">
              Scripture Reading: <strong className="text-slate-800">{weeklyServiceRoster.scriptureReading}</strong>
            </p>
          </div>

          {/* Roster Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Speaker / Preacher</span>
              <p className="font-bold text-slate-800">{weeklyServiceRoster.preacher}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Elder on Duty</span>
              <p className="font-bold text-slate-800">{weeklyServiceRoster.keyElder}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Song Service</span>
              <p className="font-bold text-slate-800">{weeklyServiceRoster.chorister}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Deacons in Charge</span>
              <p className="font-bold text-slate-800">{weeklyServiceRoster.dutyDeacon}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Deaconesses in Charge</span>
              <p className="font-bold text-slate-800">{weeklyServiceRoster.dutyDeaconess}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHURCH ANNOUNCEMENTS */}
      {activeTab === "announcements" && (
        <div className="space-y-3">
          {currentAnnouncements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#002f6c]/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase font-black px-2 py-0.5 rounded bg-[#001737] text-amber-300">
                    {item.badge || item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.date}
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm">
                  {item.headline}
                </h5>
                <p className="text-xs text-slate-600 font-serif leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  className="bg-white border border-slate-200 hover:border-[#002f6c] text-[#002f6c] text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm shrink-0 text-center"
                >
                  {item.actionLabel || "View"} →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}