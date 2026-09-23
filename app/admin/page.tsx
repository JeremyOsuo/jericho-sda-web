"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import { weeklyBulletin, type WeeklyBulletinData, type DepartmentNotice } from "@/data/announcements";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function AdminDeskPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Default secretariat PIN (can be adjusted or hooked to an environment variable)
  const SECRET_PIN = "752922";

  // Connect to SiteSettingsContext if setUrgentBanner is available, otherwise manage locally
  const siteSettings = useSiteSettings();

  // Working state initialized with default weekly bulletin data
  const [bulletinState, setBulletinState] = useState<WeeklyBulletinData>(weeklyBulletin);
  const [urgentActive, setUrgentActive] = useState<boolean>(siteSettings?.urgentBannerActive ?? false);
  const [urgentText, setUrgentText] = useState<string>(siteSettings?.urgentBannerText ?? "Camp Meeting registration is ongoing. Check Camp tab for details.");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"liturgy" | "officers" | "notices" | "banner" | "print">("liturgy");

  // Check sessionStorage on initial load to avoid typing PIN on every refresh
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("jericho_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
    const savedLocalBulletin = localStorage.getItem("jericho_weekly_bulletin");
    if (savedLocalBulletin) {
      try {
        setBulletinState(JSON.parse(savedLocalBulletin));
      } catch (e) {
        console.error("Failed to parse saved bulletin", e);
      }
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === SECRET_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("jericho_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid Secretariat PIN. Please verify with Church Clerk.");
    }
  };

  const handleSaveAll = () => {
    localStorage.setItem("jericho_weekly_bulletin", JSON.stringify(bulletinState));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // 1. PIN LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="bg-[#001737] border border-amber-400/30 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 mx-auto flex items-center justify-center shadow-lg">
            <AdventistLogo className="w-9 h-9 text-[#001737]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
              Jericho SDA Church
            </span>
            <h1 className="text-2xl font-bold font-serif text-white">
              Secretariat Admin Desk
            </h1>
            <p className="text-xs text-blue-200 font-serif">
              Enter authorized PIN to manage bulletin liturgy, officers, and emergency notices.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                placeholder="Enter PIN (Default: 752922)"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError("");
                }}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-amber-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-mono mt-2">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black py-3 rounded-xl text-xs uppercase tracking-wider transition shadow active:scale-95 cursor-pointer"
            >
              Unlock Dashboard →
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. UNLOCKED ADMIN CONTROL DESK
  return (
    <main className="min-h-screen bg-slate-100 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* Top Admin Header */}
      <section className="bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-32 pb-16 px-4 sm:px-6 border-b border-amber-400/20 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono uppercase px-3 py-1 rounded-full font-bold">
              <span>● Session Active</span>
              <span>•</span>
              <span>Church Secretariat Desk</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
              Worship &amp; Bulletin Control
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 font-serif">
              Publish divine service liturgies, assign duty officers, and control the top notice ticker.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveAll}
              className="bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow transition cursor-pointer active:scale-95"
            >
              {savedSuccess ? "Saved Successfully! ✓" : "Save Changes 💾"}
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("jericho_admin_auth");
                setIsAuthenticated(false);
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Lock Desk 🔒
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Workspace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center sm:justify-start">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-md gap-1 flex-wrap">
            {[
              { id: "liturgy", label: "📖 Divine Liturgy" },
              { id: "officers", label: "👥 Duty Officers" },
              { id: "notices", label: "📢 Department Notices" },
              { id: "banner", label: "⚠️ Urgent Banner" },
              { id: "print", label: "🖨️ Printable Insert" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeTab === t.id
                    ? "bg-[#002f6c] text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: WORSHIP & LITURGY SETTINGS */}
        {activeTab === "liturgy" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Divine Hour Info
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Upcoming Sabbath Worship Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Sabbath Date Label
                </label>
                <input
                  type="text"
                  value={bulletinState.sabbathDate}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathDate: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Friday Sunset (Sunset Begins)
                </label>
                <input
                  type="text"
                  value={bulletinState.sunsetFriday}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sunsetFriday: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Sabbath Sunset (Sabbath Closes)
                </label>
                <input
                  type="text"
                  value={bulletinState.sunsetSabbath}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sunsetSabbath: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Divine Service Sermon Title
                </label>
                <input
                  type="text"
                  value={bulletinState.divineSermonTitle}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divineSermonTitle: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Speaker / Preacher
                </label>
                <input
                  type="text"
                  value={bulletinState.divinePreacher}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divinePreacher: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Scripture Reading Text
                </label>
                <input
                  type="text"
                  value={bulletinState.divineScripture}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divineScripture: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Sabbath School Theme
                </label>
                <input
                  type="text"
                  value={bulletinState.sabbathSchoolTheme}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathSchoolTheme: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Sabbath School Memory Verse Text &amp; Reference
                </label>
                <textarea
                  rows={2}
                  value={bulletinState.sabbathSchoolMemoryVerse}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathSchoolMemoryVerse: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DUTY OFFICERS ROSTER */}
        {activeTab === "officers" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Roster Allocation
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Serving Officers on Sabbath
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Duty Elder (Platform)</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.dutyElder}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, dutyElder: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Associate Duty Elder</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.associateElder}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, associateElder: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Head Deacon on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.headDeacon}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, headDeacon: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Head Deaconess on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.headDeaconess}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, headDeaconess: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Chorister on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.chorister}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, chorister: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Pianist / Accompanist</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.pianist}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, pianist: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEPARTMENT NOTICES */}
        {activeTab === "notices" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                Weekly Announcements
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Department Notices Management
              </h3>
            </div>

            <div className="space-y-4">
              {bulletinState.departmentNotices.map((n: DepartmentNotice, idx) => (
                <div
                  key={n.id}
                  className="p-5 border border-slate-200 rounded-2xl bg-slate-50 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase">
                        Department
                      </label>
                      <input
                        type="text"
                        value={n.department}
                        onChange={(e) => {
                          const updated = [...bulletinState.departmentNotices];
                          updated[idx].department = e.target.value;
                          setBulletinState({ ...bulletinState, departmentNotices: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 block uppercase">
                        Notice Title
                      </label>
                      <input
                        type="text"
                        value={n.title}
                        onChange={(e) => {
                          const updated = [...bulletinState.departmentNotices];
                          updated[idx].title = e.target.value;
                          setBulletinState({ ...bulletinState, departmentNotices: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-serif font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block uppercase">
                      Content / Announcement Text
                    </label>
                    <textarea
                      rows={2}
                      value={n.content}
                      onChange={(e) => {
                        const updated = [...bulletinState.departmentNotices];
                        updated[idx].content = e.target.value;
                        setBulletinState({ ...bulletinState, departmentNotices: updated });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-serif text-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: URGENT BANNER CONTROLS */}
        {activeTab === "banner" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full inline-block mb-1">
                Emergency Alert
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Website Top Notice Ticker
              </h3>
              <p className="text-xs text-slate-500 font-serif mt-1">
                Activate to display an urgent yellow alert strip across the very top of all website pages.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgentActive}
                  onChange={(e) => setUrgentActive(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                />
                <div>
                  <strong className="block text-slate-800 text-sm">
                    Activate Top Urgent Notice Bar
                  </strong>
                  <span className="text-xs text-slate-500 font-serif">
                    When checked, this alert appears immediately across every device.
                  </span>
                </div>
              </label>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Ticker Message
                </label>
                <textarea
                  rows={3}
                  value={urgentText}
                  onChange={(e) => setUrgentText(e.target.value)}
                  placeholder="e.g. Midweek prayer meeting postponed to Thursday at 6:00 PM due to weather."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-serif text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>

              {urgentActive && (
                <div className="bg-amber-400 text-[#001737] p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-amber-500 shadow-sm">
                  <span className="bg-[#001737] text-white px-2 py-0.5 rounded text-[10px] font-mono uppercase">
                    Preview
                  </span>
                  <span>{urgentText}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: PRINTABLE INSERT (PRINT-OPTIMIZED) */}
        {activeTab === "print" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-1">
                  Sanctuary Physical Print
                </span>
                <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                  Printable Sabbath Order of Service Insert
                </h3>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#002f6c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow hover:bg-[#001f49] transition cursor-pointer shrink-0"
              >
                Print / Save PDF (Ctrl + P) 🖨️
              </button>
            </div>

            {/* Print Sheet Container */}
            <div className="border border-slate-300 p-8 rounded-2xl bg-white space-y-6 text-slate-900 max-w-2xl mx-auto shadow-sm print:border-none print:shadow-none print:p-0">
              <div className="text-center space-y-1 border-b pb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block">
                  Seventh-day Adventist Church • East Kenya Union Conference
                </span>
                <h2 className="text-2xl font-black font-serif tracking-tight text-[#001737]">
                  JERICHO SDA CHURCH SANCTUARY
                </h2>
                <p className="text-xs font-serif font-bold text-slate-600">
                  Weekly Worship Bulletin • {bulletinState.sabbathDate}
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1 flex justify-center gap-4">
                  <span>Sunset Friday: {bulletinState.sunsetFriday}</span>
                  <span>•</span>
                  <span>Sunset Sabbath: {bulletinState.sunsetSabbath}</span>
                </div>
              </div>

              {/* Preacher Banner */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-[9px] font-mono uppercase font-bold text-[#b08400] block">
                  Divine Service Sermon
                </span>
                <h4 className="text-lg font-bold font-serif text-[#002f6c]">
                  &ldquo;{bulletinState.divineSermonTitle}&rdquo;
                </h4>
                <p className="text-xs font-serif text-slate-700">
                  Speaker: <strong>{bulletinState.divinePreacher}</strong> | Scripture: <strong>{bulletinState.divineScripture}</strong>
                </p>
              </div>

              {/* Order of Divine Worship Table */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono border-b pb-1">
                  Order of Divine Worship
                </h5>
                <table className="w-full text-left text-xs font-serif border-collapse">
                  <tbody>
                    {bulletinState.orderOfDivineService.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-1.5 font-bold text-[#002f6c] w-36">
                          {item.part}
                        </td>
                        <td className="py-1.5 text-slate-600">
                          {item.detail}
                        </td>
                        <td className="py-1.5 text-right font-mono font-bold text-slate-700">
                          {item.hymnOrScripture || item.facilitator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Duty Roster */}
              <div className="pt-2 border-t text-[11px] font-serif grid grid-cols-2 gap-2 text-slate-700">
                <div>Duty Elder: <strong>{bulletinState.dutyOfficers.dutyElder}</strong></div>
                <div>Head Deacon: <strong>{bulletinState.dutyOfficers.headDeacon}</strong></div>
                <div>Associate Elder: <strong>{bulletinState.dutyOfficers.associateElder}</strong></div>
                <div>Head Deaconess: <strong>{bulletinState.dutyOfficers.headDeaconess}</strong></div>
                <div>Chorister: <strong>{bulletinState.dutyOfficers.chorister}</strong></div>
                <div>Pianist: <strong>{bulletinState.dutyOfficers.pianist}</strong></div>
              </div>

              {/* Giving reminder */}
              <div className="text-center text-[10px] font-mono text-slate-500 pt-2 border-t">
                Faithful Stewardship: M-PESA Paybill <strong>752922</strong> • Account: <strong>Tithe / Offering</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}