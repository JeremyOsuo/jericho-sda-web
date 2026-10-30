"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  ArrowRight,
  Feather,
  FileText,
  X,
  FileEdit,
  Eye,
} from "lucide-react";

interface MagazineIssue {
  id: string;
  title: string;
  issueNo: string;
  quarter: string;
  themeVerse: string;
  themeScriptureFull: string;
  coverImage: string;
  description: string;
  editorialNote: string;
  contents: { title: string; category: string; author: string; page: string }[];
  isLatest?: boolean;
}

const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: "mag-q3-2026",
    title: "The Blessed Hope",
    issueNo: "Vol. 14 • Issue 3",
    quarter: "Quarter 3 • July – September 2026",
    themeVerse: "Titus 2:13",
    themeScriptureFull:
      "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.",
    coverImage: "/herald-cover.jpg",
    description:
      "A deep examination of living with prophetic anticipation in an urban environment, featuring community impact reports from Nairobi Eastlands and practical family devotions.",
    editorialNote:
      "In this edition, our writers look beyond transient city anxieties toward the immutable anchor of Christ's imminent return.",
    contents: [
      {
        title: "Living in the Blessed Hope",
        category: "Pastoral Reflection",
        author: "Pr. Host Pastor",
        page: "04",
      },
      {
        title: "One Voice 27 & Urban Outposts",
        category: "Field Evangelism",
        author: "Personal Ministries Desk",
        page: "12",
      },
      {
        title: "Anchoring Youth in the Modern Metropolis",
        category: "Christian Home",
        author: "Family Life Council",
        page: "18",
      },
      {
        title: "Sacred Anthems: Choral Heritage",
        category: "Music & Liturgy",
        author: "Jericho Choir Master",
        page: "26",
      },
    ],
    isLatest: true,
  },
  {
    id: "mag-q2-2026",
    title: "Rooted & Grounded",
    issueNo: "Vol. 14 • Issue 2",
    quarter: "Quarter 2 • April – June 2026",
    themeVerse: "Colossians 2:6-7",
    themeScriptureFull:
      "As ye have therefore received Christ Jesus the Lord, so walk ye in him: Rooted and built up in him...",
    coverImage: "/herald-cover.jpg",
    description:
      "Discipleship development across local residential estate prayer cells, combined with practical community wellness initiatives.",
    editorialNote:
      "Faith finds its deepest soil when shared in fellowship across our neighborhoods in Buruburu, Makadara, and Lumumba.",
    contents: [
      {
        title: "The Midweek Prayer Cell Movement",
        category: "Community",
        author: "Prayer Cell Coordinator",
        page: "06",
      },
      {
        title: "Holistic Health for the Urban Family",
        category: "Health Ministry",
        author: "Health Team",
        page: "14",
      },
    ],
  },
  {
    id: "mag-q1-2026",
    title: "Arise and Shine",
    issueNo: "Vol. 14 • Issue 1",
    quarter: "Quarter 1 • January – March 2026",
    themeVerse: "Isaiah 60:1",
    themeScriptureFull:
      "Arise, shine; for thy light is come, and the glory of the Lord is risen upon thee.",
    coverImage: "/herald-cover.jpg",
    description:
      "Laying out church strategic priorities for the 2026–2030 quinquennium alongside member personal testimonies.",
    editorialNote:
      "A collective look forward as we anchor church resources in aggressive evangelism and discipleship.",
    contents: [
      {
        title: "The Five-Year Roadmap Unveiled",
        category: "Vision",
        author: "First Elder & Council",
        page: "05",
      },
      {
        title: "Testimonies of Answered Prayers",
        category: "Testimony",
        author: "Various Members",
        page: "20",
      },
    ],
  },
];

