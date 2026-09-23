"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdventistLogo from "./components/AdventistLogo";
import FloatingAnnouncementBanner from "./components/FloatingAnnouncementBanner";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { currentAnnouncement } from "@/data/announcements";
import { departments } from "@/data/departments";
import { jesdacCalendar2026 } from "@/data/churchCalendar";
import { beliefs } from "@/data/beliefs";
import {
  campMeetingSlides,
  campMeetingTheme,
  campMeetingYear,
  campMeetingScripture,
  campMeetingDates,
  campMeetingPoster,
  campMeetingPdf,
} from "@/data/campMeeting";

export default function HomePage() {
  const { bulletinUrl, liveStreamUrl } = useSiteSettings();
  const [slideIdx, setSlideIdx] = useState(0);
  const [pubFilter, setPubFilter] = useState("All");

  const publications = [
    {
      id: "jericho-herald-q3",
      title: "The Jericho Herald: Blessed Hope",
      issue: "Quarter 3 • Issue 14",
      quarter: "July – September 2026",
      coverImage: "/herald-cover.jpg",
      description:
        "Quarterly church magazine featuring pastoral reflections, personal testimonies, and departmental reports.",
      category: "Magazine",
      size: "3.4 MB",
      pdfUrl: "#",
      pageUrl: "/care",
    },
    {
      id: "bulletin-current",
      title: "Sabbath Divine Bulletin",
      issue: "Vol. 42 • No. 36",
      quarter: "Weekly Order of Service",
      coverImage:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80",
      description:
        "Duty elders register, hymn schedule, announcements, and weekly church accounts.",
      category: "Weekly Bulletin",
      size: "1.1 MB",
      pdfUrl: bulletinUrl || "#",
      pageUrl: "#",
    },
    {
      id: "camp-guide-2026",
      title: "Camp Meeting Souvenir Program",
      issue: `Theme: Obey, Trust & Live (${campMeetingScripture})`,
      quarter: campMeetingDates,
      coverImage: campMeetingPoster || "/camp-poster-2026.jpeg",
      description:
        "Complete theme breakdown by Pr. David Mmbaga (ECD), daily song sheets (SDAH 590 / NZK 128), and program register.",
      category: "Camp Guide",
      size: "PDF",
      pdfUrl: campMeetingPdf || "/camp-meeting-2026.pdf",
      pageUrl: "/camp-meeting",
    },
    {
      id: "youth-mission",
      title: "One Voice 27 Mission Handbook",
      issue: "Global Priority",
      quarter: "2026 / 2027",
      coverImage: "/one-voice-cover.png",
      description:
        "Handbook for personal door-to-door visitation, digital media evangelism, and local neighborhood prayer groups.",
      category: "Magazine",
      size: "2.7 MB",
      pdfUrl: "#",
      pageUrl: "/departments/adventist-youth",
    },
  ];

  useEffect(() => {
    if (!Array.isArray(campMeetingSlides) || campMeetingSlides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % campMeetingSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (!Array.isArray(campMeetingSlides) || campMeetingSlides.length === 0) return;
    setSlideIdx((prev) => (prev + 1) % campMeetingSlides.length);
  };

  const prevSlide = () => {
    if (!Array.isArray(campMeetingSlides) || campMeetingSlides.length === 0) return;
    setSlideIdx(
      (prev) => (prev - 1 + campMeetingSlides.length) % campMeetingSlides.length
    );
  };

  const filteredPubs =
    pubFilter === "All"
      ? publications
      : publications.filter((p) => p.category === pubFilter);

  return (
    <main className="bg-slate-50 pb-36 relative z-0">
      <FloatingAnnouncementBanner />

      {/* 1. DIGITAL HERO */}
      <section className="relative bg-gradient-to-br from-[#001737] via-[#002f6c] to-[#001433] text-white pt-36 sm:pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Jericho Seventh-day Adventist Church • Nairobi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-md">
            A Christ-Centered Sanctuary in the Heart of Jericho
          </h1>

          <p className="text-blue-100 text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;Come unto me, all ye that labour and are heavy laden, and I will give you rest.&rdquo;
            <span className="block text-xs font-sans font-bold text-amber-300 mt-1">
              — Matthew 11:28
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/giving"
              className="bg-[#c99700] hover:bg-[#b58700] text-[#00224f] font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
            >
              Online Giving / M-PESA
            </Link>

            <Link
              href="/care"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition backdrop-blur active:scale-95"
            >
              Request Prayer or Counselling
            </Link>

            <a
              href={liveStreamUrl || "https://www.youtube.com/@JerichoSDANairobi"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer"
            >
              <span>▶</span>
              <span>YouTube Archive</span>
              <span className="bg-white text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                Subscribe
              </span>
            </a>

            <Link
              href="#events"
              className="inline-flex items-center gap-2 bg-[#001737] hover:bg-black text-blue-200 hover:text-white border border-white/10 font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow"
            >
              <span>📅 Annual Calendar</span>
            </Link>
          </div>
        </div>

        {/* Schedule Strip */}
        <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y-0 divide-x-0 md:divide-x divide-white/10">
            <div className="px-2">
              <span className="text-[10px] font-bold tracking-widest text-blue-200/80 uppercase">
                Sabbath School
              </span>
              <h3 className="text-xl font-black text-white mt-1 font-mono">08:00 AM</h3>
              <p className="text-[11px] text-blue-200/70">Study &amp; Song Service</p>
            </div>

            <div className="px-2">
              <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                Divine Service
              </span>
              <h3 className="text-xl font-black text-[#c99700] mt-1 font-mono">11:00 AM</h3>
              <p className="text-[11px] text-blue-200/70">Main Worship Hour</p>
            </div>

            <div className="px-2">
              <span className="text-[10px] font-bold tracking-widest text-blue-200/80 uppercase">
                Youth Fellowship
              </span>
              <h3 className="text-xl font-black text-white mt-1 font-mono">02:00 PM</h3>
              <p className="text-[11px] text-blue-200/70">Adventist Youth (AY)</p>
            </div>

            <div className="px-2">
              <span className="text-[10px] font-bold tracking-widest text-blue-200/80 uppercase">
                Missionary Visit
              </span>
              <h3 className="text-xl font-black text-white mt-1 font-mono">04:00 PM</h3>
              <p className="text-[11px] text-blue-200/70">Community &amp; Hospital</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION PORTALS */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/care"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-200 flex items-start gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white transition flex items-center justify-center text-xl shrink-0">
              🏡
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b08400] tracking-wider block">
                Pastoral Care
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-[#002f6c] transition text-sm">
                Request Visit
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Home, hospital, or virtual pastoral prayer.
              </p>
            </div>
          </Link>

          <Link
            href="/estates"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-200 flex items-start gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#b08400] group-hover:bg-[#c99700] group-hover:text-[#00224f] transition flex items-center justify-center text-xl shrink-0">
              📍
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b08400] tracking-wider block">
                Fellowship
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-[#002f6c] transition text-sm">
                Prayer Cells
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Midweek small groups in Nairobi Eastlands.
              </p>
            </div>
          </Link>

          <Link
            href="/leadership"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-200 flex items-start gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white transition flex items-center justify-center text-xl shrink-0">
              👥
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b08400] tracking-wider block">
                Directory
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-[#002f6c] transition text-sm">
                Church Officers
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                Elders, Secretariat, Deacons &amp; Directors.
              </p>
            </div>
          </Link>

          <Link
            href="/camp-meeting"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-200 flex items-start gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white transition flex items-center justify-center text-xl shrink-0">
              🏕️
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#b08400] tracking-wider block">
                Annual Feast
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-[#002f6c] transition text-sm">
                Camp Meeting
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                August 2026 theme recaps &amp; photo gallery.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. ONE VOICE 27 MISSION BANNER */}
      {currentAnnouncement?.active && (
        <section className="max-w-6xl mx-auto px-6 mt-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[520px] flex items-center bg-[#001737]">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/one-voice-cover.png"
                className="w-full h-full object-cover object-center"
              >
                <source src="/onevoice27.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-[#001026]/95 via-[#001737]/85 to-[#002f6c]/65" />
            </div>

            <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-2xl space-y-5 text-white">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-[#001737] font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-md shadow">
                  {currentAnnouncement.badge}
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {currentAnnouncement.dateOrQuarter}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight drop-shadow-md">
                {currentAnnouncement.title}
              </h2>

              <p className="text-sm sm:text-base text-blue-100 font-serif leading-relaxed">
                {currentAnnouncement.subtitle}
              </p>

              <ul className="space-y-2 pt-1 text-xs sm:text-sm font-serif text-blue-100">
                {currentAnnouncement.highlightPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link
                  href={currentAnnouncement.ctaLink || "/departments/adventist-youth"}
                  className="bg-amber-400 hover:bg-amber-300 text-[#001737] font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition shadow-lg hover:scale-105 active:scale-95"
                >
                  {currentAnnouncement.ctaLabel || "Read Mission Plan"} →
                </Link>
                <a
                  href="/one-voice-cover.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-xl transition backdrop-blur"
                >
                  View High-Res Poster
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. DIGITAL PUBLICATIONS SHELF */}
      <section className="max-w-6xl mx-auto px-6 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
              Digital E-Library &amp; Media
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#002f6c] tracking-tight">
              Publications &amp; Church Magazines
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">
              Download weekly church bulletins, quarterly reflections, and study guides directly to your device.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Magazine", "Weekly Bulletin", "Camp Guide"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPubFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition uppercase tracking-wider cursor-pointer ${
                  pubFilter === cat
                    ? "bg-[#002f6c] text-white shadow"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900 block">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute top-3 left-3 bg-[#001737]/90 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur">
                    {pub.category}
                  </span>
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <p className="text-[10px] font-mono text-amber-300 font-bold uppercase">
                      {pub.issue}
                    </p>
                    <p className="text-xs text-slate-200 line-clamp-1">
                      {pub.quarter}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold font-serif text-slate-900 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-serif mt-2 line-clamp-3 leading-relaxed">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {pub.pageUrl && pub.pageUrl !== "#" ? (
                    <Link
                      href={pub.pageUrl}
                      className="text-xs font-bold text-[#002f6c] hover:underline"
                    >
                      View Page ↗
                    </Link>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      {pub.size}
                    </span>
                  )}

                  {pub.pdfUrl && pub.pdfUrl !== "#" ? (
                    <a
                      href={pub.pdfUrl}
                      download
                      className="bg-[#002f6c] hover:bg-[#001f49] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>PDF</span>
                      <span>📥</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => alert(`Opening ${pub.title}...`)}
                      className="bg-blue-50 hover:bg-[#002f6c] text-[#002f6c] hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition cursor-pointer"
                    >
                      Download 📥
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAMP MEETING RETROSPECTIVE SLIDER */}
      <section className="max-w-6xl mx-auto px-6 pt-20">
        <div
          onTouchStart={(e) => {
            const touchDown = e.touches[0].clientX;
            (e.currentTarget as HTMLElement & { touchDown?: number }).touchDown = touchDown;
          }}
          onTouchEnd={(e) => {
            const el = e.currentTarget as HTMLElement & { touchDown?: number };
            const touchDown = el.touchDown;
            if (!touchDown) return;
            const touchUp = e.changedTouches[0].clientX;
            const diff = touchDown - touchUp;
            if (diff > 50) nextSlide();
            if (diff < -50) prevSlide();
          }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 text-white min-h-[460px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 select-none"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {Array.isArray(campMeetingSlides) && campMeetingSlides.length > 0 && (
              <img
                src={campMeetingSlides[slideIdx]?.image || "/church-1.jpg"}
                alt={campMeetingSlides[slideIdx]?.title || "Camp Slide"}
                className="w-full h-full object-cover object-center transition-opacity duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001026]/95 via-transparent to-black/40" />
          </div>

          <div className="relative z-30 flex items-center justify-between gap-3 pointer-events-auto">
            <span className="bg-[#001737]/90 backdrop-blur text-amber-300 border border-amber-300/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow">
              August {campMeetingYear} Camp Retrospective
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="w-12 h-12 rounded-full bg-black/80 hover:bg-black active:bg-amber-400 active:text-[#001737] text-white flex items-center justify-center transition border border-white/30 cursor-pointer text-2xl font-bold touch-manipulation shadow-2xl"
              >
                ‹
              </button>
              <span className="text-xs font-mono text-blue-100 font-bold px-2.5 py-1 rounded bg-black/70 border border-white/20">
                {slideIdx + 1}/{campMeetingSlides?.length || 1}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="w-12 h-12 rounded-full bg-black/80 hover:bg-black active:bg-amber-400 active:text-[#001737] text-white flex items-center justify-center transition border border-white/30 cursor-pointer text-2xl font-bold touch-manipulation shadow-2xl"
              >
                ›
              </button>
            </div>
          </div>

          <div className="relative z-20 max-w-2xl space-y-3 pt-6 pointer-events-auto">
            {Array.isArray(campMeetingSlides) && campMeetingSlides.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest block font-sans">
                  Theme: &ldquo;{campMeetingTheme}&rdquo;
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white tracking-tight drop-shadow-md">
                  {campMeetingSlides[slideIdx]?.title}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-serif leading-relaxed line-clamp-2">
                  {campMeetingSlides[slideIdx]?.caption}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/15">
              <Link
                href="/camp-meeting"
                className="bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg active:scale-95"
              >
                View Full Story &amp; Photos ↗
              </Link>

              <div className="flex items-center gap-1.5">
                {campMeetingSlides?.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlideIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      slideIdx === i ? "bg-amber-400 w-7" : "bg-white/40 w-2.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINISTRIES */}
      <section id="departments" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
              Total Member Involvement
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#002f6c] tracking-tight">
              Church Ministries &amp; Departments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">
              Active departmental fellowships serving children, youth, families, and special needs.
            </p>
          </div>

          <Link
            href="/ministries"
            className="text-xs font-bold uppercase tracking-wider text-[#002f6c] hover:text-[#001737] flex items-center gap-1.5 shrink-0"
          >
            <span>All 17 Ministries</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.slice(0, 6).map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002f6c]/40 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-2xl transition">
                    {dept.emoji}
                  </div>
                  {dept.featured && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-[#b08400] px-2 py-0.5 rounded-md">
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base font-serif text-slate-900 group-hover:text-[#002f6c] transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Led by {dept.leader}
                  </p>
                </div>

                <p className="text-xs text-slate-600 font-serif line-clamp-3 leading-relaxed">
                  {dept.missionStatement}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#002f6c]">
                <span>{dept.meetingTime.split(" ")[0]}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  Portal →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-8 text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 bg-[#002f6c] hover:bg-[#00224f] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition shadow"
          >
            <span>Explore All Church Ministries &amp; Special Needs (APM)</span>
            <span>↗</span>
          </Link>
        </div>
      </section>

      {/* 7. EVENTS */}
      <section id="events" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
              Official 2026 Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#002f6c] tracking-tight">
              Upcoming Events &amp; Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">
              Plan ahead and participate in our worship gatherings, youth rallies, and ministry weeks.
            </p>
          </div>

          <Link
            href="/events"
            className="bg-[#002f6c] hover:bg-[#00224f] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition shadow shrink-0"
          >
            View Full 2026 Calendar (53 Events) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jesdacCalendar2026.slice(0, 6).map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#002f6c] border border-blue-100">
                    {ev.quarter} • {ev.month}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-700">
                    {ev.date}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-800 leading-snug">
                  {ev.event}
                </h3>

                <p className="text-xs text-slate-500 font-serif">
                  Department: <strong className="text-slate-700">{ev.department}</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Leader: <strong className="text-[#002f6c]">{ev.inCharge}</strong>
                </span>
                <Link href="/events" className="text-[#002f6c] font-bold hover:underline">
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BELIEFS */}
      <section id="beliefs" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#002f6c] tracking-tight">
            What Seventh-day Adventists Believe
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-serif">
            Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-base text-[#002f6c]">{b.title}</h3>
                <p className="text-xs text-slate-600 mt-2 font-serif leading-relaxed">
                  {b.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#b08400]">
                Key Verse: {b.keyScripture}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}