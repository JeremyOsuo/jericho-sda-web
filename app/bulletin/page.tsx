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
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      
      {/* 1. HERO - Dignified, deep navy, liturgical scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Sabbath Liturgy &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Order of Divine Worship
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;O worship the Lord in the beauty of holiness: fear before him, all the earth.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Psalm 96:9
            </cite>
          </blockquote>

          {/* Sunset Timings & Date Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-stone-300 font-serif">
            <div>
              <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-sans">
                Sabbath Date
              </span>
              <strong className="text-white text-sm font-sans">{weeklyBulletin.sabbathDate}</strong>
            </div>
            <div className="border-l border-white/15 pl-6">
              <span className="text-amber-300 block text-[11px] uppercase tracking-wider font-sans font-semibold">
                Friday Sunset
              </span>
              <strong className="text-stone-100 text-sm font-mono">{weeklyBulletin.sunsetFriday}</strong>
            </div>
            <div className="border-l border-white/15 pl-6">
              <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-sans">
                Sabbath Sunset
              </span>
              <strong className="text-stone-100 text-sm font-mono">{weeklyBulletin.sunsetSabbath}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        
        {/* Divine Service Key Details Card */}
        <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
              Divine Worship Sermon
            </span>
            <h2 className="text-2xl font-serif text-[#001f44]">
              &ldquo;{weeklyBulletin.divineSermonTitle}&rdquo;
            </h2>
            <div className="text-xs text-stone-600 font-serif flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <span>Speaker: <strong className="text-stone-900">{weeklyBulletin.divinePreacher}</strong></span>
              <span>Scripture: <strong className="text-stone-900">{weeklyBulletin.divineScripture}</strong></span>
              <span>Duty Elder: <strong className="text-stone-900">{weeklyBulletin.dutyOfficers.dutyElder}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/giving"
              className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold px-4 py-2 rounded-lg text-xs transition shadow-sm"
            >
              Online Giving
            </Link>
            <Link
              href="/care"
              className="bg-[#001f44] hover:bg-[#001530] text-white font-medium px-4 py-2 rounded-lg text-xs transition"
            >
              Pastoral Care Desk &rarr;
            </Link>
          </div>
        </div>

        {/* Priority Mission Banner */}
        {currentAnnouncement.active && (
          <div className="bg-[#001f44] rounded-xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-white/10">
            <div className="space-y-1">
              <span className="bg-amber-400 text-[#001f44] text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block">
                {currentAnnouncement.badge}
              </span>
              <h3 className="text-base font-serif text-white">
                {currentAnnouncement.title}
              </h3>
              <p className="text-xs text-stone-300 font-serif max-w-2xl">
                {currentAnnouncement.subtitle}
              </p>
            </div>
            <Link
              href={currentAnnouncement.ctaLink}
              className="bg-white/10 hover:bg-white/20 text-stone-100 border border-white/20 font-medium px-4 py-2 rounded-lg text-xs transition shrink-0"
            >
              {currentAnnouncement.ctaLabel} &rarr;
            </Link>
          </div>
        )}

        {/* Tab Controls (No Emojis) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-stone-200/60 rounded-lg border border-stone-200 gap-1 flex-wrap justify-center">
            {[
              { id: "liturgy", label: "Order of Service" },
              { id: "notices", label: `Church Notices (${weeklyBulletin.departmentNotices.length})` },
              { id: "officers", label: "Officers on Duty" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#001f44] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: ORDER OF SERVICE LITURGY */}
        {activeTab === "liturgy" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xl font-serif text-[#001f44]">
                Divine Worship Sequence
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Please maintain reverent silence as you enter the sanctuary. Turn off or silence all mobile devices.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-50/50">
                    <th className="py-2.5 px-3">Order</th>
                    <th className="py-2.5 px-3">Service Component</th>
                    <th className="py-2.5 px-3">Hymn / Scripture</th>
                    <th className="py-2.5 px-3">Facilitator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-serif">
                  {weeklyBulletin.orderOfDivineService.map((item: OrderOfServiceItem, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/60 transition">
                      <td className="py-3 px-3 font-mono font-medium text-[#001f44]">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3">
                        <strong className="text-stone-900 font-sans font-medium block">
                          {item.part}
                        </strong>
                        <span className="text-stone-500 text-[11px] block mt-0.5">
                          {item.detail}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-amber-800 font-mono text-[11px] font-medium">
                        {item.hymnOrScripture || "—"}
                      </td>
                      <td className="py-3 px-3 text-stone-700">
                        {item.facilitator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sabbath School Review Bar */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 space-y-1.5">
              <span className="text-[11px] uppercase font-semibold text-amber-800 block">
                Sabbath School Lesson Dialogue
              </span>
              <h4 className="text-base font-serif text-[#001f44]">
                {weeklyBulletin.sabbathSchoolTheme}
              </h4>
              <p className="text-xs text-stone-600 font-serif italic">
                &ldquo;{weeklyBulletin.sabbathSchoolMemoryVerse}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: DEPARTMENT NOTICES */}
        {activeTab === "notices" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xl font-serif text-[#001f44]">
                Departmental Notices &amp; Schedules
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Announcements and upcoming activities for ministries and fellowship groups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklyBulletin.departmentNotices.map((n: DepartmentNotice) => (
                <div
                  key={n.id}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-5 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block">
                      {n.department}
                    </span>
                    <h4 className="text-base font-serif font-semibold text-stone-900">
                      {n.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-serif leading-relaxed">
                      {n.content}
                    </p>
                  </div>

                  {n.actionLink && n.actionText && (
                    <div className="pt-2 border-t border-stone-200/60">
                      <Link
                        href={n.actionLink}
                        className="text-xs font-semibold text-[#001f44] hover:underline"
                      >
                        {n.actionText} &rarr;
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
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xl font-serif text-[#001f44]">
                Serving Officers on Sabbath
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Sanctuary platform roster and service coordinators for today&apos;s Divine Service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-1"
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider text-amber-800 block">
                    {off.role}
                  </span>
                  <h4 className="text-sm font-serif font-semibold text-stone-900">
                    {off.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-serif">
                    {off.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-serif">
              <span>Need special prayer or anointing during the Sabbath service?</span>
              <Link
                href="/care"
                className="text-[#001f44] font-medium hover:underline"
              >
                Send note to Pastoral Desk &rarr;
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}