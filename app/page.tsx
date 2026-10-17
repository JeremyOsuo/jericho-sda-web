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
      pageUrl: "/bulletin",
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
    <main className="bg-slate-950 text-slate-100 pb-32 selection:bg-emerald-500/30 selection:text-emerald-200">
      <FloatingAnnouncementBanner />

      {/* 1. HERO - Dark Navy Sanctuary with Emerald Ambient Glow */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001737] via-slate-950 to-slate-950 text-white pt-36 sm:pt-44 pb-24 px-6 border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-br from-emerald-600/15 via-teal-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs tracking-wider uppercase font-medium">
            <AdventistLogo className="w-4 h-4 text-emerald-400" />
            <span>Jericho Seventh-day Adventist Church • Nairobi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight leading-[1.15] text-white">
            A Christ-Centered Sanctuary in the Heart of Jericho
          </h1>

          <blockquote className="text-slate-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1">
            &ldquo;Come unto me, all ye that labour and are heavy laden, and I will give you rest.&rdquo;
            <cite className="block text-xs not-italic font-sans font-medium text-emerald-400 mt-1.5">
              &mdash; Matthew 11:28
            </cite>
          </blockquote>

          {/* Action Hierarchy */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/giving"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/60 border border-emerald-400/30"
            >
              Online Giving &amp; Pledges
            </Link>

            <Link
              href="/care"
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-medium px-6 py-3 rounded-xl text-sm transition"
            >
              Pastoral Care &amp; Prayer
            </Link>

            <a
              href={liveStreamUrl || "https://www.youtube.com/@JerichoSDANairobi"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-400 font-medium text-sm px-3 py-3 transition inline-flex items-center gap-1.5"
            >
              <span>Watch Sermons</span>
              <span className="text-xs">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Sabbath Worship Times Strip */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                Sabbath School
              </span>
              <p className="text-xl font-medium text-slate-100 mt-0.5">08:00 AM</p>
              <p className="text-xs text-slate-400 mt-0.5">Study &amp; Song</p>
            </div>

            <div className="border-l border-slate-800/80">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 block font-semibold">
                Divine Service
              </span>
              <p className="text-xl font-semibold text-emerald-300 mt-0.5">11:00 AM</p>
              <p className="text-xs text-slate-400 mt-0.5">Worship Hour</p>
            </div>

            <div className="border-l-0 md:border-l border-slate-800/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                Youth Fellowship
              </span>
              <p className="text-xl font-medium text-slate-100 mt-0.5">02:00 PM</p>
              <p className="text-xs text-slate-400 mt-0.5">AY Ministry</p>
            </div>

            <div className="border-l border-slate-800/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                Missionary Visit
              </span>
              <p className="text-xl font-medium text-slate-100 mt-0.5">04:00 PM</p>
              <p className="text-xs text-slate-400 mt-0.5">Community Outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION TILES - Elevated Dark Glass */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/care"
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition backdrop-blur-md group"
          >
            <span className="text-xs font-semibold text-emerald-400 block">Pastoral Care</span>
            <h2 className="font-semibold text-white group-hover:text-emerald-300 mt-1 text-base">
              Request Visit &rarr;
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Home, hospital, or virtual prayer with pastors and elders.
            </p>
          </Link>

          <Link
            href="/estates"
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition backdrop-blur-md group"
          >
            <span className="text-xs font-semibold text-emerald-400 block">Community</span>
            <h2 className="font-semibold text-white group-hover:text-emerald-300 mt-1 text-base">
              Prayer Cells &rarr;
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Find midweek small groups across Nairobi Eastlands.
            </p>
          </Link>

          <Link
            href="/leadership"
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition backdrop-blur-md group"
          >
            <span className="text-xs font-semibold text-emerald-400 block">Leadership</span>
            <h2 className="font-semibold text-white group-hover:text-emerald-300 mt-1 text-base">
              Officers Directory &rarr;
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Pastoral team, elders, secretariat, and department heads.
            </p>
          </Link>

          <Link
            href="/camp-meeting"
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition backdrop-blur-md group"
          >
            <span className="text-xs font-semibold text-emerald-400 block">Annual Feast</span>
            <h2 className="font-semibold text-white group-hover:text-emerald-300 mt-1 text-base">
              Camp Meeting &rarr;
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Theme guides, daily recordings, and camp memories.
            </p>
          </Link>
        </div>
      </section>

      {/* 3. ANNOUNCEMENT / MISSION SPOTLIGHT - Signature Emerald-to-Navy Gradient */}
      {currentAnnouncement?.active && (
        <section className="max-w-5xl mx-auto px-6 mt-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-slate-900 border border-emerald-500/30 text-white backdrop-blur-md">
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
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

            <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded">
                  {currentAnnouncement.badge}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {currentAnnouncement.dateOrQuarter}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight text-white leading-tight">
                {currentAnnouncement.title}
              </h2>

              <p className="text-sm text-slate-200 font-serif leading-relaxed">
                {currentAnnouncement.subtitle}
              </p>

              <ul className="space-y-1.5 pt-1 text-xs text-slate-200">
                {currentAnnouncement.highlightPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-semibold">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap gap-3 items-center">
                <Link
                  href={currentAnnouncement.ctaLink || "/departments/adventist-youth"}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl transition"
                >
                  {currentAnnouncement.ctaLabel || "Read Mission Plan"} &rarr;
                </Link>
                <a
                  href="/one-voice-cover.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/80 hover:bg-slate-700 text-white font-medium text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition border border-slate-700"
                >
                  View Poster
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PUBLICATIONS SHELF */}
      <section className="max-w-5xl mx-auto px-6 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Publications &amp; Bulletins
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              Download weekly service programs, study guides, and church periodicals.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["All", "Magazine", "Weekly Bulletin", "Camp Guide"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPubFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  pubFilter === cat
                    ? "bg-emerald-600 text-white border border-emerald-400/30"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800/80 shadow-md flex flex-col justify-between hover:border-emerald-500/30 transition group"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-emerald-400 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/20">
                    {pub.category}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-medium text-slate-400 block uppercase">
                    {pub.issue}
                  </span>
                  <h3 className="font-serif font-semibold text-white text-sm mt-1 leading-snug group-hover:text-emerald-300 transition">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  {pub.pageUrl && pub.pageUrl !== "#" ? (
                    <Link
                      href={pub.pageUrl}
                      className="text-xs font-semibold text-emerald-400 hover:underline"
                    >
                      Read More &rarr;
                    </Link>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      {pub.size}
                    </span>
                  )}

                  {pub.pdfUrl && pub.pdfUrl !== "#" && (
                    <a
                      href={pub.pdfUrl}
                      download
                      className="bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition border border-slate-700"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAMP RETROSPECTIVE */}
      <section className="max-w-5xl mx-auto px-6 pt-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 text-white min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.isArray(campMeetingSlides) && campMeetingSlides.length > 0 && (
              <img
                src={campMeetingSlides[slideIdx]?.image || "/church-1.jpg"}
                alt={campMeetingSlides[slideIdx]?.title || "Camp Slide"}
                className="w-full h-full object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-medium tracking-wide uppercase bg-slate-950/60 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-500/20">
              Camp Retrospective &bull; {campMeetingYear}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous"
                className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center text-lg border border-slate-700 transition cursor-pointer"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next"
                className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white flex items-center justify-center text-lg border border-slate-700 transition cursor-pointer"
              >
                &rsaquo;
              </button>
            </div>
          </div>

          <div className="relative z-10 max-w-xl space-y-2 pt-6">
            <span className="text-xs text-slate-300 uppercase tracking-wider block">
              Theme: &ldquo;{campMeetingTheme}&rdquo;
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              {campMeetingSlides[slideIdx]?.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed line-clamp-2">
              {campMeetingSlides[slideIdx]?.caption}
            </p>
            <div className="pt-2">
              <Link
                href="/camp-meeting"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                View Full Story &amp; Photos &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINISTRIES */}
      <section id="departments" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Church Ministries &amp; Departments
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              Engage with our fellowships serving children, youth, families, and community outreach.
            </p>
          </div>

          <Link
            href="/ministries"
            className="text-xs font-semibold text-emerald-400 hover:underline shrink-0"
          >
            All 17 Ministries &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.slice(0, 6).map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="bg-slate-900/60 rounded-2xl p-5 border border-slate-800/80 shadow-sm hover:border-emerald-500/40 hover:bg-slate-900/90 transition flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {dept.leader}
                  </span>
                  {dept.featured && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-base text-white group-hover:text-emerald-300 transition">
                  {dept.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-serif">
                  {dept.missionStatement}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{dept.meetingTime.split(" ")[0]}</span>
                <span className="text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section id="events" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Upcoming Events &amp; Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              Worship gatherings, department initiatives, and fellowship weeks.
            </p>
          </div>

          <Link
            href="/events"
            className="text-xs font-semibold text-emerald-400 hover:underline shrink-0"
          >
            Full 2026 Calendar (53 Events) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jesdacCalendar2026.slice(0, 6).map((ev) => (
            <div
              key={ev.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="uppercase tracking-wider font-semibold text-emerald-400">
                    {ev.department}
                  </span>
                  <span className="font-mono text-slate-300">{ev.date}</span>
                </div>

                <h3 className="font-serif font-semibold text-sm text-white mt-2">
                  {ev.event}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Leader: {ev.inCharge}</span>
                <Link href="/events" className="text-emerald-400 font-medium hover:underline">
                  Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FUNDAMENTAL BELIEFS - Dark Grid Cards */}
      <section id="beliefs" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            What Seventh-day Adventists Believe
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-serif leading-relaxed">
            Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beliefs.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 transition group"
            >
              <div>
                <h3 className="font-serif font-semibold text-base text-white group-hover:text-emerald-300 transition">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-serif leading-relaxed">
                  {b.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-medium text-emerald-400">
                Scripture: {b.keyScripture}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}