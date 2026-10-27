"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import AdventistLogo from "./AdventistLogo";

interface AuthGateCardProps {
  title?: string;
  message?: string;
  requiredRole?: string;
}

export default function AuthGateCard({
  title = "Authentication Required",
  message = "You have signed out and can no longer access this page. Please sign in to continue or return home.",
  requiredRole,
}: AuthGateCardProps) {
  const router = useRouter();

  const handleOkay = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-900/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Shield / Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
          🔒
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <AdventistLogo className="w-3.5 h-3.5 text-[#001737]" />
            <span>Jericho SDA Sanctuary</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-serif text-[#001737]">
            {title}
          </h2>

          <p className="text-xs text-slate-600 font-serif leading-relaxed px-2">
            {message}
          </p>

          {requiredRole && (
            <div className="pt-1">
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md inline-block">
                Required Role: {requiredRole}
              </span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={handleOkay}
            className="w-full bg-[#001737] hover:bg-[#002f6c] text-amber-300 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow-lg cursor-pointer"
          >
            Okay, Return Home
          </button>

          <Link
            href="/login"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl block transition text-center"
          >
            Sign In with Another Account →
          </Link>
        </div>
      </div>
    </main>
  );
}