export default function MagazinePage() {
  const currentIssue =
    MAGAZINE_ISSUES.find((i) => i.isLatest) || MAGAZINE_ISSUES[0];
  const pastIssues = MAGAZINE_ISSUES.filter((i) => !i.isLatest);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [selectedIssueTitle, setSelectedIssueTitle] = useState("");

  const churchPhone = "254700000000";
  const googleFormEmbedUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdPHq8QDy291U6-PaWsVGm0CXwq1_YLV1sB4Fnpn6_XuSPU4Q/viewform?embedded=true";

  // Prevent background scroll when submission modal is active
  useEffect(() => {
    if (isFormModalOpen) {
      document.body.style.overflow = "hidden";
      setIsFormLoading(true);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFormModalOpen]);

  const handleOpenNotice = (issueTitle?: string) => {
    setSelectedIssueTitle(issueTitle || currentIssue.title);
    setIsNoticeModalOpen(true);
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 pb-24 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* 1. EDITORIAL MASTHEAD WITH SANCTUARY PHOTO HERO */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-16 px-6 overflow-hidden border-b border-blue-950/20">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="/church-facade.jpg"
            alt="Jericho SDA Sanctuary"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001f44] via-[#001f44]/85 to-[#001f44]/75" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 border border-white/20 px-3.5 py-1 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Official Periodical &bull; Jericho SDA Church</span>
          </div>

          <div className="py-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white uppercase border-y border-white/20 py-3 sm:py-4">
              The Jericho Herald
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 text-[11px] font-mono text-stone-300 uppercase tracking-wider">
            <span>Quarterly Periodical &bull; {currentIssue.issueNo}</span>
            <span className="italic font-serif normal-case hidden sm:inline text-amber-300">
              &ldquo;Proclaiming the Everlasting Gospel to Eastlands&rdquo;
            </span>
            <span>{currentIssue.quarter.split("•")[1] || "Quarter 3 2026"}</span>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-12">
        {/* Featured Issue Showcase */}
        <section className="bg-white/95 backdrop-blur-md rounded-3xl border border-blue-200/80 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Magazine Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group max-w-[270px] w-full">
                <div className="relative aspect-[3/4.2] rounded-r-xl rounded-l-xs overflow-hidden shadow-[0_20px_50px_rgba(0,31,68,0.25)] border-y border-r border-slate-300 bg-slate-900 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent z-20 pointer-events-none" />

                  <img
                    src={currentIssue.coverImage}
                    alt={currentIssue.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-3 left-4 z-20">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Upcoming Edition
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 text-white z-20">
                    <span className="text-[10px] font-mono text-amber-300 block uppercase">
                      Theme Scripture
                    </span>
                    <p className="text-xs font-serif italic text-stone-200">
                      {currentIssue.themeVerse}
                    </p>
                  </div>
                </div>

                <div className="w-5/6 h-4 bg-slate-900/15 rounded-full blur-md mx-auto mt-4" />
              </div>

              {/* Action Buttons: Opens In-Browser Notice */}
              <div className="flex items-center gap-2.5 mt-5 w-full max-w-[270px]">
                <button
                  type="button"
                  onClick={() => handleOpenNotice(currentIssue.title)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read in Browser</span>
                </button>
                <Link
                  href="/bulletin"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl transition inline-flex items-center justify-center"
                  title="View Weekly Bulletin"
                >
                  <FileText className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Editorial Metadata & Table of Contents */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    {currentIssue.quarter}
                  </span>
                  <span className="text-xs font-mono text-amber-600 font-medium">
                    Editorial Desk &bull; In Curation
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight leading-tight">
                  &ldquo;{currentIssue.title}&rdquo;
                </h2>

                <blockquote className="text-xs sm:text-sm font-serif italic text-slate-600 border-l-2 border-amber-400 pl-3 leading-relaxed">
                  &ldquo;{currentIssue.themeScriptureFull}&rdquo;
                  <cite className="block not-italic font-sans font-bold text-amber-700 text-[11px] mt-0.5">
                    &mdash; {currentIssue.themeVerse}
                  </cite>
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
                {currentIssue.description}
              </p>

              {/* Table of Contents */}
              <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-blue-600" />
                    <span>Selected Table of Contents</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">PAGE</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {currentIssue.contents.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2 flex items-baseline justify-between gap-4 text-xs group"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 block">
                          {item.category}
                        </span>
                        <h4 className="font-serif font-semibold text-slate-900 group-hover:text-blue-900 transition truncate">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 italic">
                          by {item.author}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-900 transition">
                        p.{item.page}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 font-serif">
                <span className="italic">{currentIssue.editorialNote}</span>
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(true)}
                  className="text-blue-700 hover:text-blue-900 font-sans font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Submit an article for next edition</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Previous Editions */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-300 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-900 font-bold block">
                Archive Catalogue
              </span>
              <h3 className="text-2xl font-serif font-black text-slate-950">
                Back Issues &amp; Past Volumes
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-serif">
              Explore previous quarters of spiritual devotions and church history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pastIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white/95 backdrop-blur-xs rounded-2xl border border-blue-200/70 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-20 aspect-[3/4] rounded-md bg-slate-900 shrink-0 overflow-hidden shadow-sm border border-slate-200 relative">
                    <img
                      src={issue.coverImage}
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute left-0 inset-y-0 w-1.5 bg-black/40" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      {issue.quarter}
                    </span>
                    <h4 className="font-serif font-bold text-base text-slate-950 leading-snug">
                      {issue.title}
                    </h4>
                    <span className="text-xs text-amber-700 font-medium font-serif block">
                      Verse: {issue.themeVerse}
                    </span>
                    <p className="text-xs text-slate-600 font-serif line-clamp-2 leading-relaxed pt-1">
                      {issue.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-400">
                    Digital Periodical
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenNotice(issue.title)}
                    className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Read Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CALL FOR SUBMISSIONS */}
        <section className="bg-amber-100/60 border border-amber-300/70 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-900 tracking-wider bg-amber-200/70 px-2.5 py-0.5 rounded-full inline-block">
              Writers &bull; Testimonies &bull; Reports
            </span>
            <h3 className="text-xl font-serif font-black text-slate-950">
              Submit to The Jericho Herald
            </h3>
            <p className="text-xs text-slate-700 font-serif leading-relaxed">
              Have a personal testimony of answered prayer, a poem, an article on Christian living, or a departmental report? Our editorial board welcomes quarterly submissions from church members and youth.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(true)}
              className="text-center bg-[#001f44] hover:bg-slate-900 text-white font-semibold text-xs px-5 py-3 rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileEdit className="w-4 h-4 text-amber-400" />
              <span>Submit an Article &rarr;</span>
            </button>
            <Link
              href="/bulletin"
              className="text-center bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs px-4 py-3 rounded-xl border border-amber-300/80 transition"
            >
              Weekly Bulletin
            </Link>
          </div>
        </section>
      </div>

      {/* 5. EDITORIAL PREPARATION NOTICE MODAL */}
      <ErrorModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        title="Issue In Preparation"
        message={`There is no published issue available for online reading at this moment. The editorial committee is currently compiling and laying out articles for "${selectedIssueTitle}". Article submissions and testimonies are still actively being received.`}
        supportPhone={churchPhone}
        onRetry={() => {
          setIsNoticeModalOpen(false);
          setIsFormModalOpen(true);
        }}
      />

      {/* 6. ARTICLE SUBMISSION MODAL (LIVE GOOGLE FORM EMBED) */}
      {isFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsFormModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col h-[85vh] max-h-[780px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50 shrink-0">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold bg-blue-100/70 px-2 py-0.5 rounded">
                  <Feather className="w-3 h-3 text-blue-700" />
                  <span>The Jericho Herald Editorial</span>
                </div>
                <h3 className="font-serif font-black text-lg sm:text-xl text-slate-950">
                  Article &amp; Testimony Submissions
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Live Google Form */}
            <div className="w-full flex-1 bg-neutral-50 relative overflow-hidden">
              <iframe
                src={googleFormEmbedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-none block"
                title="Jericho Herald Article Submission Form"
                onLoad={() => setIsFormLoading(false)}
              />
              {isFormLoading && (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center space-y-2 text-stone-500 font-serif text-xs">
                  <div className="w-6 h-6 border-2 border-[#001f44] border-t-transparent rounded-full animate-spin" />
                  <span>Loading article submission form…</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}