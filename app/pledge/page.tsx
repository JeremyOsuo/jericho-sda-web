"use client";

import { useState } from "react";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#001737] text-white py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-xs text-amber-400 hover:underline">
            ← Return to Sanctuary Portal
          </Link>
        </div>

        {status === "success" ? (
          <div className="bg-[#0b1e3b] border border-emerald-500/40 p-8 rounded-2xl text-center shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Pledge Recorded!</h2>
            <p className="text-slate-300 text-sm mb-6">
              Thank you for committing to God’s work at Jericho SDA Church. Your pledge has been registered with the church stewardship records.
            </p>
            <button
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
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-semibold transition"
            >
              Submit Another Commitment
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b1e3b] border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl space-y-5"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Jericho SDA Church</span>
              <h1 className="text-2xl font-bold text-white mt-1">Digital Pledge Card</h1>
              <p className="text-xs text-slate-300 mt-1 italic">
                "Every man according as he purposeth in his heart, so let him give." — 2 Corinthians 9:7
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Full Name
              </label>
              <input
                required
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Samuel Otieno"
                className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Phone Number (M-PESA)
              </label>
              <input
                required
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="0712345678"
                className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="One-Time">One-Time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Amount (KES)
                </label>
                <input
                  required
                  type="number"
                  min="50"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="1000"
                  className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Fund / Cause
              </label>
              <select
                value={formData.cause}
                onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Local Church Budget">Local Church Budget</option>
                <option value="Church Building & Renovation">Church Building & Renovation</option>
                <option value="Camp Meeting Expense">Camp Meeting Expense</option>
                <option value="Evangelism / VOP">Evangelism / VOP</option>
                <option value="Adventist Youth Ministry">Adventist Youth Ministry</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition disabled:opacity-50 mt-2"
            >
              {status === "submitting" ? "Recording Commitment..." : "Submit Pledge"}
            </button>

            {status === "error" && (
              <p className="text-rose-400 text-xs text-center">
                Could not record your pledge. Please check your connection and try again.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}