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
    <main className="bg-[#fcfbf9] text-stone-900 pb-32">
      <FloatingAnnouncementBanner />

      {/* 1. HERO - Warm, reverent, and focused */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-44 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Jericho Seventh-day Adventist Church &bull; Nairobi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight leading-[1.15] text-stone-50">
            A Christ-Centered Sanctuary in the Heart of Jericho
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1">
            &ldquo;Come unto me, all ye that labour and are heavy laden, and I will give you rest.&rdquo;
            <cite className="block text-xs not-italic font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Matthew 11:28
            </cite>
          </blockquote>

          {/* Clean Primary vs Secondary Action Hierarchy */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/giving"
              className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-sm"
            >
              Online Giving &amp; Pledges
            </Link>

            <Link
              href="/care"
              className="bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 font-medium px-6 py-3 rounded-lg text-sm transition"
            >
              Pastoral Care &amp; Prayer
            </Link>

            <a
              href={liveStreamUrl || "https://www.youtube.com/@JerichoSDANairobi"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-white font-medium text-sm px-3 py-3 transition inline-flex items-center gap-1.5"
            >
              <span>Watch Sermons</span>
              <span className="text-xs">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Sabbath Worship Times Strip */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                Sabbath School
              </span>
              <p className="text-xl font-medium text-stone-100 mt-0.5">08:00 AM</p>
              <p className="text-xs text-stone-400 mt-0.5">Study &amp; Song</p>
            </div>

            <div className="border-l border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 block font-semibold">
                Divine Service
              </span>
              <p className="text-xl font-semibold text-amber-300 mt-0.5">11:00 AM</p>
              <p className="text-xs text-stone-400 mt-0.5">Worship Hour</p>
            </div>

            <div className="border-l-0 md:border-l border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                Youth Fellowship
              </span>
              <p className="text-xl font-medium text-stone-100 mt-0.5">02:00 PM</p>
              <p className="text-xs text-stone-400 mt-0.5">AY Ministry</p>
            </div>

            <div className="border-l border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                Missionary Visit
              </span>
              <p className="text-xl font-medium text-stone-100 mt-0.5">04:00 PM</p>
              <p className="text-xs text-stone-400 mt-0.5">Community Outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTION TILES */}
      <section className="max-w-5xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/care"
            className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition group"
          >
            <span className="text-xs font-semibold text-amber-700 block">Pastoral Care</span>
            <h2 className="font-semibold text-stone-900 group-hover:text-[#001f44] mt-1 text-base">
              Request Visit &rarr;
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Home, hospital, or virtual prayer with pastors and elders.
            </p>
          </Link>

          <Link
            href="/estates"
            className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition group"
          >
            <span className="text-xs font-semibold text-amber-700 block">Community</span>
            <h2 className="font-semibold text-stone-900 group-hover:text-[#001f44] mt-1 text-base">
              Prayer Cells &rarr;
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Find midweek small groups across Nairobi Eastlands.
            </p>
          </Link>

          <Link
            href="/leadership"
            className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition group"
          >
            <span className="text-xs font-semibold text-amber-700 block">Leadership</span>
            <h2 className="font-semibold text-stone-900 group-hover:text-[#001f44] mt-1 text-base">
              Officers Directory &rarr;
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Pastoral team, elders, secretariat, and department heads.
            </p>
          </Link>

          <Link
            href="/camp-meeting"
            className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition group"
          >
            <span className="text-xs font-semibold text-amber-700 block">Annual Feast</span>
            <h2 className="font-semibold text-stone-900 group-hover:text-[#001f44] mt-1 text-base">
              Camp Meeting &rarr;
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Theme guides, daily recordings, and camp memories.
            </p>
          </Link>
        </div>
      </section>

      {/* 3. ANNOUNCEMENT / MISSION SPOTLIGHT */}
      {currentAnnouncement?.active && (
        <section className="max-w-5xl mx-auto px-6 mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#001737] text-white">
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

            <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400 text-[#001737] font-semibold text-xs uppercase tracking-wider px-2.5 py-1 rounded">
                  {currentAnnouncement.badge}
                </span>
                <span className="text-xs text-stone-300">
                  {currentAnnouncement.dateOrQuarter}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight text-white leading-tight">
                {currentAnnouncement.title}
              </h2>

              <p className="text-sm text-stone-200 font-serif leading-relaxed">
                {currentAnnouncement.subtitle}
              </p>

              <ul className="space-y-1.5 pt-1 text-xs text-stone-200">
                {currentAnnouncement.highlightPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-semibold">&bull;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-wrap gap-3 items-center">
                <Link
                  href={currentAnnouncement.ctaLink || "/departments/adventist-youth"}
                  className="bg-amber-400 hover:bg-amber-300 text-[#001737] font-semibold text-xs uppercase tracking-wider py-3 px-5 rounded-lg transition"
                >
                  {currentAnnouncement.ctaLabel || "Read Mission Plan"} &rarr;
                </Link>
                <a
                  href="/one-voice-cover.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition"
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
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44]">
              Publications &amp; Bulletins
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-serif">
              Download weekly service programs, study guides, and church periodicals.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["All", "Magazine", "Weekly Bulletin", "Camp Guide"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPubFilter(cat)}
                className={`px-3 py-1 rounded text-xs font-medium transition cursor-pointer ${
                  pubFilter === cat
                    ? "bg-[#001f44] text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
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
              className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black/75 text-amber-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    {pub.category}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-medium text-stone-400 block uppercase">
                    {pub.issue}
                  </span>
                  <h3 className="font-serif font-semibold text-stone-900 text-sm mt-1 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  {pub.pageUrl && pub.pageUrl !== "#" ? (
                    <Link
                      href={pub.pageUrl}
                      className="text-xs font-semibold text-[#001f44] hover:underline"
                    >
                      Read More &rarr;
                    </Link>
                  ) : (
                    <span className="text-[11px] text-stone-400">
                      {pub.size}
                    </span>
                  )}

                  {pub.pdfUrl && pub.pdfUrl !== "#" && (
                    <a
                      href={pub.pdfUrl}
                      download
                      className="bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium px-3 py-1.5 rounded transition"
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
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-stone-900 text-white min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.isArray(campMeetingSlides) && campMeetingSlides.length > 0 && (
              <img
                src={campMeetingSlides[slideIdx]?.image || "/church-1.jpg"}
                alt={campMeetingSlides[slideIdx]?.title || "Camp Slide"}
                className="w-full h-full object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs text-amber-300 font-medium tracking-wide uppercase">
              Camp Retrospective &bull; {campMeetingYear}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-lg border border-white/20 transition cursor-pointer"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-lg border border-white/20 transition cursor-pointer"
              >
                &rsaquo;
              </button>
            </div>
          </div>

          <div className="relative z-10 max-w-xl space-y-2 pt-6">
            <span className="text-xs text-stone-300 uppercase tracking-wider block">
              Theme: &ldquo;{campMeetingTheme}&rdquo;
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              {campMeetingSlides[slideIdx]?.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed line-clamp-2">
              {campMeetingSlides[slideIdx]?.caption}
            </p>
            <div className="pt-2">
              <Link
                href="/camp-meeting"
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4"
              >
                View Full Story &amp; Photos &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINISTRIES */}
      <section id="departments" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44]">
              Church Ministries &amp; Departments
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-serif">
              Engage with our fellowships serving children, youth, families, and community outreach.
            </p>
          </div>

          <Link
            href="/ministries"
            className="text-xs font-semibold text-[#001f44] hover:underline shrink-0"
          >
            All 17 Ministries &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.slice(0, 6).map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm hover:border-[#001f44]/40 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-400">
                    {dept.leader}
                  </span>
                  {dept.featured && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-base text-stone-900 group-hover:text-[#001f44] transition">
                  {dept.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-serif">
                  {dept.missionStatement}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{dept.meetingTime.split(" ")[0]}</span>
                <span className="text-[#001f44] font-semibold group-hover:translate-x-0.5 transition-transform">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section id="events" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44]">
              Upcoming Events &amp; Services
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-serif">
              Worship gatherings, department initiatives, and fellowship weeks.
            </p>
          </div>

          <Link
            href="/events"
            className="text-xs font-semibold text-[#001f44] hover:underline shrink-0"
          >
            Full 2026 Calendar (53 Events) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jesdacCalendar2026.slice(0, 6).map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase tracking-wider font-semibold text-[#001f44]">
                    {ev.department}
                  </span>
                  <span className="font-medium text-stone-600">{ev.date}</span>
                </div>

                <h3 className="font-serif font-semibold text-sm text-stone-900 mt-2">
                  {ev.event}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Leader: {ev.inCharge}</span>
                <Link href="/events" className="text-[#001f44] font-medium hover:underline">
                  Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FUNDAMENTAL BELIEFS */}
      <section id="beliefs" className="max-w-5xl mx-auto px-6 pt-20">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44]">
            What Seventh-day Adventists Believe
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-serif leading-relaxed">
            Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beliefs.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif font-semibold text-base text-[#001f44]">
                  {b.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 font-serif leading-relaxed">
                  {b.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-medium text-amber-800">
                Scripture: {b.keyScripture}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}