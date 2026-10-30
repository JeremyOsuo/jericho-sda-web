"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getLatestBulletin, BulletinData } from "@/lib/bulletin";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";

export default function BulletinPage() {
  const [bulletin, setBulletin] = useState<BulletinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "divine" | "ss" | "announcements" | "roster"
  >("divine");
  const [copied, setCopied] = useState(false);

  const fetchBulletin = () => {
    setLoading(true);
    setErrorModalOpen(false);

    getLatestBulletin()
      .then((data) => {
        if (!data) {
          throw new Error("No bulletin data found");
        }
        setBulletin(data);
      })
      .catch((err) => {
        console.error("Failed to load bulletin:", err);
        setErrorModalOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBulletin();
  }, []);

  const handleShareWhatsApp = () => {
    if (!bulletin) return;
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = `*Jericho SDA Church Bulletin — Sabbath ${bulletin.sabbathDate}*\n\n*Theme:* ${bulletin.theme}\n*Speaker:* ${bulletin.preacher}\n*Scripture:* ${bulletin.scriptureReading}\n*Lesson Study:* ${bulletin.lessonStudy.number}: ${bulletin.lessonStudy.title}\n\nRead the full Order of Service & announcements online:\n${currentUrl}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-28 pt-32 sm:pt-40">
      {/* 1. Loading Overlay Modal */}
      <LoadingModal
        isOpen={loading}
        title="Loading Sabbath Bulletin…"
        subtitle="Retrieving Order of Divine Service and church notices."
      />

      {/* 2. Error / Notice Modal */}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Bulletin Notice"
        message="The Order of Service for this upcoming Sabbath is currently being proofread and compiled by the church secretariat. Please check back shortly or reach out via WhatsApp."
        supportPhone="254700000000"
        onRetry={fetchBulletin}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {bulletin ? (
          <>
            {/* 1. Header Banner */}
            <section className="bg-[#001f44] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-400/10 border border-amber-300/20 px-3 py-0.5 rounded-full inline-block">
                      Sabbath Bulletin &bull; {bulletin.sabbathDate}
                    </span>
                    <span className="text-[11px] text-stone-300">
                      Order of Service
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-50 leading-tight">
                    Jericho SDA Church
                  </h1>
                  <p className="text-amber-300 font-serif text-base sm:text-lg italic">
                    &ldquo;{bulletin.theme}&rdquo;
                  </p>
                </div>

                {/* Quick Share Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition shadow-sm cursor-pointer"
                  >
                    Share via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/15 rounded-xl text-xs font-medium transition cursor-pointer"
                  >
                    {copied ? "Copied! ✓" : "Copy Link"}
                  </button>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15 text-xs">
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Preacher
                  </p>
                  <p className="font-serif font-medium text-stone-100 mt-0.5">
                    {bulletin.preacher}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Scripture
                  </p>
                  <p className="font-serif font-medium text-stone-100 mt-0.5">
                    {bulletin.scriptureReading}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Adult Bible Study
                  </p>
                  <p
                    className="font-serif font-medium text-stone-100 mt-0.5 truncate"
                    title={`${bulletin.lessonStudy.number}: ${bulletin.lessonStudy.title}`}
                  >
                    {bulletin.lessonStudy.number}: {bulletin.lessonStudy.title}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                    Online Giving
                  </p>
                  <Link
                    href="/giving"
                    className="text-amber-300 hover:text-white font-medium block mt-0.5 transition"
                  >
                    Paybill 752922 &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* 2. Secondary Link to Magazine */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-3 flex items-center justify-between text-xs">
              <span className="text-amber-900 font-serif">
                Looking for quarterly articles, testimonies, and in-depth pastoral messages?
              </span>
              <Link
                href="/magazine"
                className="text-[#001f44] font-semibold hover:underline shrink-0 ml-3"
              >
                Read Church Magazine &rarr;
              </Link>
            </div>

            {/* 3. Tab Navigation */}
            <div className="flex border-b border-stone-200 space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "divine", label: "Divine Service" },
                { id: "ss", label: "Sabbath School" },
                { id: "announcements", label: "Announcements" },
                { id: "roster", label: "Duty Roster" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-medium text-xs sm:text-sm rounded-t-xl transition whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white border-t border-x border-stone-200 text-[#001f44] font-semibold shadow-xs"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Divine Service */}
            {activeTab === "divine" && (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="text-xl font-serif text-[#001f44]">
                    Order of Divine Worship
                  </h2>
                  <span className="text-xs text-stone-500 font-serif">
                    Main Sanctuary &bull; 10:45 AM
                  </span>
                </div>

                <div className="space-y-2.5">
                  {bulletin.divineService.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 hover:border-stone-300 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 font-semibold">
                          {row.time || String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs sm:text-sm font-serif font-semibold text-stone-900">
                          {row.item}
                        </span>
                      </div>
                      {row.person && (
                        <span className="text-xs text-amber-900 sm:text-right mt-1 sm:mt-0 font-medium">
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
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h2 className="text-xl font-serif text-[#001f44]">
                      Sabbath School Program
                    </h2>
                    <p className="text-xs text-stone-500 font-serif mt-0.5">
                      08:00 AM – 10:40 AM
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200/70 px-3 py-1 rounded-full">
                    {bulletin.lessonStudy.number}
                  </span>
                </div>

                {/* Lesson Spotlight Card */}
                <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold font-mono">
                    Quarterly Adult Bible Study Guide
                  </p>
                  <h3 className="text-base font-serif font-semibold text-stone-900">
                    {bulletin.lessonStudy.title}
                  </h3>
                  {bulletin.lessonStudy.memoryVerse && (
                    <p className="text-xs text-stone-600 italic font-serif pt-0.5">
                      Memory Text:{" "}
                      <span className="text-amber-900 font-medium not-italic font-sans">
                        &ldquo;{bulletin.lessonStudy.memoryVerse}&rdquo;
                      </span>
                    </p>
                  )}
                </div>

                <div className="space-y-2.5">
                  {bulletin.sabbathSchool.map((row, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 hover:border-stone-300 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 font-semibold">
                          {row.time || String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs sm:text-sm font-serif font-semibold text-stone-900">
                          {row.item}
                        </span>
                      </div>
                      {row.person && (
                        <span className="text-xs text-amber-900 sm:text-right mt-1 sm:mt-0 font-medium">
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
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-serif text-[#001f44] border-b border-stone-100 pb-3">
                  Church Notices &amp; Pastoral Announcements
                </h2>
                <div className="space-y-2.5">
                  {bulletin.announcements.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#001f44] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-stone-700 text-xs sm:text-sm font-serif leading-relaxed">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Duty Roster */}
            {activeTab === "roster" && (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-serif text-[#001f44] border-b border-stone-100 pb-3">
                  Officers Serving This Sabbath
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {Object.entries(bulletin.dutyRoster).map(([role, name]) => (
                    <div
                      key={role}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 space-y-0.5"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold font-mono">
                        {role.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="font-serif font-semibold text-stone-900 text-sm">
                        {name || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          !loading && (
            <div className="text-center py-24 space-y-3">
              <h3 className="text-lg font-serif font-semibold text-stone-800">
                Bulletin Unavailable
              </h3>
              <p className="text-xs text-stone-500 font-serif">
                Could not retrieve the Sabbath bulletin records at this time.
              </p>
              <button
                type="button"
                onClick={fetchBulletin}
                className="mt-2 text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Click to retry
              </button>
            </div>
          )
        )}
      </div>
    </main>
  );
}