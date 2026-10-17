"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getLatestBulletin, BulletinData } from "@/lib/bulletin";

export default function BulletinPage() {
  const [bulletin, setBulletin] = useState<BulletinData | null>(null);
  const [activeTab, setActiveTab] = useState<"divine" | "ss" | "announcements" | "roster">("divine");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getLatestBulletin().then(setBulletin);
  }, []);

  const handleShareWhatsApp = () => {
    if (!bulletin) return;
    const text = `*Jericho SDA Church Bulletin — Sabbath ${bulletin.sabbathDate}*\n\n*Theme:* ${bulletin.theme}\n*Speaker:* ${bulletin.preacher}\n*Scripture:* ${bulletin.scriptureReading}\n*Lesson Study:* ${bulletin.lessonStudy.number}: ${bulletin.lessonStudy.title}\n\nRead the full Order of Service & announcements online:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!bulletin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
        Loading Sabbath bulletin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Sabbath Bulletin • {bulletin.sabbathDate}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Jericho SDA Church
              </h1>
              <p className="text-emerald-400 font-medium text-lg mt-1 italic">
                "{bulletin.theme}"
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-900/30"
              >
                <span>Share to WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition border border-slate-700"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-sm">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Speaker</p>
              <p className="font-semibold text-slate-200 mt-0.5">{bulletin.preacher}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Scripture</p>
              <p className="font-semibold text-slate-200 mt-0.5">{bulletin.scriptureReading}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">This Week's Lesson</p>
              <p className="font-semibold text-slate-200 mt-0.5 truncate" title={`${bulletin.lessonStudy.number}: ${bulletin.lessonStudy.title}`}>
                {bulletin.lessonStudy.number}: {bulletin.lessonStudy.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Online Giving</p>
              <Link href="/giving" className="text-emerald-400 hover:underline font-semibold block mt-0.5">
                Paybill 752922 →
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "divine", label: "Divine Service" },
            { id: "ss", label: "Sabbath School" },
            { id: "announcements", label: "Announcements" },
            { id: "roster", label: "Duty Roster" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 font-medium text-sm rounded-t-xl transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 border-t border-x border-slate-700 text-emerald-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Divine Service */}
        {activeTab === "divine" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
              <span>Order of Divine Worship</span>
              <span className="text-xs font-normal text-slate-400">Main Sanctuary • 10:45 AM</span>
            </h2>
            <div className="space-y-4">
              {bulletin.divineService.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {row.time || String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-slate-200">{row.item}</span>
                  </div>
                  {row.person && (
                    <span className="text-sm text-emerald-400/90 sm:text-right mt-1 sm:mt-0 font-medium">
                      {row.person}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Sabbath School */}
        {activeTab === "ss" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Sabbath School Program</h2>
                <p className="text-xs text-slate-400 mt-0.5">09:00 AM – 10:40 AM</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {bulletin.lessonStudy.number}
                </span>
              </div>
            </div>

            {/* Lesson Spotlight Card */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl">
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Quarterly Adult Bible Study
              </p>
              <h3 className="text-lg font-bold text-white mt-1">
                {bulletin.lessonStudy.title}
              </h3>
              {bulletin.lessonStudy.memoryVerse && (
                <p className="text-xs text-slate-300 mt-1 italic">
                  Memory Text: <span className="text-emerald-300 font-medium">{bulletin.lessonStudy.memoryVerse}</span>
                </p>
              )}
            </div>

            <div className="space-y-4">
              {bulletin.sabbathSchool.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {row.time || String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-slate-200">{row.item}</span>
                  </div>
                  {row.person && (
                    <span className="text-sm text-emerald-400/90 sm:text-right mt-1 sm:mt-0 font-medium">
                      {row.person}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Announcements */}
        {activeTab === "announcements" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">Church Notices & Pastoral Alerts</h2>
            <div className="space-y-3">
              {bulletin.announcements.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/70"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Duty Roster */}
        {activeTab === "roster" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6">Serving This Sabbath</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(bulletin.dutyRoster).map(([role, name]) => (
                <div
                  key={role}
                  className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/60"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {role.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="font-semibold text-slate-100 text-base mt-1">{name || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}