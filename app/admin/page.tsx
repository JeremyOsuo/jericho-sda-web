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

  // Default secretariat PIN
  const SECRET_PIN = "752922";

  const siteSettings = useSiteSettings();

  const [bulletinState, setBulletinState] = useState<WeeklyBulletinData>(weeklyBulletin);
  const [urgentActive, setUrgentActive] = useState<boolean>(siteSettings?.urgentBannerActive ?? false);
  const [urgentText, setUrgentText] = useState<string>(
    siteSettings?.urgentBannerText ?? "Camp Meeting registration is ongoing. Check Camp tab for details."
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"liturgy" | "officers" | "notices" | "banner" | "print">("liturgy");

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
      <main className="min-h-screen bg-[#fcfbf9] flex items-center justify-center p-6 text-stone-900">
        <div className="bg-white border border-stone-200 rounded-xl p-8 max-w-sm w-full shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 rounded-lg bg-amber-400 mx-auto flex items-center justify-center shadow-xs">
            <AdventistLogo className="w-6 h-6 text-[#001f44]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800 block">
              Jericho SDA Church
            </span>
            <h1 className="text-xl font-serif text-[#001f44]">
              Secretariat Desk
            </h1>
            <p className="text-xs text-stone-500 font-serif">
              Enter secretariat PIN to manage divine service liturgy and notices.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                placeholder="Enter PIN"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError("");
                }}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-center text-lg font-mono tracking-widest text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-serif mt-2">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#001f44] hover:bg-[#001530] text-white font-medium py-2.5 rounded-lg text-xs transition cursor-pointer"
            >
              Unlock Dashboard &rarr;
            </button>
          </form>

          <div className="pt-1">
            <Link href="/" className="text-xs text-stone-500 hover:text-stone-900 font-serif">
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. UNLOCKED SECRETARIAT WORKSPACE
  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* Top Admin Header */}
      <section className="bg-[#001f44] text-white pt-32 pb-16 px-6 border-b border-stone-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
              <span>Session Active</span>
              <span>&bull;</span>
              <span>Church Secretariat</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-stone-50">
              Worship &amp; Bulletin Control
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-serif">
              Publish divine service liturgies, assign duty officers, and configure alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAll}
              className="bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold px-4 py-2 rounded-lg text-xs transition cursor-pointer shadow-xs"
            >
              {savedSuccess ? "Saved Successfully! ✓" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("jericho_admin_auth");
                setIsAuthenticated(false);
              }}
              className="bg-white/10 hover:bg-white/15 text-stone-100 border border-white/20 px-3.5 py-2 rounded-lg text-xs transition cursor-pointer"
            >
              Lock Desk
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Workspace */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center sm:justify-start">
          <div className="inline-flex p-1 bg-stone-200/60 rounded-lg border border-stone-200 gap-1 flex-wrap">
            {[
              { id: "liturgy", label: "Divine Liturgy" },
              { id: "officers", label: "Duty Officers" },
              { id: "notices", label: "Department Notices" },
              { id: "banner", label: "Urgent Banner" },
              { id: "print", label: "Printable Insert" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                  activeTab === t.id
                    ? "bg-[#001f44] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: WORSHIP & LITURGY */}
        {activeTab === "liturgy" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-serif text-[#001f44]">
                Upcoming Sabbath Worship Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Sabbath Date</label>
                <input
                  type="text"
                  value={bulletinState.sabbathDate}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathDate: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Friday Sunset</label>
                <input
                  type="text"
                  value={bulletinState.sunsetFriday}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sunsetFriday: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Sabbath Sunset</label>
                <input
                  type="text"
                  value={bulletinState.sunsetSabbath}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sunsetSabbath: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Sermon Title</label>
                <input
                  type="text"
                  value={bulletinState.divineSermonTitle}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divineSermonTitle: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-serif font-medium text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Speaker / Preacher</label>
                <input
                  type="text"
                  value={bulletinState.divinePreacher}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divinePreacher: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Scripture Reading</label>
                <input
                  type="text"
                  value={bulletinState.divineScripture}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, divineScripture: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Sabbath School Theme</label>
                <input
                  type="text"
                  value={bulletinState.sabbathSchoolTheme}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathSchoolTheme: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Memory Verse Text</label>
                <textarea
                  rows={2}
                  value={bulletinState.sabbathSchoolMemoryVerse}
                  onChange={(e) =>
                    setBulletinState({ ...bulletinState, sabbathSchoolMemoryVerse: e.target.value })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-serif text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DUTY OFFICERS */}
        {activeTab === "officers" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-serif text-[#001f44]">
                Serving Officers Allocation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Duty Elder (Platform)</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.dutyElder}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, dutyElder: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Associate Duty Elder</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.associateElder}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, associateElder: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Head Deacon on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.headDeacon}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, headDeacon: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Head Deaconess on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.headDeaconess}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, headDeaconess: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Chorister on Duty</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.chorister}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, chorister: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Pianist / Accompanist</label>
                <input
                  type="text"
                  value={bulletinState.dutyOfficers.pianist}
                  onChange={(e) =>
                    setBulletinState({
                      ...bulletinState,
                      dutyOfficers: { ...bulletinState.dutyOfficers, pianist: e.target.value },
                    })
                  }
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEPARTMENT NOTICES */}
        {activeTab === "notices" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-serif text-[#001f44]">
                Department Notices Management
              </h2>
            </div>

            <div className="space-y-3">
              {bulletinState.departmentNotices.map((n: DepartmentNotice, idx) => (
                <div
                  key={n.id}
                  className="p-4 border border-stone-200 rounded-lg bg-stone-50/60 space-y-2.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-semibold text-stone-600 block">Department</label>
                      <input
                        type="text"
                        value={n.department}
                        onChange={(e) => {
                          const updated = [...bulletinState.departmentNotices];
                          updated[idx].department = e.target.value;
                          setBulletinState({ ...bulletinState, departmentNotices: updated });
                        }}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-semibold text-stone-600 block">Notice Title</label>
                      <input
                        type="text"
                        value={n.title}
                        onChange={(e) => {
                          const updated = [...bulletinState.departmentNotices];
                          updated[idx].title = e.target.value;
                          setBulletinState({ ...bulletinState, departmentNotices: updated });
                        }}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-serif font-medium text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-stone-600 block">Content</label>
                    <textarea
                      rows={2}
                      value={n.content}
                      onChange={(e) => {
                        const updated = [...bulletinState.departmentNotices];
                        updated[idx].content = e.target.value;
                        setBulletinState({ ...bulletinState, departmentNotices: updated });
                      }}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs font-serif text-stone-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: URGENT BANNER */}
        {activeTab === "banner" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-xl font-serif text-[#001f44]">
                Website Urgent Notice Bar
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Display an emergency alert strip across the top of all pages.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3.5 rounded-lg border border-stone-200 bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgentActive}
                  onChange={(e) => setUrgentActive(e.target.checked)}
                  className="w-4 h-4 text-[#001f44] rounded border-stone-300 focus:ring-amber-400"
                />
                <div>
                  <strong className="block text-stone-900 text-xs sm:text-sm">
                    Activate Top Urgent Alert Banner
                  </strong>
                  <span className="text-[11px] text-stone-500 font-serif">
                    When enabled, this notice is displayed immediately on public devices.
                  </span>
                </div>
              </label>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 block">Alert Message</label>
                <textarea
                  rows={3}
                  value={urgentText}
                  onChange={(e) => setUrgentText(e.target.value)}
                  placeholder="e.g. Midweek prayer meeting moved to Thursday at 6:00 PM."
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm font-serif text-stone-900 focus:outline-none focus:border-[#001f44]"
                />
              </div>

              {urgentActive && (
                <div className="bg-amber-400 text-[#001f44] p-3 rounded-lg text-xs font-medium flex items-center gap-2 border border-amber-500">
                  <span className="bg-[#001f44] text-white px-1.5 py-0.5 rounded text-[10px] font-sans font-semibold uppercase">
                    Preview
                  </span>
                  <span>{urgentText}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: PRINTABLE INSERT */}
        {activeTab === "print" && (
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-xl font-serif text-[#001f44]">
                  Printable Order of Service
                </h2>
                <p className="text-xs text-stone-500 font-serif mt-0.5">
                  Formatted for physical printing and weekly bulletin inserts.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#001f44] text-white font-medium px-4 py-2 rounded-lg text-xs hover:bg-[#001530] transition cursor-pointer shrink-0"
              >
                Print / Save PDF (Ctrl + P)
              </button>
            </div>

            {/* Print Sheet Container */}
            <div className="border border-stone-300 p-8 rounded-lg bg-white space-y-5 text-stone-900 max-w-2xl mx-auto shadow-2xs print:border-none print:shadow-none print:p-0">
              <div className="text-center space-y-1 border-b pb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 block">
                  Seventh-day Adventist Church &bull; Central Kenya Conference (CKC)
                </span>
                <h3 className="text-xl font-serif font-bold text-[#001f44]">
                  JERICHO SDA CHURCH SANCTUARY
                </h3>
                <p className="text-xs font-serif text-stone-600">
                  Weekly Worship Bulletin &bull; {bulletinState.sabbathDate}
                </p>
                <div className="text-[10px] font-mono text-stone-500 pt-0.5 flex justify-center gap-4">
                  <span>Sunset Friday: {bulletinState.sunsetFriday}</span>
                  <span>&bull;</span>
                  <span>Sunset Sabbath: {bulletinState.sunsetSabbath}</span>
                </div>
              </div>

              {/* Preacher Banner */}
              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-center space-y-0.5">
                <span className="text-[10px] uppercase font-semibold text-amber-800 block">
                  Divine Service Sermon
                </span>
                <h4 className="text-base font-serif font-semibold text-[#001f44]">
                  &ldquo;{bulletinState.divineSermonTitle}&rdquo;
                </h4>
                <p className="text-xs font-serif text-stone-700">
                  Speaker: <strong>{bulletinState.divinePreacher}</strong> &bull; Scripture: <strong>{bulletinState.divineScripture}</strong>
                </p>
              </div>

              {/* Order of Divine Worship Table */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-sans border-b pb-1">
                  Order of Divine Worship
                </h5>
                <table className="w-full text-left text-xs font-serif border-collapse">
                  <tbody>
                    {bulletinState.orderOfDivineService.map((item, idx) => (
                      <tr key={idx} className="border-b border-stone-100">
                        <td className="py-1.5 font-medium text-[#001f44] w-36">
                          {item.part}
                        </td>
                        <td className="py-1.5 text-stone-600">
                          {item.detail}
                        </td>
                        <td className="py-1.5 text-right font-mono text-stone-700 text-[11px]">
                          {item.hymnOrScripture || item.facilitator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Duty Roster */}
              <div className="pt-2 border-t text-[11px] font-serif grid grid-cols-2 gap-2 text-stone-700">
                <div>Duty Elder: <strong>{bulletinState.dutyOfficers.dutyElder}</strong></div>
                <div>Head Deacon: <strong>{bulletinState.dutyOfficers.headDeacon}</strong></div>
                <div>Associate Elder: <strong>{bulletinState.dutyOfficers.associateElder}</strong></div>
                <div>Head Deaconess: <strong>{bulletinState.dutyOfficers.headDeaconess}</strong></div>
                <div>Chorister: <strong>{bulletinState.dutyOfficers.chorister}</strong></div>
                <div>Pianist: <strong>{bulletinState.dutyOfficers.pianist}</strong></div>
              </div>

              {/* Giving reminder */}
              <div className="text-center text-[10px] font-mono text-stone-500 pt-2 border-t">
                Faithful Stewardship: M-PESA Paybill <strong>752922</strong> &bull; Account: <strong>Tithe / Offering</strong>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}