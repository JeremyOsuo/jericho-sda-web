"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  MessageCircle,
} from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Official church correspondence credentials
  const activeChurchInbox = "jericho.sda@gmail.com";
  const pastoralDeskPhone = "254700000000"; // Replace with Church Clerk / Pastor WhatsApp

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage(
        "Please provide both your full name and phone number so the pastoral secretariat can reach you promptly."
      );
      setIsErrorModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      const emailSubject = encodeURIComponent(
        `[Pastoral Care Request] ${requestType} - ${formData.fullName.trim()}`
      );
      const emailBody = encodeURIComponent(
        `JERICHO SDA CHURCH - PASTORAL CARE REQUEST\n\n` +
          `Category: ${requestType}\n` +
          `Full Name: ${formData.fullName.trim()}\n` +
          `Phone Number: ${formData.phoneNumber.trim()}\n` +
          `Residential Estate / Location: ${formData.estateLocation.trim() || "Not specified"}\n` +
          `Confidentiality: ${
            formData.confidentiality === "pastoral-only"
              ? "Pastoral Team & Head Elder Only"
              : "Share with Church Prayer Band"
          }\n` +
          `Preferred Day / Date: ${formData.preferredDate.trim() || "Earliest Available"}\n\n` +
          `Details / Prayer Need:\n${formData.notes.trim() || "None provided"}\n\n` +
          `Submitted via Jericho SDA Church Portal`
      );

      setTimeout(() => {
        window.location.href = `mailto:${activeChurchInbox}?subject=${emailSubject}&body=${emailBody}`;
        setIsLoading(false);
        setSubmitted(true);
      }, 500);
    } catch {
      setIsLoading(false);
      setErrorMessage(
        "Could not automatically open your email application. You can copy the pastoral desk email directly or reach out via WhatsApp below."
      );
      setIsErrorModalOpen(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(activeChurchInbox);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getWhatsAppCareUrl = () => {
    const text = `*Jericho SDA Pastoral Care Request*%0A%0A*Category:* ${requestType}%0A*Name:* ${
      formData.fullName || "Member"
    }%0A*Phone:* ${formData.phoneNumber || "Not provided"}%0A*Estate:* ${
      formData.estateLocation || "Eastlands"
    }%0A*Notes:* ${formData.notes || "Pastoral guidance requested"}`;
    return `https://wa.me/${pastoralDeskPhone}?text=${text}`;
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 font-sans pb-32"
    >
      {/* 1. HERO */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <img
            src="/choir-hero.jpg"
            alt="Jericho SDA Sanctuary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001f44] via-[#001f44]/80 to-[#001f44]" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">
              Pastoral Secretariat &bull; Jericho SDA Church
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Pastoral Care &amp; Prayer
          </h1>

          <blockquote className="text-blue-100 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord.&rdquo;
            <cite className="block not-italic text-xs font-sans font-semibold text-amber-300 mt-1.5">
              &mdash; James 5:14
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 space-y-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200/70 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 inline-block mb-1.5">
                Confidential Request
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-blue-950 font-normal">
                Submit a Ministry Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your request is handled in strict confidence by the pastoral team and assigned elders.
              </p>
            </div>

            {submitted ? (
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Email Prepared
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                    Your request has been composed for the pastoral secretariat. If your email application did not launch automatically, you can copy our address or message the secretariat directly.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedEmail ? "Copied! ✓" : `Copy ${activeChurchInbox}`}</span>
                  </button>

                  <a
                    href={getWhatsAppCareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Secretariat</span>
                  </a>

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
                    className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    New Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          requestType === t
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white/80 text-slate-600 hover:bg-white hover:text-blue-600 border border-blue-100"
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
                    <label className="text-xs font-semibold text-slate-700 block">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Location & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Estate / Hospital Ward
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Buruburu Phase 2"
                      value={formData.estateLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estateLocation: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Preferred Day or Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sabbath afternoon"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Confidentiality Option */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Privacy Preference
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer hover:bg-slate-100 transition">
                      <input
                        type="radio"
                        name="confidentiality"
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                        checked={formData.confidentiality === "pastoral-only"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            confidentiality: "pastoral-only",
                          })
                        }
                      />
                      <div>
                        <strong className="block text-slate-900 font-semibold">
                          Strictly Confidential
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          District Pastor &amp; Head Elder Only
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer hover:bg-slate-100 transition">
                      <input
                        type="radio"
                        name="confidentiality"
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                        checked={formData.confidentiality === "prayer-circle"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            confidentiality: "prayer-circle",
                          })
                        }
                      />
                      <div>
                        <strong className="block text-slate-900 font-semibold">
                          Prayer Band
                        </strong>
                        <span className="text-[11px] text-slate-500">
                          Include in church prayer lists
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Request Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your prayer or pastoral request..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white resize-y"
                  />
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request to Pastoral Desk</span>
                  </button>

                  <div className="text-center">
                    <span className="text-[11px] text-slate-500">
                      Emergency hospital or bereavement need?{" "}
                      <a
                        href={getWhatsAppCareUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Chat via WhatsApp</span>
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Hours & Contacts */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Contact Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-blue-200/70 shadow-xs space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 inline-block">
                Direct Contact
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Pastoral Vestry &amp; Secretariat
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For hospital visits or emergency pastoral needs, connect directly with the church secretariat:
              </p>
              <div className="text-xs space-y-2 pt-1 text-slate-700 font-sans">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>
                    Email:{" "}
                    <a
                      href={`mailto:${activeChurchInbox}`}
                      className="font-mono text-blue-700 font-semibold underline hover:text-blue-900"
                    >
                      {activeChurchInbox}
                    </a>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Location: <strong>Sanctuary Office, Jericho Estate</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Official Consultation Schedule */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-blue-200/70 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Consultation Schedule
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sanctuary vestry consultation hours:
                </p>
              </div>

              <div className="divide-y divide-slate-100 space-y-3 text-xs">
                {pastoralRoster.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      {item.role}
                    </span>
                    <h4 className="font-bold text-slate-900">
                      {item.inCharge}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.focus}
                    </p>
                    <span className="text-[11px] text-blue-800 font-semibold block pt-0.5">
                      {item.deskSchedule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer Cells Link */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 border border-blue-100 shadow-xs space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800">
                Estate Prayer Cells
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with neighborhood elders and fellow church members across Nairobi Eastlands.
              </p>
              <div className="pt-1">
                <Link
                  href="/estates"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                >
                  <span>View Estate Cell Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Modal Overlay */}
      <LoadingModal
        isOpen={isLoading}
        title="Preparing Pastoral Request…"
        subtitle="Formatting your ministry request for the pastoral secretariat."
      />

      {/* Reusable Human Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Ministry Request Notice"
        message={errorMessage}
        supportPhone={pastoralDeskPhone}
      />
    </main>
  );
}