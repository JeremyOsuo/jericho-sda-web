"use client";

import React, { useEffect } from "react";
import AdventistLogo from "../components/AdventistLogo";
import { AlertTriangle, RefreshCw, MessageCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors internally without exposing them to users
    console.error("Global route error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#fcfbf9]">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-slate-200 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold bg-blue-50 px-2.5 py-0.5 rounded">
            <AdventistLogo className="w-3.5 h-3.5 text-amber-500" />
            <span>Jericho SDA Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-950">
            Page Notice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
            We could not complete loading this section. This is usually due to a momentary network drop or ongoing content updates.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1">
          <p className="font-semibold text-slate-800">Need direct assistance?</p>
          <p className="text-[11px] text-slate-500">
            You can reach the church secretariat or treasury desk directly on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 bg-[#001f44] hover:bg-slate-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reload Section</span>
          </button>

          <a
            href="https://wa.me/254700000000?text=Hello%20Jericho%20SDA%20Desk,%20I%20encountered%20an%20issue%20loading%20a%20page%20on%20the%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}