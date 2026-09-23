"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import {
  currentAnnouncement,
  weeklyBulletin,
  type OrderOfServiceItem,
  type DepartmentNotice,
} from "@/data/announcements";

export default function BulletinPage() {
  const [activeTab, setActiveTab] = useState<"liturgy" | "notices" | "officers">("liturgy");

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. RICH NAVY HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Sabbath Liturgy &amp; Weekly Bulletin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Order of Divine Worship
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;O worship the Lord in the beauty of holiness: fear before him, all the earth.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — Psalm 96:9
            </span>
          </p>

          {/* Sunset Timings & Date Header */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">📅</span>
              <span>{weeklyBulletin.sabbathDate}</span>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">🌅 Sunset Friday:</span>
              <strong className="text-white">{weeklyBulletin.sunsetFriday}</strong>
            </div>
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-mono backdrop-blur flex items-center gap-2">
              <span className="text-amber-300">🌇 Sunset Sabbath:</span>
              <strong className="text-white">{weeklyBulletin.sunsetSabbath}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT (FLOATING CONTAINER) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 space-y-8">
        
        {/* Divine Service Key Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-100 text-[#b08400] border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
              Divine Worship Sermon
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002f6c]">
              &ldquo;{weeklyBulletin.divineSermonTitle}&rdquo;
            </h2>
            <div className="text-xs text-slate-600 font-serif flex flex-wrap gap-x-4 gap-y-1">
              <span>Speaker: <strong className="text-slate-900">{weeklyBulletin.divinePreacher}</strong></span>
              <span>Scripture: <strong className="text-slate-900">{weeklyBulletin.divineScripture}</strong></span>
              <span>Duty Elder: <strong className="text-slate-900">{weeklyBulletin.dutyOfficers.dutyElder}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/giving"
              className="bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow active:scale-95"
            >
              Paybill 752922 💳
            </Link>
            <Link
              href="/care"
              className="bg-[#002f6c] hover:bg-[#001f49] text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow active:scale-95"
            >
              Pastoral Desk 💬
            </Link>
          </div>
        </div>

        {/* Priority Mission Banner (Synced with Homepage Announcement) */}
        {currentAnnouncement.active && (
          <div className="bg-gradient-to-r from-[#001129] to-[#002f6c] rounded-3xl p-6 text-white shadow-lg border border-amber-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="bg-amber-400 text-[#001737] text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                {currentAnnouncement.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif">
                {currentAnnouncement.title}
              </h3>
              <p className="text-xs text-blue-100 font-serif max-w-2xl">
                {currentAnnouncement.subtitle}
              </p>
            </div>
            <Link
              href={currentAnnouncement.ctaLink}
              className="bg-white text-[#002f6c] hover:bg-amber-300 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition shadow shrink-0 active:scale-95"
            >
              {currentAnnouncement.ctaLabel} →
            </Link>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-md gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("liturgy")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "liturgy"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📖 Order of Service
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("notices")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "notices"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📢 Church Notices ({weeklyBulletin.departmentNotices.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("officers")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "officers"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              👥 Officers on Duty
            </button>
          </div>
        </div>

        {/* TAB 1: ORDER OF SERVICE LITURGY */}
        {activeTab === "liturgy" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Divine Worship Program
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Sabbath Liturgy Sequence
              </h3>
              <p className="text-xs text-slate-500 font-serif mt-1">
                Please maintain reverent silence as you enter the sanctuary. Turn off or silence all mobile devices.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                    <th className="py-3 px-4 rounded-l-xl">Order</th>
                    <th className="py-3 px-4">Service Component</th>
                    <th className="py-3 px-4">Hymn / Scripture</th>
                    <th className="py-3 px-4 rounded-r-xl">Facilitator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-serif">
                  {weeklyBulletin.orderOfDivineService.map((item: OrderOfServiceItem, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#002f6c]">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {item.part}
                        <span className="block font-normal text-slate-500 text-[11px]">
                          {item.detail}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-amber-700 font-mono text-[11px] font-bold">
                        {item.hymnOrScripture || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {item.facilitator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sabbath School Review Bar */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#b08400] block">
                Sabbath School Lesson Dialogue
              </span>
              <h4 className="text-base font-bold font-serif text-[#002f6c]">
                {weeklyBulletin.sabbathSchoolTheme}
              </h4>
              <p className="text-xs text-slate-700 font-serif italic">
                &ldquo;{weeklyBulletin.sabbathSchoolMemoryVerse}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DEPARTMENT NOTICES */}
        {activeTab === "notices" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Announcements
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Departmental Notices &amp; Schedules
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {weeklyBulletin.departmentNotices.map((n: DepartmentNotice) => (
                <div
                  key={n.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block ${
                        n.badgeColor || "bg-blue-50 text-[#002f6c] border-blue-100"
                      }`}
                    >
                      {n.department}
                    </span>
                    <h4 className="text-base font-bold font-serif text-slate-900">
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      {n.content}
                    </p>
                  </div>

                  {n.actionLink && n.actionText && (
                    <div className="pt-2 border-t border-slate-200/60">
                      <Link
                        href={n.actionLink}
                        className="text-xs font-bold text-[#002f6c] hover:underline flex items-center gap-1"
                      >
                        <span>{n.actionText}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: OFFICERS ON DUTY */}
        {activeTab === "officers" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Sanctuary Service Roster
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Serving Officers on Sabbath
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { role: "Duty Elder (Platform)", name: weeklyBulletin.dutyOfficers.dutyElder, desc: "Overseeing Divine Service & invocation" },
                { role: "Associate Elder", name: weeklyBulletin.dutyOfficers.associateElder, desc: "Pastoral care & intercessory prayer" },
                { role: "Head Deacon on Duty", name: weeklyBulletin.dutyOfficers.headDeacon, desc: "Sanctuary order & offertory coordination" },
                { role: "Head Deaconess on Duty", name: weeklyBulletin.dutyOfficers.headDeaconess, desc: "Hospitality, mothers' room & reverent order" },
                { role: "Chorister", name: weeklyBulletin.dutyOfficers.chorister, desc: "Directing congregational praise and hymnody" },
                { role: "Pianist / Accompanist", name: weeklyBulletin.dutyOfficers.pianist, desc: "Sacred organ & instrumental accompaniment" },
              ].map((off, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-md transition space-y-1.5"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] block">
                    {off.role}
                  </span>
                  <h4 className="text-base font-bold font-serif text-slate-900">
                    {off.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-serif">
                    {off.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-serif">
              <span>Need special prayer or anointing during the Sabbath service?</span>
              <Link
                href="/care"
                className="text-[#002f6c] font-bold hover:underline"
              >
                Send note to Pastoral Desk →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}