"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import FloatingAnnouncementBanner from "../components/FloatingAnnouncementBanner";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { currentAnnouncement } from "@/data/announcements";
import {
  ArrowRight,
  Download,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  const { bulletinUrl, liveStreamUrl } = useSiteSettings();
  const [pubFilter, setPubFilter] = useState("All");

  const channelHandle = "@JerichoSDANairobi";
  const defaultChannelUrl = `https://www.youtube.com/${channelHandle}`;

  const extractVideoId = (url: string | null | undefined): string | null => {
    if (!url || typeof url !== "string" || url.trim() === "" || url === "#")
      return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const activeVideoId = extractVideoId(liveStreamUrl);

  const publications = [
    {
      id: "jericho-herald-q3",
      title: "The Jericho Herald: Blessed Hope",
      issue: "Quarter 3 • Issue 14",
      quarter: "July – September 2026",
      coverImage: "/herald-cover.jpg",
      description: "Quarterly church magazine featuring pastoral reflections and reports.",
      category: "Magazine",
      size: "3.4 MB",
      pdfUrl: "#",
      pageUrl: "/magazine",
    },
    {
      id: "bulletin-current",
      title: "Sabbath Divine Bulletin",
      issue: "Vol. 42 • No. 36",
      quarter: "Weekly Order of Service",
      coverImage:
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80",
      description: "Duty elders register, hymn schedule, announcements, and accounts.",
      category: "Weekly Bulletin",
      size: "1.1 MB",
      pdfUrl: bulletinUrl || "#",
      pageUrl: "#",
    },
    {
      id: "camp-guide-2026",
      title: "Camp Meeting Souvenir Program",
      issue: "Theme: Obey, Trust & Live",
      quarter: "August 2026",
      coverImage: "/camp-poster-2026.jpeg",
      description: "Theme breakdown, daily song sheets (SDAH 590), and schedule.",
      category: "Camp Guide",
      size: "PDF",
      pdfUrl: "/camp-meeting-2026.pdf",
      pageUrl: "/camp-meeting",
    },
    {
      id: "youth-mission",
      title: "One Voice 27 Mission Handbook",
      issue: "Global Priority",
      quarter: "2026 / 2027",
      coverImage: "/one-voice-cover.png",
      description: "Handbook for door-to-door visitation and media evangelism.",
      category: "Magazine",
      size: "2.7 MB",
      pdfUrl: "#",
      pageUrl: "/departments/adventist-youth",
    },
  ];

  const filteredPubs =
    pubFilter === "All"
      ? publications
      : publications.filter((p) => p.category === pubFilter);

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 pb-28 font-sans selection:bg-blue-600 selection:text-white"
    >
      <FloatingAnnouncementBanner />

      {/* 1. HERO - Deep Navy Sanctuary */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-44 pb-20 sm:pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <img
            src="/choir-hero.jpg"
            alt="Jericho SDA Sanctuary Choir"
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001f44] via-[#001f44]/80 to-[#001f44]/70" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 border border-white/20 px-3.5 py-1 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Jericho Seventh-day Adventist Church &bull; Nairobi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight leading-[1.15] text-stone-50 drop-shadow-md">
            A Christ-Centered Sanctuary in the Heart of Jericho
          </h1>

          <blockquote className="text-stone-200 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Come unto me, all ye that labour and are heavy laden, and I will give you rest.&rdquo;
            <cite className="block text-xs not-italic font-sans font-medium text-amber-300 mt-1.5">
              &mdash; Matthew 11:28
            </cite>
          </blockquote>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/strategic-plan"
              className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
            
              <span>Strategic Plan 2026–2030</span>
            </Link>

            <Link
              href="/care"
              className="bg-white/10 hover:bg-white/20 text-stone-100 border border-white/30 backdrop-blur-md font-medium px-5 py-2.5 rounded-xl text-xs sm:text-sm transition"
            >
              Pastoral Care &amp; Prayer
            </Link>

            <a
              href={defaultChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-200 hover:text-white font-medium text-xs sm:text-sm px-3 py-2.5 transition inline-flex items-center gap-1.5"
            >
              <span>Watch Sermons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. SANCTUARY MEDIA & BROADCAST */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-slate-900/95 border border-blue-400/30 rounded-3xl p-5 sm:p-7 backdrop-blur-xl shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    activeVideoId ? "bg-red-400" : "bg-blue-400"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    activeVideoId ? "bg-red-500" : "bg-blue-500"
                  }`}
                />
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>
                    {activeVideoId
                      ? "Sanctuary Live Stream"
                      : "Sanctuary Sermons & Broadcasts"}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      activeVideoId
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {activeVideoId ? "LIVE" : "NEXT SABBATH"}
                  </span>
                </h2>
                <p className="text-xs text-blue-200">
                  Jericho SDA Church Official Broadcast ({channelHandle})
                </p>
              </div>
            </div>

            <a
              href={defaultChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold transition border border-red-500/30 w-fit shadow-xs"
            >
              <span>Watch on YouTube</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-inner">
            {activeVideoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
                title="Jericho SDA Church Sanctuary Broadcast"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
                <img
                  src="/choir-hero.jpg"
                  alt="Jericho SDA Sanctuary Choir"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />

                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="w-12 h-12 mx-auto rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-semibold text-white">
                      Live Broadcast Standby
                    </h3>
                    <p className="text-xs text-blue-200 mt-1 leading-relaxed">
                      Divine Service streams live every Sabbath morning from 11:00 AM.
                    </p>
                  </div>
                  <a
                    href={defaultChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition shadow-md"
                  >
                    <span>Browse Recorded Sermons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC PLAN 2026-2030 SPOTLIGHT CARD */}
      <section className="max-w-5xl mx-auto px-6 mt-12 relative z-10">
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl border border-blue-200/70 overflow-hidden shadow-xs flex flex-col md:flex-row items-center">
          <div className="md:w-5/12 w-full aspect-[16/10] md:aspect-auto self-stretch relative bg-slate-900 min-h-[200px] md:min-h-[240px]">
            <img
              src="/church-facade.jpg"
              alt="Jericho SDA Church Sanctuary"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 bg-[#001f44]/85 backdrop-blur-md text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>2026–2030 ROADMAP</span>
            </div>
          </div>
          <div className="md:w-7/12 p-6 sm:p-7 space-y-2.5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block border border-blue-100">
              Strategic Roadmap
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-blue-950 leading-snug font-normal">
              Anchored in Christ to Grow in Mission
            </h2>
            <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
              &ldquo;Where there is no vision, the people perish.&rdquo; (Proverbs 29:18). Explore our five-year spiritual and developmental blueprint guiding discipleship, infrastructure expansion, and mission.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono pt-0.5">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                Launch: Sabbath, 31 October 2026
              </span>
              <span>&bull;</span>
              <span>Jericho Sanctuary</span>
            </div>

            <div className="pt-1">
              <Link
                href="/strategic-plan"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition group"
              >
                <span className="group-hover:underline">
                  View Launch Programme &amp; Strategic Plan
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ANNOUNCEMENT / MISSION SPOTLIGHT */}
      {currentAnnouncement?.active && (
        <section className="max-w-5xl mx-auto px-6 mt-12">
          <div className="relative rounded-3xl overflow-hidden shadow-lg bg-blue-950 text-white border border-blue-400/30">
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
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
            </div>

            <div className="relative z-10 p-8 sm:p-10 max-w-2xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400 text-blue-950 font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {currentAnnouncement.badge}
                </span>
                <span className="text-xs text-blue-200">
                  {currentAnnouncement.dateOrQuarter}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight font-normal">
                {currentAnnouncement.title}
              </h2>

              <p className="text-sm text-blue-100 font-serif leading-relaxed">
                {currentAnnouncement.subtitle}
              </p>

              <ul className="space-y-1 pt-1 text-xs text-blue-100">
                {currentAnnouncement.highlightPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <Link
                  href={
                    currentAnnouncement.ctaLink ||
                    "/departments/adventist-youth"
                  }
                  className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition shadow-md"
                >
                  {currentAnnouncement.ctaLabel || "Read Mission Plan"} &rarr;
                </Link>
                <a
                  href="/one-voice-cover.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider py-2.5 px-3.5 rounded-xl transition border border-white/20"
                >
                  View Poster
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. PUBLICATIONS SHELF - Compact Horizontal Cards */}
      <section className="max-w-5xl mx-auto px-6 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-2.5 border-b border-blue-200 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-blue-950 font-normal">
              Publications &amp; Bulletins
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Weekly programs, study guides, and church periodicals.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["All", "Magazine", "Weekly Bulletin", "Camp Guide"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPubFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  pubFilter === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 border border-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-blue-200/70 shadow-xs hover:shadow-sm transition flex gap-3.5 items-center"
            >
              <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                <img
                  src={pub.coverImage}
                  alt={pub.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                    {pub.category}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {pub.issue}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {pub.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {pub.description}
                </p>

                <div className="pt-1 flex items-center gap-3">
                  {pub.pageUrl && pub.pageUrl !== "#" && (
                    <Link
                      href={pub.pageUrl}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                    >
                      Read &rarr;
                    </Link>
                  )}
                  {pub.pdfUrl && pub.pdfUrl !== "#" && (
                    <a
                      href={pub.pdfUrl}
                      download
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition"
                    >
                      <Download className="w-3 h-3 text-blue-600" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WORSHIP IN MUSIC SPOTLIGHT */}
      <section className="max-w-5xl mx-auto px-6 pt-14">
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl border border-blue-200/70 overflow-hidden shadow-xs flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full aspect-[16/10] md:aspect-auto self-stretch relative bg-slate-900 min-h-[180px]">
            <img
              src="/choir-worship.jpg"
              alt="Jericho SDA Sanctuary Choir Singing"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="md:w-1/2 p-6 sm:p-8 space-y-2.5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block border border-blue-100">
              Music Ministry
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-blue-950 leading-snug font-normal">
              Worship in Song &amp; Praise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
              &ldquo;Sing unto him, sing psalms unto him: talk ye of all his wondrous works.&rdquo; Our sanctuary choirs lead the congregation in hymns of blessed hope each Sabbath morning.
            </p>
            <div className="pt-1">
              <a
                href={defaultChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Listen to Choral Presentations on YouTube</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAITH & INQUIRY BANNER */}
      <section id="beliefs" className="max-w-5xl mx-auto px-6 pt-14">
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl border border-blue-200/70 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block border border-blue-100">
              Faith &amp; Doctrine
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-blue-950 leading-snug font-normal">
              Questions About Seventh-day Adventists?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
              Whether you are seeking personal Bible studies, curious about the Sabbath, or exploring Adventist teachings, our pastoral team and elders are ready to walk with you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <Link
              href="/care"
              className="text-center bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Ask a Pastor or Elder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/care"
              className="text-center bg-white hover:bg-blue-50 text-blue-900 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition border border-blue-200 shadow-2xs"
            >
              Explore Our Faith
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}