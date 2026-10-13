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
    deskSchedule: "Tuesdays & Thursdays (By Appointment)",
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
    deskSchedule: "Wednesdays (Prior to Prayer Meeting)",
    focus: "Hospital Ministry, Home Communion & Bereavement",
  },
  {
    role: "Dorcas & Community Welfare",
    inCharge: "Head Deaconess & Welfare Committee",
    deskSchedule: "Sundays & Midweek by Referral",
    focus: "Community Welfare, Elderly Support & Emergency Aid",
  },
];

export default function PastoralCarePage() {
  const [requestType, setRequestType] = useState<
    "Intercessory Prayer" | "Pastoral Visitation" | "Counseling" | "Baby Dedication" | "Baptism"
  >("Intercessory Prayer");

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    estateLocation: "",
    confidentiality: "pastoral-only",
    preferredDate: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Official church correspondence inbox
  const activeChurchInbox = "jericho.sda@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      alert("Please provide your name and phone number so the pastoral team can reach you.");
      return;
    }

    const emailSubject = encodeURIComponent(
      `[Pastoral Care Request] ${requestType} - ${formData.fullName}`
    );
    const emailBody = encodeURIComponent(
      `JERICHO SDA CHURCH - PASTORAL CARE REQUEST\n\n` +
      `Category: ${requestType}\n` +
      `Full Name: ${formData.fullName}\n` +
      `Phone Number: ${formData.phoneNumber}\n` +
      `Residential Estate / Location: ${formData.estateLocation || "Not specified"}\n` +
      `Confidentiality: ${formData.confidentiality === "pastoral-only" ? "Pastoral Team & Head Elder Only" : "Share with Church Prayer Band"}\n` +
      `Preferred Day / Date: ${formData.preferredDate || "Earliest Available"}\n\n` +
      `Details / Prayer Need:\n${formData.notes || "None provided"}\n\n` +
      `Submitted via Jericho SDA Church Portal`
    );

    window.location.href = `mailto:${activeChurchInbox}?subject=${emailSubject}&body=${emailBody}`;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(activeChurchInbox);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Pastoral Secretariat &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Pastoral Care &amp; Prayer
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; James 5:14
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
                Confidential Request
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-[#001f44] mt-0.5">
                Submit a Ministry Request
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-serif mt-1">
                Your request is handled confidentially by the pastoral team and assigned elders.
              </p>
            </div>

            {submitted ? (
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-serif font-semibold text-stone-900">
                    Email Prepared
                  </h3>
                  <p className="text-xs text-stone-600 font-serif mt-1 max-w-md mx-auto leading-relaxed">
                    Your request has been composed for the pastoral secretariat. If your email app did not open automatically, you can copy our address below.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium px-4 py-2 rounded transition cursor-pointer"
                  >
                    {copiedEmail ? "Copied! ✓" : `Copy ${activeChurchInbox}`}
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
                    className="text-stone-600 hover:text-stone-900 border border-stone-300 text-xs font-medium px-3.5 py-2 rounded transition"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 block">
                    Type of Request
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Intercessory Prayer",
                      "Pastoral Visitation",
                      "Counseling",
                      "Baby Dedication",
                      "Baptism",
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setRequestType(t as any)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                          requestType === t
                            ? "bg-[#001f44] text-white"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 block">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mercy Adhiambo"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 block">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0712 345 678"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>
                </div>

                {/* Location & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 block">
                      Estate / Hospital Ward
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Buruburu Phase 2"
                      value={formData.estateLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, estateLocation: e.target.value })
                      }
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 block">
                      Preferred Day or Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sabbath afternoon"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>
                </div>

                {/* Confidentiality Option */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-medium text-stone-700 block">
                    Privacy Preference
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-start gap-2 p-2.5 rounded-lg border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100/70">
                      <input
                        type="radio"
                        name="confidentiality"
                        className="mt-0.5"
                        checked={formData.confidentiality === "pastoral-only"}
                        onChange={() =>
                          setFormData({ ...formData, confidentiality: "pastoral-only" })
                        }
                      />
                      <div>
                        <strong className="block text-stone-900">Strictly Confidential</strong>
                        <span className="text-[11px] text-stone-500">Only District Pastor &amp; Head Elder</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 p-2.5 rounded-lg border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100/70">
                      <input
                        type="radio"
                        name="confidentiality"
                        className="mt-0.5"
                        checked={formData.confidentiality === "prayer-circle"}
                        onChange={() =>
                          setFormData({ ...formData, confidentiality: "prayer-circle" })
                        }
                      />
                      <div>
                        <strong className="block text-stone-900">Prayer Band</strong>
                        <span className="text-[11px] text-stone-500">Include in church prayer lists</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 block">
                    Request Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your request..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#001f44] hover:bg-[#001530] text-white font-medium py-2.5 rounded-lg text-xs transition cursor-pointer"
                >
                  Send Request to Pastoral Desk &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Hours & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 block">
                Direct Contact
              </span>
              <h3 className="text-base font-serif text-[#001f44]">
                Pastoral Vestry &amp; Secretariat
              </h3>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                For hospital visits or emergency pastoral needs, you can connect directly with the church secretariat:
              </p>
              <div className="text-xs space-y-1.5 pt-1 text-stone-700 font-sans">
                <div>
                  Email:{" "}
                  <a
                    href={`mailto:${activeChurchInbox}`}
                    className="font-mono text-[#001f44] font-semibold underline hover:text-amber-800"
                  >
                    {activeChurchInbox}
                  </a>
                </div>
                <div>Location: <strong>Sanctuary Office, Jericho Estate</strong></div>
              </div>
            </div>

            {/* Official Consultation Schedule */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-3">
              <div>
                <h3 className="text-sm font-serif text-[#001f44]">
                  Consultation Schedule
                </h3>
                <p className="text-xs text-stone-500 font-serif mt-0.5">
                  Sanctuary vestry consultation hours:
                </p>
              </div>

              <div className="divide-y divide-stone-100 space-y-2.5 text-xs">
                {pastoralRoster.map((item, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0 space-y-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 block">
                      {item.role}
                    </span>
                    <h4 className="font-medium text-stone-900 font-serif">
                      {item.inCharge}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-serif">
                      {item.focus}
                    </p>
                    <span className="text-[11px] text-[#001f44] font-medium block pt-0.5">
                      {item.deskSchedule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer Cells Link */}
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-1.5">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Estate Prayer Cells
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                Connect with neighborhood elders and fellow church members across Nairobi Eastlands.
              </p>
              <div className="pt-1">
                <Link
                  href="/estates"
                  className="text-xs font-medium text-[#001f44] hover:underline"
                >
                  View Estate Cell Directory &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}