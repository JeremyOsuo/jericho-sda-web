"use client";

import React from "react";
import Link from "next/link";

interface MagazineIssue {
  id: string;
  title: string;
  quarter: string;
  themeVerse: string;
  coverImage: string;
  description: string;
  highlights: string[];
  pdfUrl: string;
  fileSize: string;
  isLatest?: boolean;
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: "mag-q3-2026",
    title: "Quarterly Magazine: Blessed Hope",
    quarter: "Quarter 3 • July – September 2026",
    themeVerse: "Titus 2:13",
    coverImage: "/herald-cover.jpg",
    description:
      "Our official quarterly church magazine featuring pastoral reflections, ministry reports across Nairobi Eastlands, family devotions, and member testimonies.",
    highlights: [
      "Pastoral Reflection: Living in the Blessed Hope",
      "Field Report: Neighborhood Outreach & One Voice 27",
      "Christian Family: Anchoring Youth in the Modern City",
      "Sanctuary Choir: Sacred Anthems and Congregational Song",
    ],
    pdfUrl: "#",
    fileSize: "3.4 MB",
    isLatest: true,
  },
  {
    id: "mag-q2-2026",
    title: "Quarterly Magazine: Rooted & Grounded",
    quarter: "Quarter 2 • April – June 2026",
    themeVerse: "Colossians 2:6-7",
    coverImage: "/herald-cover.jpg",
    description:
      "Focusing on discipleship, small group prayer cell development across local residential estates, and community health.",
    highlights: [
      "Midweek Prayer Cells: Strengthening Home Fellowships",
      "Health & Lifestyle: Practical Wellness in Eastlands",
      "Youth Perspectives: Faithful Living at School and Work",
    ],
    pdfUrl: "#",
    fileSize: "2.9 MB",
  },
  {
    id: "mag-q1-2026",
    title: "Quarterly Magazine: Arise and Shine",
    quarter: "Quarter 1 • January – March 2026",
    themeVerse: "Isaiah 60:1",
    coverImage: "/herald-cover.jpg",
    description:
      "A look forward at church strategic priorities, departmental roadmaps, and testimonies of answered prayers.",
    highlights: [
      "New Year Pastoral Charge & Vision",
      "Departmental Calendars & Mission Goals",
      "Personal Testimonies of God's Faithfulness",
    ],
    pdfUrl: "#",
    fileSize: "3.1 MB",
  },
];

export default function MagazinePage() {
  const currentIssue = MAGAZINE_ISSUES.find((i) => i.isLatest) || MAGAZINE_ISSUES[0];
  const pastIssues = MAGAZINE_ISSUES.filter((i) => !i.isLatest);

  return (
    <main className="bg-[#fcfbf9] text-stone-900 min-h-screen pb-24 pt-32 sm:pt-40">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Top Header Strip */}
        <section className="bg-[#001f44] text-white rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-400/10 border border-amber-300/20 px-3 py-1 rounded-full inline-block">
              Official Publication
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-50 leading-tight">
              Jericho Church Magazine
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-serif leading-relaxed pt-1">
              Quarterly reflections, testimonies, and departmental reports published by Jericho Seventh-day Adventist Church.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300 relative z-10">
            <span>Published by the Church Communications &amp; Editorial Desk</span>
            <Link
              href="/bulletin"
              className="text-amber-300 hover:text-white font-medium underline underline-offset-4 transition"
            >
              Looking for Weekly Sabbath Bulletin? &rarr;
            </Link>
          </div>
        </section>

        {/* Current Issue Spotlight */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-64 shrink-0 aspect-[3/4] bg-stone-900 rounded-xl overflow-hidden shadow-md relative group">
              <img
                src={currentIssue.coverImage}
                alt={currentIssue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-amber-400 text-[#001f44] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                Current Issue
              </span>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  {currentIssue.quarter} &bull; Scripture: {currentIssue.themeVerse}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#001f44] mt-1">
                  {currentIssue.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed mt-2">
                  {currentIssue.description}
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70 space-y-2">
                <h3 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                  In This Edition:
                </h3>
                <ul className="text-xs text-stone-600 space-y-1.5">
                  {currentIssue.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-semibold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={currentIssue.pdfUrl}
                  download
                  className="bg-[#001f44] hover:bg-[#001633] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>Download Digital PDF</span>
                  <span className="text-[10px] text-stone-300">({currentIssue.fileSize})</span>
                </a>
                <Link
                  href="/care"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium px-4 py-2.5 rounded-xl transition"
                >
                  Request Printed Copy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Previous Editions Archive */}
        <section className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-serif text-[#001f44]">
              Previous Editions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-serif">
              Archive of past quarterly magazines and pastoral reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-medium text-stone-400 block uppercase">
                    {issue.quarter}
                  </span>
                  <h3 className="font-serif font-semibold text-lg text-stone-900">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed line-clamp-3">
                    {issue.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">PDF &bull; {issue.fileSize}</span>
                  <a
                    href={issue.pdfUrl}
                    download
                    className="text-xs font-semibold text-[#001f44] hover:underline"
                  >
                    Download PDF &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Member Submission Banner */}
        <section className="bg-amber-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-1.5">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-900 tracking-wider">
              Editorial Submissions
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-semibold text-stone-900">
              Have a Testimony, Article, or Department Report?
            </h3>
            <p className="text-xs text-stone-600 font-serif leading-relaxed">
              Submissions for the upcoming quarterly edition are reviewed by the editorial desk. Share what God is doing through your family or ministry.
            </p>
          </div>
          <Link
            href="/care"
            className="shrink-0 bg-[#001f44] hover:bg-[#001633] text-white text-xs font-semibold px-5 py-3 rounded-xl transition shadow-sm"
          >
            Submit an Article &rarr;
          </Link>
        </section>

      </div>
    </main>
  );
}