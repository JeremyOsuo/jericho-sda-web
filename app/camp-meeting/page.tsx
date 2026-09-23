"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import {
  campMeetingTheme,
  campMeetingYear,
  campMeetingDates,
  campMeetingScripture,
  campMeetingScriptureFull,
  campMeetingChiefGuest,
  campMeetingHostPastor,
  campMeetingAssocPastor,
  campMeetingFirstElder,
  campMeetingCampChair,
  campMeetingPaybill,
  campMeetingPdf,
  guestSpeakers,
  themeSongsLyrics,
  campDailyRecap,
  campMeetingSlides,
  type CampPhoto,
  type DaySchedule,
  type DayScheduleItem,
} from "@/data/campMeeting";

export default function CampMeetingPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "speakers" | "hymns" | "gallery">("schedule");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [hymnLang, setHymnLang] = useState<"en" | "sw">("en");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const selectedDay: DaySchedule = campDailyRecap[selectedDayIndex] || campDailyRecap[0];

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. RICH NAVY HERO BANNER WITH GEOMETRIC TEXTURE */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Annual Camp Meeting • {campMeetingDates}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            &ldquo;{campMeetingTheme}&rdquo;
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;{campMeetingScriptureFull}&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — {campMeetingScripture}
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            {campMeetingPdf && (
              <a
                href={campMeetingPdf}
                download
                className="bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Download Camp Guide (PDF)</span>
                <span>📥</span>
              </a>
            )}
            <Link
              href="/giving"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition backdrop-blur active:scale-95"
            >
              Camp Giving (Paybill {campMeetingPaybill}) 💳
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT (FLOATING CONTAINER) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 space-y-8">
        
        {/* Chief Guest Spotlight Card with Real Picture (church-15.jpg) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-[#001737] to-[#002f6c] p-1 shadow-lg shrink-0 overflow-hidden">
            <img
              src="/church-15.jpg"
              alt={campMeetingChiefGuest}
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-100 text-[#b08400] border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
                Chief Guest Speaker
              </span>
              <span className="text-xs text-slate-500 font-mono">
                East-Central Africa Division (ECD)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002f6c]">
              {campMeetingChiefGuest}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
              Family Ministries Director, Adventist Possibility Ministries Director, and Revival &amp; Reformation Director at the East-Central Africa Division. Leading the main sermon series calling all to behold the cross of Christ, receive new life, and prepare for His soon return.
            </p>

            <div className="text-[11px] font-mono text-slate-500 pt-1 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              <span>Host: <strong>{campMeetingHostPastor}</strong></span>
              <span>Associate: <strong>{campMeetingAssocPastor}</strong></span>
              <span>First Elder: <strong>{campMeetingFirstElder}</strong></span>
              <span>Chair: <strong>{campMeetingCampChair}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Controls */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-md gap-1 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setActiveTab("schedule")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "schedule"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📅 Daily Schedule ({campDailyRecap.length} Days)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("speakers")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "speakers"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              👥 Guest Speakers ({guestSpeakers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hymns")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "hymns"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              🎵 Theme Hymns
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("gallery")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-[#002f6c] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📸 Gallery ({campMeetingSlides.length} Photos)
            </button>
          </div>
        </div>

        {/* TAB 1: DAILY SCHEDULE MATRIX */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            {/* Day Selector Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Select Day of Convocation:
              </span>
              <div className="flex flex-wrap gap-2">
                {campDailyRecap.map((dayObj, idx) => (
                  <button
                    key={dayObj.day}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      selectedDayIndex === idx
                        ? "bg-[#002f6c] text-white shadow-md scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {dayObj.day} ({dayObj.date.split(" ")[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Current Day Header Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#b08400] block">
                  Official Timetable
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  {selectedDay.day}, {selectedDay.date}
                </h3>
                {selectedDay.timeKeeper && (
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Timekeeper: <strong>{selectedDay.timeKeeper}</strong>
                  </p>
                )}
              </div>

              {/* Choirs on duty list */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                  Choirs on Duty:
                </span>
                <div className="flex flex-wrap sm:justify-end gap-1 mt-1 max-w-md">
                  {selectedDay.choirsOnDuty.map((choir, i) => (
                    <span
                      key={i}
                      className="text-[9px] bg-white border border-slate-200 text-[#002f6c] font-bold px-2 py-0.5 rounded shadow-sm"
                    >
                      {choir}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timetable Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                    <th className="py-3 px-4 rounded-l-xl">Time Window</th>
                    <th className="py-3 px-4">Program / Session</th>
                    <th className="py-3 px-4">Facilitator</th>
                    <th className="py-3 px-4 rounded-r-xl">Coordinator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-serif">
                  {selectedDay.schedule.map((item: DayScheduleItem, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#002f6c] whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {item.program}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {item.facilitator || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {item.coordinator || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GUEST SPEAKERS ROSTER */}
        {activeTab === "speakers" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Ministerial Faculty
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Camp Meeting Evangelists &amp; Facilitators
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guestSpeakers.map((spk, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] bg-amber-100/60 border border-amber-200 px-2 py-0.5 rounded">
                      {spk.role}
                    </span>
                    <h4 className="text-base font-bold font-serif text-slate-900">
                      {spk.name}
                    </h4>
                    <p className="text-xs text-[#002f6c] font-semibold font-serif">
                      {spk.portfolio}
                    </p>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed pt-1">
                      {spk.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: THEME HYMNS LYRICS */}
        {activeTab === "hymns" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                  Camp Hymnody
                </span>
                <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                  Theme Song Stanzas &amp; Refrain
                </h3>
              </div>

              {/* Language Switch */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setHymnLang("en")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    hymnLang === "en"
                      ? "bg-[#002f6c] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  English (SDAH 590)
                </button>
                <button
                  type="button"
                  onClick={() => setHymnLang("sw")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    hymnLang === "sw"
                      ? "bg-[#002f6c] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Kiswahili (NZK 128)
                </button>
              </div>
            </div>

            {hymnLang === "en" ? (
              <div className="space-y-6 font-serif max-w-2xl mx-auto text-center">
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900 font-serif">
                    {themeSongsLyrics.sdah590.title}
                  </h4>
                  <p className="text-xs text-amber-700 font-sans font-bold">
                    Author: {themeSongsLyrics.sdah590.author}
                  </p>
                  <p className="text-xs text-slate-500 font-serif italic max-w-md mx-auto">
                    {themeSongsLyrics.sdah590.description}
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                  {themeSongsLyrics.sdah590.stanzas.map((st) => (
                    <div key={st.num}>
                      <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                        Stanza {st.num}
                      </span>
                      {st.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  ))}

                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 font-bold text-[#002f6c]">
                    <span className="text-xs font-mono font-bold uppercase text-[#b08400] block mb-1">
                      Refrain
                    </span>
                    <p>{themeSongsLyrics.sdah590.refrain}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 font-serif max-w-2xl mx-auto text-center">
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900 font-serif">
                    {themeSongsLyrics.nzk128.title}
                  </h4>
                  <p className="text-xs text-amber-700 font-sans font-bold">
                    Kitabu: {themeSongsLyrics.nzk128.author}
                  </p>
                  <p className="text-xs text-slate-500 font-serif italic max-w-md mx-auto">
                    {themeSongsLyrics.nzk128.description}
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                  {themeSongsLyrics.nzk128.stanzas.map((st) => (
                    <div key={st.num}>
                      <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                        Ubeti {st.num}
                      </span>
                      {st.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  ))}

                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 font-bold text-[#002f6c]">
                    <span className="text-xs font-mono font-bold uppercase text-[#b08400] block mb-1">
                      Kiitikio
                    </span>
                    <p>{themeSongsLyrics.nzk128.refrain}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PHOTO GALLERY (ALL 28 MOMENTS) */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Camp Retrospective
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Camp Meeting Moments (28 Photos)
              </h3>
              <p className="text-xs text-slate-500 font-serif mt-1">
                Click any photo to enlarge in the high-resolution lightbox viewer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {campMeetingSlides.map((slide: CampPhoto, idx) => (
                <div
                  key={slide.id}
                  onClick={() => setLightboxImg(slide.image)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-md cursor-pointer border border-slate-200 hover:shadow-xl transition"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase block">
                      {slide.day || `Moment ${idx + 1}`}
                    </span>
                    <h4 className="text-xs font-bold font-serif line-clamp-1">
                      {slide.title}
                    </h4>
                    <p className="text-[11px] text-slate-200 font-serif line-clamp-1">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh]">
            <img
              src={lightboxImg}
              alt="Enlarged Camp Photo"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-slate-900 font-bold text-lg flex items-center justify-center shadow-lg hover:bg-amber-400 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}