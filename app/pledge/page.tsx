"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";

export default function PledgePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    frequency: "Monthly",
    amount: "",
    cause: "Local Church Budget",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO - Dignified, deep navy, clear scripture */}
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
            &ldquo;Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; 2 Corinthians 9:7
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-xl mx-auto px-6 -mt-8 relative z-20">
        <div className="mb-4">
          <Link
            href="/giving"
            className="text-xs text-stone-600 hover:text-stone-900 font-medium"
          >
            &larr; Return to Online Giving
          </Link>
        </div>

        {status === "success" ? (
          <div className="bg-white border border-stone-200 p-8 rounded-xl text-center shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[#001f44]">
                Pledge Commitment Recorded
              </h2>
              <p className="text-stone-600 font-serif text-sm mt-1 leading-relaxed">
                Thank you for your commitment to God&apos;s cause at Jericho SDA Church. Your pledge has been registered with church stewardship records.
              </p>
            </div>
            <div className="pt-2">
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
                className="bg-[#001f44] hover:bg-[#001530] text-white px-5 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                Submit Another Commitment
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-stone-200 p-6 sm:p-8 rounded-xl shadow-sm space-y-4"
          >
            <div className="border-b border-stone-100 pb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 block">
                Jericho SDA Church Treasury
              </span>
              <h2 className="text-xl font-serif text-[#001f44] mt-0.5">
                Stewardship Commitment Card
              </h2>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                Record your recurring or one-time sacrificial giving commitment.
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
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Samuel Otieno"
                className="w-full bg-stone-50/70 border border-stone-300 rounded-lg px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
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
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="0712 345 678"
                className="w-full bg-stone-50/70 border border-stone-300 rounded-lg px-3.5 py-2 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-stone-700">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
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
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="1000"
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-lg px-3.5 py-2 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#001f44]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-700">
                Designated Fund / Purpose
              </label>
              <select
                value={formData.cause}
                onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                className="w-full bg-stone-50/70 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
              >
                <option value="Local Church Budget">Local Church Budget</option>
                <option value="Church Building & Renovation">Church Building & Renovation</option>
                <option value="Camp Meeting Expense">Camp Meeting Expense</option>
                <option value="Evangelism / VOP">Evangelism / VOP</option>
                <option value="Adventist Youth Ministry">Adventist Youth Ministry</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-2.5 bg-[#001f44] hover:bg-[#001530] text-white font-medium rounded-lg text-xs transition disabled:opacity-50 cursor-pointer"
              >
                {status === "submitting" ? "Recording Commitment..." : "Submit Commitment Card \u2192"}
              </button>
            </div>

            {status === "error" && (
              <p className="text-rose-600 text-xs text-center pt-1 font-serif">
                Could not record your pledge. Please check your network and try again.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}