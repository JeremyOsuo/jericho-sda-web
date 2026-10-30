    "use client";

import React from "react";
import { Loader2 } from "lucide-react";
import AdventistLogo from "./AdventistLogo";

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
}

export default function LoadingModal({
  isOpen,
  title = "Connecting to Church Records…",
  subtitle = "Please wait a moment while we retrieve the details.",
}: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-center space-y-4">
        {/* Animated Badge */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-blue-50 border border-blue-100 animate-pulse" />
          <Loader2 className="w-8 h-8 text-blue-700 animate-spin relative z-10" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded">
            <AdventistLogo className="w-3.5 h-3.5 text-amber-500" />
            <span>Jericho SDA Portal</span>
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-950">
            {title}
          </h3>
          <p className="text-xs text-slate-600 font-serif leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}