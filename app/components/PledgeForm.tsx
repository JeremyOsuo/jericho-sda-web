"use client";

import { useState } from "react";

export default function PledgeForm() {
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

  if (status === "success") {
    return (
      <div className="bg-[#0b1e3b] border border-emerald-500/40 p-8 rounded-2xl text-center max-w-lg mx-auto text-white">
        <h3 className="text-xl font-bold text-emerald-400 mb-2">Pledge Recorded!</h3>
        <p className="text-slate-300 text-sm mb-4">
          Thank you for supporting God’s work at Jericho SDA Church. May God bless your commitment.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({ fullName: "", phoneNumber: "", frequency: "Monthly", amount: "", cause: "Local Church Budget" });
          }}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-semibold transition"
        >
          Submit Another Pledge
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b1e3b] border border-white/10 p-6 md:p-8 rounded-2xl max-w-lg mx-auto text-white space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-amber-400">Jericho SDA Digital Pledge Card</h2>
        <p className="text-xs text-slate-400 mt-1">
          "Every man according as he purposeth in his heart, so let him give." — 2 Cor 9:7
        </p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">Full Name</label>
        <input
          required
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. John Otieno"
          className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">Phone Number (M-PESA)</label>
        <input
          required
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="0712345678"
          className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">Frequency</label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="One-Time">One-Time</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">Amount (KES)</label>
          <input
            required
            type="number"
            min="50"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="1000"
            className="w-full bg-[#001737] border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">Cause / Department</label>
        <select
          value={formData.cause}
          onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
          className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
        >
          <option value="Local Church Budget">Local Church Budget</option>
          <option value="Church Building & Renovation">Church Building & Renovation</option>
          <option value="Camp Meeting">Camp Meeting</option>
          <option value="Evangelism">Evangelism / VOP</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition disabled:opacity-50"
      >
        {status === "submitting" ? "Recording Commitment..." : "Submit Pledge"}
      </button>

      {status === "error" && (
        <p className="text-rose-400 text-xs text-center">Failed to record pledge. Please try again.</p>
      )}
    </form>
  );
}