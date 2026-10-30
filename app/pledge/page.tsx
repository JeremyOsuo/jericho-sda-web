"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function PledgePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    frequency: "Monthly",
    amount: "",
    cause: "Local Church Budget",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [copiedPaybill, setCopiedPaybill] = useState(false);

  // Modal States
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Church M-Pesa credentials
  const CHURCH_PAYBILL = "247247"; // Replace with Jericho SDA Paybill if different
  const TREASURY_PHONE = "254700000000"; // Replace with Treasury / Church Clerk WhatsApp

  const handleCopyPaybill = () => {
    navigator.clipboard.writeText(CHURCH_PAYBILL);
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2000);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus("submitting");

    const payload = {
      ...formData,
      phoneNumber: formData.phoneNumber.replace(/\s+/g, ""),
      amount: Number(formData.amount),
    };

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // If route handler is not implemented or database fails
        throw new Error("Unable to record stewardship pledge");
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setErrorMessage(
        "We could not record your commitment card at this moment. This is usually due to a momentary network drop. You can try submitting again or message the Treasury desk directly."
      );
      setIsErrorModalOpen(true);
    }
  };

  const getWhatsAppPledgeUrl = () => {
    const text = `*Jericho SDA Stewardship Pledge*%0A%0A*Name:* ${
      formData.fullName || "Member"
    }%0A*Phone:* ${formData.phoneNumber || "Not provided"}%0A*Frequency:* ${
      formData.frequency
    }%0A*Amount:* KES ${formData.amount || "0"}%0A*Designation:* ${
      formData.cause
    }`;
    return `https://wa.me/${TREASURY_PHONE}?text=${text}`;
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Christian Stewardship &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Digital Stewardship Pledge
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Every man according as he purposeth in his heart, so let him
            give; not grudgingly, or of necessity: for God loveth a cheerful
            giver.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; 2 Corinthians 9:7
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-xl mx-auto px-6 -mt-8 relative z-20">
        <div className="mb-4 flex items-center justify-between text-xs">
          <Link
            href="/giving"
            className="text-stone-600 hover:text-stone-900 font-medium"
          >
            &larr; Return to Online Giving
          </Link>
          <span className="text-stone-400 font-mono text-[11px] hidden sm:inline">
            Official Treasury Portal
          </span>
        </div>

        {status === "success" ? (
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl text-center shadow-sm space-y-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                Commitment Registered
              </span>
              <h2 className="text-2xl font-serif font-black text-[#001f44]">
                Thank You, {formData.fullName || "Faithful Member"}
              </h2>
              <p className="text-stone-600 font-serif text-xs sm:text-sm max-w-md mx-auto leading-relaxed pt-1">
                Your commitment of{" "}
                <strong>
                  KES {Number(formData.amount || 0).toLocaleString()} (
                  {formData.frequency})
                </strong>{" "}
                for <strong>{formData.cause}</strong> has been logged for church
                stewardship records.
              </p>
            </div>

            {/* M-PESA FULFILLMENT BOX */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-xs font-bold text-stone-900 font-serif">
                  Fulfilling Your Pledge via M-Pesa
                </span>
                <span className="text-[10px] font-mono text-stone-500 uppercase">
                  Safaricom
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">
                    Paybill / Business No:
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {CHURCH_PAYBILL}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPaybill}
                      className="text-stone-500 hover:text-stone-900 p-1 rounded"
                      title="Copy Paybill"
                    >
                      {copiedPaybill ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block text-[11px]">
                    Account Name:
                  </span>
                  <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block truncate">
                    {formData.cause.split(" ")[0]} -{" "}
                    {formData.fullName.trim().split(" ")[0] || "Pledge"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={getWhatsAppPledgeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Treasury Desk on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    frequency: "Monthly",
                    amount: "",
                    cause: "Local Church Budget",
                  });
                }}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Submit Another
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4.5"
          >
            <div className="border-b border-stone-100 pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 block">
                Jericho SDA Church Treasury
              </span>
              <h2 className="text-xl font-serif text-[#001f44] mt-0.5">
                Stewardship Commitment Card
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Record your recurring or one-time sacrificial giving commitment
                for the church year.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-700">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                required
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="e.g. Samuel Otieno"
                className="w-full bg-stone-50/70 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-700">
                Phone Number (M-PESA) <span className="text-rose-600">*</span>
              </label>
              <input
                required
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="0712 345 678"
                className="w-full bg-stone-50/70 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="One-Time">One-Time</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Amount (KES) <span className="text-rose-600">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="50"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="1000"
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-700">
                Designated Fund / Purpose
              </label>
              <select
                value={formData.cause}
                onChange={(e) =>
                  setFormData({ ...formData, cause: e.target.value })
                }
                className="w-full bg-stone-50/70 border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
              >
                <option value="Local Church Budget">Local Church Budget</option>
                <option value="Church Building & Renovation">
                  Church Building & Renovation
                </option>
                <option value="Camp Meeting Expense">
                  Camp Meeting Expense
                </option>
                <option value="Evangelism / VOP Outreaches">
                  Evangelism / VOP Outreaches
                </option>
                <option value="Adventist Youth Ministry">
                  Adventist Youth Ministry
                </option>
                <option value="Community Welfare & Dorcas">
                  Community Welfare & Dorcas
                </option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 bg-[#001f44] hover:bg-[#001530] text-white font-medium rounded-xl text-xs transition disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Submit Commitment Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-stone-500 font-serif">
                  Prefer to pledge directly?{" "}
                  <a
                    href={getWhatsAppPledgeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Send via WhatsApp</span>
                  </a>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-mono pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confidential &bull; Managed by Church Treasury</span>
            </div>
          </form>
        )}
      </div>

      {/* Action Loader Modal */}
      <LoadingModal
        isOpen={status === "submitting"}
        title="Recording Stewardship Pledge…"
        subtitle="Securely registering your commitment card with Church Treasury."
      />

      {/* Human Error Notice Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Pledge Submission Notice"
        message={errorMessage}
        supportPhone={TREASURY_PHONE}
        onRetry={() => handleSubmit()}
      />
    </main>
  );
}