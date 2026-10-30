import React from "react";
import { Loader2 } from "lucide-react";
import AdventistLogo from "../components/AdventistLogo";

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded">
            <AdventistLogo className="w-3.5 h-3.5 text-amber-500" />
            <span>Jericho SDA Church</span>
          </div>
          <h3 className="font-serif font-bold text-lg text-slate-950">
            Loading Page
          </h3>
          <p className="text-xs text-slate-500 font-serif">
            Retrieving church updates and announcements…
          </p>
        </div>
      </div>
    </div>
  );
}