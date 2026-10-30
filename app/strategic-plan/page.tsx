"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  BookOpen,
  Layers,
} from "lucide-react";

type ViewMode = "full-plan" | "flyer";
type Language = "en" | "sw";

export default function StrategicPlanPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("full-plan");
  const [language, setLanguage] = useState<Language>("en");
  const [isLoadingDocument, setIsLoadingDocument] = useState<boolean>(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const fullPlanDriveId = "1d6sU6ueYQz1XzgpjTJfuIkM_F4ISi2QH";
  const flyerEnglishDriveId = "1pPvpKHja6Jw6pCxtf_U8LBOLL8tJdgb0";
  const flyerKiswahiliDriveId = "1zKM1Dp416dwvD_H8HjnuQVkFeow5U09z";

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeFileId =
    viewMode === "full-plan"
      ? fullPlanDriveId
      : language === "en"
      ? flyerEnglishDriveId
      : flyerKiswahiliDriveId;

  const activeTitle =
    viewMode === "full-plan"
      ? "Jericho SDA Church Strategic Plan 2026–2030 (Full Plan)"
      : language === "en"
      ? "Jericho SDA Strategic Plan Summary Flyer (English)"
      : "Mpango Mkakati wa Kanisa la Jericho SDA 2026–2030 (Kiswahili)";

  const reloadDocument = useCallback(() => {
    setIsLoadingDocument(true);
    setIsErrorModalOpen(false);
    if (iframeRef.current) {
      iframeRef.current.src = `https://drive.google.com/file/d/${activeFileId}/preview`;
    }
  }, [activeFileId]);

  // Handle document switch & auto-focus
  useEffect(() => {
    setIsLoadingDocument(true);
    setIsErrorModalOpen(false);

    // Timeout safety net if Drive hangs or fails to reach the browser within 15 seconds
    const safetyTimeout = setTimeout(() => {
      setIsLoadingDocument((loading) => {
        if (loading) {
          setIsErrorModalOpen(true);
          return false;
        }
        return false;
      });
    }, 15000);

    const focusTimer = setTimeout(() => {
      iframeRef.current?.focus();
    }, 400);

    return () => {
      clearTimeout(safetyTimeout);
      clearTimeout(focusTimer);
    };
  }, [viewMode, language, activeFileId]);

  const handleIframeLoad = () => {
    setIsLoadingDocument(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 font-sans py-6 sm:py-8 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Top Minimal Navigation Strip */}
        <div className="flex items-center justify-between px-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 transition"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Back to Church Home</span>
          </Link>

          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            Official Publication &bull; Read Only
          </span>
        </div>

        {/* Clean Header */}
        <div className="bg-white rounded-2xl border border-slate-300/80 shadow-xs p-5 sm:p-6 text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block font-mono">
            Seventh-Day Adventist Church &bull; Jericho Nairobi
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-slate-950 uppercase">
            Strategic Plan 2026–2030
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-blue-900 font-medium">
            Theme: &ldquo;Anchored in Christ to Grow in Mission&rdquo;
          </p>

          {/* Top Switcher Strip */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode("full-plan")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                  viewMode === "full-plan"
                    ? "bg-[#001f44] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Strategic Plan (62 Pages)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("flyer")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer ${
                  viewMode === "flyer"
                    ? "bg-[#001f44] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Strategic Summary Flyer</span>
              </button>
            </div>

            {/* Language Switcher (Visible when viewing the Flyer) */}
            {viewMode === "flyer" && (
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    language === "en"
                      ? "bg-amber-400 text-slate-950 shadow-xs"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("sw")}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    language === "sw"
                      ? "bg-amber-400 text-slate-950 shadow-xs"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  Kiswahili
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Informational Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-950 text-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-800/60 flex items-start sm:items-center gap-3">
          <div className="p-2 bg-amber-400/20 text-amber-300 rounded-lg shrink-0">
            {viewMode === "full-plan" ? (
              <BookOpen className="w-5 h-5" />
            ) : (
              <Layers className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-0.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-mono">
                {viewMode === "full-plan" ? "Complete Roadmap" : "Executive Summary"}
              </span>
              <h2 className="text-xs sm:text-sm font-semibold text-white">
                {viewMode === "full-plan"
                  ? "Five-Year Church Strategic Plan (62 Pages)"
                  : language === "en"
                  ? "Strategic Focus Flyer (English Edition)"
                  : "Kipeperushi cha Maeneo Muhimu ya Kimkakati (Kiswahili)"}
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-blue-100/80 leading-relaxed">
              {viewMode === "full-plan"
                ? "This is the official 2026–2030 Strategic Roadmap for Jericho SDA Church. Scroll through the pages or use your keyboard arrow keys to navigate."
                : language === "en"
                ? "Key strategic action areas, theme scripture, mission mandate, and church vision condensed for quick reference."
                : "Maeneo muhimu ya kimkakati, maono, dira ya utume, na mwelekeo wa miaka mitano kwa lugha ya Kiswahili."}
            </p>
          </div>
        </div>

        {/* Read-Only Document Viewer */}
        <div className="bg-white rounded-2xl border border-slate-300/80 shadow-md p-2 sm:p-4 space-y-2.5">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-slate-900 truncate">
                {activeTitle}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">
              Continuous Scroll &bull; Read Only
            </span>
          </div>

          <div
            onContextMenu={(e) => e.preventDefault()}
            className="relative select-none w-full h-[88vh] sm:h-[92vh] md:h-[980px] rounded-xl overflow-hidden border border-slate-200 bg-neutral-900 shadow-inner"
          >
            <iframe
              key={activeFileId}
              ref={iframeRef}
              src={`https://drive.google.com/file/d/${activeFileId}/preview`}
              width="100%"
              height="100%"
              title={activeTitle}
              onLoad={handleIframeLoad}
              className="w-full h-full border-none block"
              allow="autoplay"
              tabIndex={0}
            />

            {/* Click-shield overlay blocking Google Drive pop-out/download controls */}
            <div
              className="absolute top-0 right-0 w-14 h-14 bg-transparent z-20 cursor-default"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Stewardship Note */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 text-center space-y-1">
          <p className="font-semibold text-blue-900 text-[11px]">
            Jericho SDA Church Strategic Plan Implementation
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed max-w-xl mx-auto">
            Members, friends, and well-wishers are warmly invited to partner with us in prayer and stewardship (Lipa Na M-PESA Paybill: <strong>752922</strong>, Account: <strong>STRATEGIC PLAN</strong>).
          </p>
        </div>
      </div>

      {/* Loading Modal Overlay */}
      <LoadingModal
        isOpen={isLoadingDocument}
        title="Loading Strategic Publication…"
        subtitle="Rendering high-resolution document pages from the cloud repository."
      />

      {/* Error & Fallback Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Publication Load Notice"
        message="The strategic publication is taking longer than usual to stream from Google Drive. Please check your internet connection or reload the viewer."
        supportPhone="254700000000"
        onRetry={reloadDocument}
      />
    </div>
  );
}