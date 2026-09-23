"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { useAuth, UserRole, UserProfile } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loginAs, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Interstitial states
  const [isVerifying, setIsVerifying] = useState(false);
  const [justLoggedInUser, setJustLoggedInUser] = useState<UserProfile | null>(null);

  const triggerVerification = (role: UserRole) => {
    setIsVerifying(true);

    // Simulate authentic authentication verification
    setTimeout(() => {
      loginAs(role);

      // Determine profile data for the welcome screen
      const profileData: UserProfile =
        role === "admin"
          ? {
              id: "adm-01",
              name: "Church Web Administrator",
              email: "admin@jerichosda.church",
              role: "admin",
              portalTitle: "Admin Console",
              portalUrl: "/admin",
              avatarInitials: "AD",
            }
          : {
              id: "mem-01",
              name: "Bro. Brian Otieno",
              email: "member@jerichosda.church",
              role: "member",
              portalTitle: "Member Portal",
              portalUrl: "/portal",
              estate: "Jericho Estate",
              department: "Adventist Youth",
              avatarInitials: "BO",
            };

      setJustLoggedInUser(profileData);
      setIsVerifying(false);
    }, 1100);
  };

  const handleRoleQuickLogin = (role: UserRole) => {
    triggerVerification(role);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVerification("member");
  };

  const handleContinue = () => {
    if (justLoggedInUser?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-center py-28 px-6">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center shadow-md">
              <AdventistLogo className="w-6 h-6 text-[#001737]" />
            </div>
          </Link>
          <h1 className="text-2xl font-black font-serif text-[#001737] tracking-tight">
            Jericho SDA Portal Access
          </h1>
          <p className="text-xs text-slate-500 font-serif">
            Sign in to access your estate prayer cell or church administration tools.
          </p>
        </div>

        {/* 1. VERIFYING CREDENTIALS SPINNER */}
        {isVerifying && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 border-4 border-[#001737]/20 border-t-[#001737] rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold font-serif text-slate-900">
                Verifying Session &amp; Clearance...
              </h2>
              <p className="text-xs text-slate-500 font-serif">
                Authenticating credentials with Jericho SDA security gate.
              </p>
            </div>
          </div>
        )}

        {/* 2. WELCOME CARD (WAIT FOR "CONTINUE") */}
        {!isVerifying && (justLoggedInUser || user) && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#001737] text-amber-300 flex items-center justify-center font-mono font-bold text-xl mx-auto shadow-md">
              {(justLoggedInUser || user)?.avatarInitials}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
                Authentication Successful
              </span>
              <h2 className="text-2xl font-black font-serif text-slate-900">
                Welcome, {(justLoggedInUser || user)?.name}
              </h2>
              <p className="text-xs text-slate-500 font-serif">
                {(justLoggedInUser || user)?.email} •{" "}
                <span className="capitalize font-semibold text-[#002f6c]">
                  {(justLoggedInUser || user)?.role === "admin" ? "Web Administrator" : "Church Member"}
                </span>
              </p>

              {(justLoggedInUser || user)?.estate && (
                <div className="pt-2">
                  <span className="inline-block text-[11px] font-mono bg-blue-50 text-[#002f6c] border border-blue-200/60 px-3 py-1 rounded-lg">
                    📍 Assigned Cell: {(justLoggedInUser || user)?.estate}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#001737] hover:bg-[#002f6c] text-amber-300 font-black text-xs uppercase tracking-wider py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to {(justLoggedInUser || user)?.portalTitle}</span>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setJustLoggedInUser(null);
                  logout();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition cursor-pointer"
              >
                Sign Out / Switch Account
              </button>
            </div>
          </div>
        )}

        {/* 3. DEFAULT LOGIN FORM (ONLY IF NOT LOGGED IN & NOT VERIFYING) */}
        {!isVerifying && !justLoggedInUser && !user && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2.5 text-center">
                Select Sign In Role
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin("admin")}
                  className="py-3 px-4 rounded-xl border border-slate-200 hover:border-[#002f6c] hover:bg-blue-50/50 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#002f6c]">⚙️ Administrator</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin("member")}
                  className="py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-800">👤 Church Member</span>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Or Sign In with Email
              </span>
            </div>

            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@jerichosda.church"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#001737] hover:bg-[#00224f] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <div className="bg-gradient-to-br from-amber-50 to-blue-50/60 rounded-2xl p-4 border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🤝</span>
                  <span className="text-[11px] font-mono uppercase font-black tracking-wider text-[#002f6c]">
                    New to Jericho SDA?
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-serif leading-relaxed">
                  Join our spiritual family! Connect with an estate prayer cell or request assistance with baptism or membership letter transfers.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                  <Link
                    href="/care"
                    className="w-full sm:w-auto flex-1 text-center bg-amber-400 hover:bg-amber-300 text-[#001737] font-black text-[11px] uppercase tracking-wider py-2 px-3 rounded-xl transition shadow-sm"
                  >
                    Request Baptism / Care
                  </Link>

                  <Link
                    href="/estates"
                    className="w-full sm:w-auto flex-1 text-center bg-white hover:bg-slate-50 border border-slate-200 text-[#002f6c] font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-xl transition"
                  >
                    Find Prayer Cell →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-[#001737] transition"
          >
            ← Return to Sanctuary Home as Guest
          </Link>
        </div>
      </div>
    </main>
  );
}