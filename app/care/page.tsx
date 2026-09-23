"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";

interface PastoralDutyRoster {
  role: string;
  inCharge: string;
  deskSchedule: string;
  focus: string;
}

const pastoralRoster: PastoralDutyRoster[] = [
  {
    role: "District Pastor",
    inCharge: "Pr. Peter Nyabuto",
    deskSchedule: "Tuesdays & Thursdays (By Church Office Appointment)",
    focus: "Spiritual Direction, Pre-Marital & Family Counseling",
  },
  {
    role: "Head Elder",
    inCharge: "Eld. Nathan Khamala",
    deskSchedule: "Sabbaths (Pastoral Vestry after Divine Service)",
    focus: "General Church Oversight & Member Guidance",
  },
  {
    role: "Pastoral Visitation Elder",
    inCharge: "Eld. Charles Omollo",
    deskSchedule: "Wednesdays (Prior to Midweek Prayer Meeting)",
    focus: "Hospital Ministry, Home Communion & Bereavement",
  },
  {
    role: "Dorcas Benevolence / Welfare",
    inCharge: "Head Deaconess & Welfare Committee",
    deskSchedule: "Sundays & Midweek by Referral",
    focus: "Community Welfare, Elderly Support & Material Aid",
  },
];

export default function PastoralCarePage() {
  const [requestType, setRequestType] = useState<
    "Prayer" | "Visitation" | "Counseling" | "Dedication" | "Baptism"
  >("Prayer");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    estateLocation: "",
    confidentiality: "pastoral-only", // "pastoral-only" | "prayer-circle"
    preferredDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const churchCareEmail = "care@jerichosda.church";
  const churchEmergencyPhone = "+254 700 000 100";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      alert("Please provide your name and phone number so the pastoral secretariat can reach you.");
      return;
    }

    const emailSubject = encodeURIComponent(`[Pastoral Desk] ${requestType} Request - ${formData.fullName}`);
    const emailBody = encodeURIComponent(
      `JERICHO SDA CHURCH - PASTORAL CARE DESK REQUEST\n\n` +
      `Category: ${requestType}\n` +
      `Applicant Name: ${formData.fullName}\n` +
      `Contact Phone: ${formData.phoneNumber}\n` +
      `Estate / Location: ${formData.estateLocation || "Not specified"}\n` +
      `Confidentiality: ${formData.confidentiality === "pastoral-only" ? "Pastoral & Head Elder Only" : "Share with Church Prayer Band"}\n` +
      `Preferred Day / Date: ${formData.preferredDate || "Earliest Available"}\n\n` +
      `Specific Request / Details:\n${formData.notes || "None provided"}\n\n` +
      `Submitted via Jericho SDA Church Web Portal`
    );

    window.location.href = `mailto:${churchCareEmail}?subject=${emailSubject}&body=${emailBody}`;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(churchCareEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. RICH NAVY PASTORAL HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Jericho SDA Sanctuary Pastoral Secretariat</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Pastoral Care &amp; Prayer Desk
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — James 5:14
            </span>
          </p>
        </div>
      </section>

      {/* 2. BODY CONTENT CARDS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Care Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08400] bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
                Confidential Submission
              </span>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Submit a Pastoral Request
              </h3>
              <p className="text-xs text-slate-500 font-serif mt-1">
                Submissions are sent directly to the secure pastoral inbox (<strong>{churchCareEmail}</strong>) and triaged strictly by the ordained leadership.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-900 font-serif">
                    Email Client Opened &amp; Ready
                  </h4>
                  <p className="text-xs text-emerald-700 font-serif mt-1 max-w-md mx-auto leading-relaxed">
                    Your request details have been prepared for <strong>{churchCareEmail}</strong>. If your email app did not open automatically, you can send your request directly to the church inbox.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="bg-[#002f6c] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow hover:bg-[#001f49] transition cursor-pointer"
                  >
                    {copiedEmail ? "Email Copied! ✓" : "Copy Church Email"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        phoneNumber: "",
                        estateLocation: "",
                        confidentiality: "pastoral-only",
                        preferredDate: "",
                        notes: "",
                      });
                    }}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Type Selection Tabs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Select Request Category:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "Prayer", label: "🙏 Intercessory Prayer" },
                      { key: "Visitation", label: "🏡 Home / Hospital Visit" },
                      { key: "Counseling", label: "💬 Pastoral Counseling" },
                      { key: "Dedication", label: "👶 Baby Dedication" },
                      { key: "Baptism", label: "🌊 Baptism Class" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setRequestType(t.key as any)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          requestType === t.key
                            ? "bg-[#002f6c] text-white shadow-md scale-105"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sister Mercy Adhiambo"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Phone Number (For Follow-Up) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                    />
                  </div>
                </div>

                {/* Location & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Residential Estate / Hospital Ward
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Buruburu Phase 2 / Mama Lucy Kibaki"
                      value={formData.estateLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, estateLocation: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Preferred Day / Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Upcoming Sabbath or Wednesday"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                    />
                  </div>
                </div>

                {/* Confidentiality Choice */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Privacy Preference:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                      <input
                        type="radio"
                        name="confidentiality"
                        checked={formData.confidentiality === "pastoral-only"}
                        onChange={() =>
                          setFormData({ ...formData, confidentiality: "pastoral-only" })
                        }
                      />
                      <div>
                        <strong className="block text-slate-800">Strictly Confidential</strong>
                        <span className="text-[11px] text-slate-500">Only District Pastor &amp; Head Elder</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                      <input
                        type="radio"
                        name="confidentiality"
                        checked={formData.confidentiality === "prayer-circle"}
                        onChange={() =>
                          setFormData({ ...formData, confidentiality: "prayer-circle" })
                        }
                      />
                      <div>
                        <strong className="block text-slate-800">Church Prayer Circle</strong>
                        <span className="text-[11px] text-slate-500">May be included in cell prayer lists</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Details / Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Specific Request or Circumstance
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide relevant details for the pastoral team..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c99700] hover:bg-[#b08400] text-[#001737] font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow active:scale-95 cursor-pointer"
                >
                  Send to Pastoral Secretariat ({churchCareEmail}) →
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Emergency Line & Official Vestry Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dedicated Emergency Crisis Hotline */}
            <div className="bg-[#001737] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10 space-y-4">
              <span className="bg-rose-500 text-white font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                Acute Emergency Only
              </span>
              <h3 className="text-xl font-bold font-serif">
                Bereavement &amp; Critical Emergency
              </h3>
              <p className="text-xs text-blue-100 font-serif leading-relaxed">
                For urgent notification of death, critical intensive care admission, or acute crisis, call the dedicated Church Emergency Desk line:
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${churchEmergencyPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition shadow active:scale-95"
                >
                  <span>🚨 Emergency Desk</span>
                  <span className="font-mono text-[11px]">({churchEmergencyPhone})</span>
                </a>
              </div>
              <p className="text-[10px] text-blue-200/70 font-mono">
                *Routine requests should be sent via the email form above to preserve this line for acute crises.
              </p>
            </div>

            {/* Official Office Hours & Vestry Roster */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
              <div>
                <h4 className="text-sm font-bold font-serif text-[#002f6c] uppercase tracking-wider">
                  Pastoral Office &amp; Vestry Hours
                </h4>
                <p className="text-xs text-slate-500 font-serif mt-0.5">
                  Meet church leaders in person at the sanctuary offices during designated consultation hours.
                </p>
              </div>

              <div className="divide-y divide-slate-100 space-y-3">
                {pastoralRoster.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b08400] block">
                      {item.role}
                    </span>
                    <h5 className="text-sm font-bold text-slate-800 font-serif">
                      {item.inCharge}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-serif">
                      {item.focus}
                    </p>
                    <span className="text-[10px] font-mono text-[#002f6c] font-semibold block bg-blue-50/80 p-2 rounded-lg border border-blue-100/60 mt-1">
                      📍 {item.deskSchedule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Church Prayer Cells Link */}
            <div className="bg-amber-50/90 rounded-3xl p-6 border border-amber-200/80 shadow-md space-y-2">
              <h4 className="text-sm font-bold font-serif text-[#002f6c]">
                Local Neighborhood Prayer Cells
              </h4>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Connect with elders and neighbors directly in your residential estate for weekly fellowship and ongoing member care.
              </p>
              <div className="pt-2">
                <Link
                  href="/estates"
                  className="text-xs font-bold text-[#002f6c] hover:underline"
                >
                  Find Your Estate Prayer Cell →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}