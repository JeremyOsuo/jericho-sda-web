"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

export default function StrategicPlanPage() {
  const driveFileId = "1d6sU6ueYQz1XzgpjTJfuIkM_F4ISi2QH";
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Automatically focus the iframe so arrow keys work immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      iframeRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 font-sans py-6 sm:py-8 px-2 sm:px-6">
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
            Official Document &bull; Read Only
          </span>
        </div>

        {/* Clean Header */}
        <div className="bg-white rounded-2xl border border-slate-300/80 shadow-xs p-5 sm:p-6 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
            Seventh-Day Adventist Church &bull; Jericho Nairobi
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-slate-950 uppercase">
            Strategic Plan 2026–2030
          </h1>
          <p className="text-xs sm:text-sm italic font-serif text-slate-600">
            Theme: “Anchored in Christ to Grow in Mission”
          </p>
        </div>

        {/* Document Viewer Container */}
        <div className="bg-white rounded-2xl border border-slate-300/80 shadow-md p-2 sm:p-4 space-y-2.5">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-slate-900">
                Official Digital Plan (62 Pages)
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Interactive Viewer &bull; Use Arrow Keys &uarr; &darr;
            </span>
          </div>

          <div
            onContextMenu={(e) => e.preventDefault()}
            className="relative select-none w-full h-[88vh] sm:h-[92vh] md:h-[980px] rounded-xl overflow-hidden border border-slate-200 bg-neutral-900 shadow-inner"
          >
            <iframe
              ref={iframeRef}
              src={`https://drive.google.com/file/d/${driveFileId}/preview`}
              width="100%"
              height="100%"
              title="Jericho SDA Strategic Plan 2026-2030"
              className="w-full h-full border-none block"
              allow="autoplay"
              tabIndex={0}
            />

            {/* Shield overlay sized specifically to block the pop-out icon without obstructing page content */}
            <div
              className="absolute top-0 right-0 w-14 h-14 bg-transparent z-20 cursor-default"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Minimal Supporting Note */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 text-center space-y-1">
          <p className="font-semibold text-blue-900 text-[11px]">
            Jericho SDA Church Strategic Plan Implementation
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed max-w-xl mx-auto">
            Members, friends, and well-wishers are warmly invited to support and partner with us in prayer and stewardship as we embark on this five-year mission roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}