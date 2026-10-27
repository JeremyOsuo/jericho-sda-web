"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
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
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Annual Camp Convocation &bull; {campMeetingDates}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-stone-50 tracking-tight leading-tight">
            &ldquo;{campMeetingTheme}&rdquo;
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;{campMeetingScriptureFull}&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; {campMeetingScripture}
            </cite>
          </blockquote>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {campMeetingPdf && (
              <a
                href={campMeetingPdf}
                download
                className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-sm"
              >
                Download Souvenir Guide (PDF) &rarr;
              </a>
            )}
            <Link
              href="/giving"
              className="bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 font-medium text-xs px-5 py-2.5 rounded-lg transition"
            >
              Camp Giving &bull; Paybill {campMeetingPaybill}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        
        {/* Chief Guest Speaker Card */}
        <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-lg bg-stone-100 shrink-0 overflow-hidden border border-stone-200">
            <img
              src="/church-15.jpg"
              alt={campMeetingChiefGuest}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Chief Guest Speaker
              </span>
              <span className="text-xs text-stone-500 font-serif">
                East-Central Africa Division (ECD)
              </span>
            </div>

            <h2 className="text-2xl font-serif text-[#001f44]">
              {campMeetingChiefGuest}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
              Family Ministries Director, Adventist Possibility Ministries Director, and Revival &amp; Reformation Director at the East-Central Africa Division. Leading the main convocation sermon series.
            </p>

            <div className="text-xs text-stone-500 pt-1 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 font-serif">
              <span>Host Pastor: <strong className="text-stone-800">{campMeetingHostPastor}</strong></span>
              <span>Associate: <strong className="text-stone-800">{campMeetingAssocPastor}</strong></span>
              <span>First Elder: <strong className="text-stone-800">{campMeetingFirstElder}</strong></span>
              <span>Camp Chair: <strong className="text-stone-800">{campMeetingCampChair}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Controls (No Emojis) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-stone-200/60 rounded-lg border border-stone-200 gap-1 flex-wrap justify-center">
            {[
              { id: "schedule", label: `Daily Schedule (${campDailyRecap.length} Days)` },
              { id: "speakers", label: `Guest Speakers (${guestSpeakers.length})` },
              { id: "hymns", label: "Theme Hymns" },
              { id: "gallery", label: `Gallery (${campMeetingSlides.length} Photos)` },
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

        {/* TAB 1: DAILY SCHEDULE */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            
            {/* Day Selector Tabs */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400 block">
                Select Convocation Day:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {campDailyRecap.map((dayObj, idx) => (
                  <button
                    key={dayObj.day}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                      selectedDayIndex === idx
                        ? "bg-[#001f44] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {dayObj.day} ({dayObj.date.split(" ")[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Current Day Header Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
                  Official Timetable
                </span>
                <h3 className="text-xl font-serif text-stone-900 mt-0.5">
                  {selectedDay.day}, {selectedDay.date}
                </h3>
                {selectedDay.timeKeeper && (
                  <p className="text-xs text-stone-500 font-serif mt-0.5">
                    Timekeeper: <strong className="text-stone-700">{selectedDay.timeKeeper}</strong>
                  </p>
                )}
              </div>

              {/* Choirs on duty list */}
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider font-medium text-stone-400 block">
                  Choirs on Duty:
                </span>
                <div className="flex flex-wrap sm:justify-end gap-1 mt-1 max-w-md">
                  {selectedDay.choirsOnDuty.map((choir, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white border border-stone-200 text-[#001f44] font-medium px-2 py-0.5 rounded shadow-2xs"
                    >
                      {choir}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timetable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-50/50">
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Program / Session</th>
                    <th className="py-2.5 px-3">Facilitator</th>
                    <th className="py-2.5 px-3">Coordinator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-serif">
                  {selectedDay.schedule.map((item: DayScheduleItem, i) => (
                    <tr key={i} className="hover:bg-stone-50/60 transition">
                      <td className="py-3 px-3 font-mono font-medium text-[#001f44] whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="py-3 px-3 font-medium text-stone-900 font-sans">
                        {item.program}
                      </td>
                      <td className="py-3 px-3 text-stone-700">
                        {item.facilitator || "—"}
                      </td>
                      <td className="py-3 px-3 text-stone-500 text-[11px]">
                        {item.coordinator || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GUEST SPEAKERS */}
        {activeTab === "speakers" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xl font-serif text-[#001f44]">
                Camp Meeting Evangelists &amp; Facilitators
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Pastoral leaders, directors, and guest speakers ministering throughout the week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guestSpeakers.map((spk, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-5 space-y-2"
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block">
                    {spk.role}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-stone-900">
                    {spk.name}
                  </h4>
                  <p className="text-xs text-[#001f44] font-medium">
                    {spk.portfolio}
                  </p>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed pt-1">
                    {spk.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: THEME HYMNS */}
        {activeTab === "hymns" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-xl font-serif text-[#001f44]">
                  Theme Song Stanzas &amp; Refrain
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-0.5">
                  Official hymnal selections for the 2026 convocation.
                </p>
              </div>

              {/* Language Switch */}
              <div className="inline-flex p-1 bg-stone-100 rounded-lg border border-stone-200 gap-1">
                <button
                  type="button"
                  onClick={() => setHymnLang("en")}
                  className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
                    hymnLang === "en"
                      ? "bg-[#001f44] text-white shadow-2xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  English (SDAH 590)
                </button>
                <button
                  type="button"
                  onClick={() => setHymnLang("sw")}
                  className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
                    hymnLang === "sw"
                      ? "bg-[#001f44] text-white shadow-2xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Kiswahili (NZK 128)
                </button>
              </div>
            </div>

            {hymnLang === "en" ? (
              <div className="space-y-6 font-serif max-w-xl mx-auto text-center">
                <div className="space-y-1">
                  <h4 className="text-2xl font-serif text-stone-900">
                    {themeSongsLyrics.sdah590.title}
                  </h4>
                  <p className="text-xs text-amber-800 font-sans font-medium">
                    Author: {themeSongsLyrics.sdah590.author}
                  </p>
                  <p className="text-xs text-stone-500 italic max-w-md mx-auto">
                    {themeSongsLyrics.sdah590.description}
                  </p>
                </div>

                <div className="space-y-5 text-sm text-stone-800 leading-relaxed">
                  {themeSongsLyrics.sdah590.stanzas.map((st) => (
                    <div key={st.num}>
                      <span className="text-xs text-stone-400 block mb-1 font-sans">
                        Stanza {st.num}
                      </span>
                      {st.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  ))}

                  <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/70 text-[#001f44]">
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block mb-1 font-sans">
                      Refrain
                    </span>
                    <p className="font-semibold">{themeSongsLyrics.sdah590.refrain}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 font-serif max-w-xl mx-auto text-center">
                <div className="space-y-1">
                  <h4 className="text-2xl font-serif text-stone-900">
                    {themeSongsLyrics.nzk128.title}
                  </h4>
                  <p className="text-xs text-amber-800 font-sans font-medium">
                    Kitabu: {themeSongsLyrics.nzk128.author}
                  </p>
                  <p className="text-xs text-stone-500 italic max-w-md mx-auto">
                    {themeSongsLyrics.nzk128.description}
                  </p>
                </div>

                <div className="space-y-5 text-sm text-stone-800 leading-relaxed">
                  {themeSongsLyrics.nzk128.stanzas.map((st) => (
                    <div key={st.num}>
                      <span className="text-xs text-stone-400 block mb-1 font-sans">
                        Ubeti {st.num}
                      </span>
                      {st.lines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  ))}

                  <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/70 text-[#001f44]">
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block mb-1 font-sans">
                      Kiitikio
                    </span>
                    <p className="font-semibold">{themeSongsLyrics.nzk128.refrain}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PHOTO GALLERY */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-xl font-serif text-[#001f44]">
                Camp Meeting Moments ({campMeetingSlides.length} Photos)
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Click any photo to enlarge in the high-resolution lightbox viewer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {campMeetingSlides.map((slide: CampPhoto, idx) => (
                <div
                  key={slide.id}
                  onClick={() => setLightboxImg(slide.image)}
                  className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-stone-900 shadow-xs cursor-pointer border border-stone-200 hover:shadow-md transition"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <span className="text-[10px] text-amber-300 font-semibold uppercase block">
                      {slide.day || `Moment ${idx + 1}`}
                    </span>
                    <h4 className="text-xs font-serif font-semibold line-clamp-1">
                      {slide.title}
                    </h4>
                    <p className="text-[11px] text-stone-200 font-serif line-clamp-1">
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh]">
            <img
              src={lightboxImg}
              alt="Enlarged Camp Photo"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/20"
            />
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-stone-900 font-bold text-sm flex items-center justify-center shadow-md hover:bg-amber-400 transition cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}