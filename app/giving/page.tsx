"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";

interface GivingItem {
  id: string;
  label: string;
  accountName: string;
  category: "Conference" | "Local Church" | "Special Project";
  amount: number;
}

interface MemberStatement {
  phone: string;
  totals: {
    total: number;
    tithe: number;
    combinedOffering: number;
    buildingFund: number;
    welfare: number;
    youth: number;
  };
  records: Array<{
    id: string;
    receiptNumber: string;
    amount: number;
    timestamp: string;
    breakdown: {
      tithe: number;
      combinedOffering: number;
      campMeeting: number;
      buildingFund: number;
      welfare: number;
      youthMinistry: number;
    };
    accountReference: string;
  }>;
}

export default function GivingPage() {
  const [activeTab, setActiveTab] = useState<"envelope" | "statement">("envelope");
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // M-PESA STK Push States
  const [stkPhone, setStkPhone] = useState<string>("");
  const [stkStatus, setStkStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [stkMessage, setStkMessage] = useState<string>("");

  // OTP Statement Lookup States
  const [otpPhone, setOtpPhone] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpStage, setOtpStage] = useState<"phone" | "code" | "verified">("phone");
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");
  const [otpNotice, setOtpNotice] = useState<string>("");
  const [statementData, setStatementData] = useState<MemberStatement | null>(null);

  const [givingItems, setGivingItems] = useState<GivingItem[]>([
    { id: "tithe", label: "Tithe (10%)", accountName: "Tithe", category: "Conference", amount: 0 },
    { id: "combined", label: "Combined Offering (Church Budget)", accountName: "Church Budget", category: "Local Church", amount: 0 },
    { id: "camp", label: "Camp Meeting Offering", accountName: "Camp Meeting", category: "Conference", amount: 0 },
    { id: "building", label: "Sanctuary Development / Building", accountName: "Building Fund", category: "Special Project", amount: 0 },
    { id: "welfare", label: "Dorcas & Community Welfare", accountName: "Welfare", category: "Local Church", amount: 0 },
    { id: "youth", label: "Adventist Youth & Pathfinders", accountName: "Youth Ministry", category: "Local Church", amount: 0 },
  ]);

  const [pledgeData, setPledgeData] = useState({
    fullName: "",
    phoneNumber: "",
    frequency: "Monthly",
    amount: "",
    cause: "Church Building / Renovation",
  });
  const [pledgeStatus, setPledgeStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const churchEmail = "jericho.sda@gmail.com";

  const handleGrossChange = (val: string) => {
    setGrossIncome(val);
    const num = parseFloat(val) || 0;
    const computedTithe = Math.round(num * 0.1);
    const suggestedOffering = Math.round(num * 0.05);

    setGivingItems((prev) =>
      prev.map((item) => {
        if (item.id === "tithe") return { ...item, amount: computedTithe };
        if (item.id === "combined") return { ...item, amount: suggestedOffering };
        return item;
      })
    );
  };

  const updateItemAmount = (id: string, newAmount: number) => {
    setGivingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: isNaN(newAmount) ? 0 : Math.max(0, newAmount) } : item
      )
    );
  };

  const totalGiving = givingItems.reduce((acc, curr) => acc + curr.amount, 0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // STK Push Trigger
  const handleStkPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stkPhone || stkPhone.length < 9) {
      alert("Please enter a valid phone number (e.g., 0712 345 678).");
      return;
    }
    if (totalGiving <= 0) {
      alert("Please allocate an amount in your envelope before sending the prompt.");
      return;
    }

    setStkStatus("sending");
    setStkMessage("");

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: stkPhone,
          amount: totalGiving,
          breakdown: givingItems,
          accountReference: "TitheOffer",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to trigger M-PESA STK push");

      setStkStatus("sent");
      setStkMessage(data.message || "M-PESA prompt dispatched. Enter your PIN on your phone.");
    } catch (err: unknown) {
      setStkStatus("error");
      setStkMessage(err instanceof Error ? err.message : "Could not reach Safaricom service.");
    }
  };

  // OTP Request
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpPhone || otpPhone.length < 9) {
      setOtpError("Please enter a valid M-PESA phone number.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    setOtpNotice("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: otpPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch verification code");

      setOtpStage("code");
      setOtpNotice(data.testCodeNotice || "A 4-digit verification code has been sent to your phone.");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Error dispatching verification code.");
    } finally {
      setOtpLoading(false);
    }
  };

  // OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 4) {
      setOtpError("Enter the 4-digit verification code.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: otpPhone, code: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid or expired verification code");

      setStatementData(data);
      setOtpStage("verified");
    } catch (err: unknown) {
      setOtpError(err instanceof Error ? err.message : "Failed to verify code.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeStatus("submitting");

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pledgeData),
      });

      if (!res.ok) throw new Error("Pledge submission failed");
      setPledgeStatus("success");
    } catch {
      setPledgeStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-stone-900 pb-32">
      {/* 1. HERO BANNER */}
      <section className="bg-[#001f44] text-white pt-36 sm:pt-42 pb-20 px-6 border-b border-stone-800">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Stewardship Ministries &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Faithful Giving &amp; Tithes
          </h1>

          <blockquote className="text-stone-300 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts.&rdquo;
            <cite className="block not-italic text-xs font-sans font-medium text-amber-300/90 mt-1.5">
              &mdash; Malachi 3:10
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 space-y-8">
        {/* Navigation Switcher: Envelope vs Personal Statement */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-stone-200/60 rounded-xl border border-stone-200 gap-1 font-sans">
            <button
              type="button"
              onClick={() => setActiveTab("envelope")}
              className={`px-5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === "envelope"
                  ? "bg-[#001f44] text-white shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Tithe Envelope &amp; STK Push
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("statement")}
              className={`px-5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === "statement"
                  ? "bg-[#001f44] text-white shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              My Stewardship Statement
            </button>
          </div>
        </div>

        {activeTab === "envelope" ? (
          <>
            {/* Paybill Quick Info Header */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800">
                    Official Safaricom Paybill
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-[#001f44]">
                  Lipa Na M-PESA
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-lg">
                  Send tithes directly to <strong>752922</strong>, or trigger an instant prompt to your phone below.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 bg-stone-50 border border-stone-200/90 p-3.5 rounded-lg shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block">
                    Business No.
                  </span>
                  <span className="text-2xl font-semibold font-mono tracking-wide text-stone-900">
                    752922
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("752922", "paybill")}
                  className="bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium px-3.5 py-2 rounded transition cursor-pointer"
                >
                  {copiedKey === "paybill" ? "Copied! ✓" : "Copy Paybill"}
                </button>
                <a
                  href="#digital-pledge-card"
                  className="text-stone-700 hover:text-stone-900 border border-stone-300 hover:border-stone-400 text-xs font-medium px-3.5 py-2 rounded transition"
                >
                  Pledge Card &darr;
                </a>
              </div>
            </div>

            {/* 2-Column Interface: Calculator & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Envelope Calculator */}
              <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-serif text-[#001f44]">
                    Tithe &amp; Offerings Envelope
                  </h2>
                  <p className="text-xs text-stone-500 font-serif mt-1">
                    Calculate your 10% tithe and allocate planned offerings across church funds.
                  </p>
                </div>

                {/* Income Input */}
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1.5">
                  <label className="text-xs font-medium text-stone-700 block">
                    Gross Income / Earnings (KES)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-medium">
                      KES
                    </span>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 50,000"
                      value={grossIncome}
                      onChange={(e) => handleGrossChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg pl-12 pr-3 py-2 text-sm font-medium text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>
                </div>

                {/* Fund Breakdown Rows */}
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                    Itemized Allocation
                  </span>

                  {givingItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium text-stone-900">
                          {item.label}
                        </h3>
                        <span className="text-[11px] text-stone-400 block mt-0.5">
                          Account tag: &ldquo;{item.accountName}&rdquo;
                        </span>
                      </div>

                      <div className="relative w-full sm:w-36 shrink-0">
                        <span className="absolute left-2.5 top-1.5 text-xs text-stone-400">
                          KES
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={item.amount || ""}
                          onChange={(e) =>
                            updateItemAmount(item.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs font-medium text-right text-stone-900 focus:bg-white focus:outline-none focus:border-[#001f44]"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Envelope Summary & STK Push */}
              <div className="lg:col-span-5 space-y-6">
                {/* Envelope Summary Slip */}
                <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-5">
                  <div className="border-b border-stone-200 pb-4">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">
                      Summary Slip
                    </span>
                    <h3 className="text-base font-serif text-[#001f44] mt-0.5">
                      Total Planned Remittance
                    </h3>
                    <div className="text-3xl font-semibold text-amber-700 mt-1 font-mono">
                      KES {totalGiving.toLocaleString()}
                    </div>
                  </div>

                  {/* Items Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    {givingItems
                      .filter((item) => item.amount > 0)
                      .map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-stone-600">
                          <span>{item.accountName}</span>
                          <span className="font-mono text-stone-900 font-medium">
                            KES {item.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}

                    {totalGiving === 0 && (
                      <p className="text-stone-400 text-xs italic">
                        Enter amounts on the left to review your envelope allocation.
                      </p>
                    )}
                  </div>

                  {/* STK PUSH FORM */}
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <span className="text-xs uppercase font-semibold text-stone-800 tracking-wider block font-sans">
                      Lipa na M-PESA Prompt (STK Push)
                    </span>
                    <p className="text-[11px] text-stone-500 font-serif leading-relaxed">
                      Enter your Safaricom phone number to receive an instant PIN prompt on your phone for KES {totalGiving.toLocaleString()}.
                    </p>

                    <form onSubmit={handleStkPush} className="space-y-2.5">
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="0712 345 678"
                          value={stkPhone}
                          onChange={(e) => setStkPhone(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={stkStatus === "sending" || totalGiving <= 0}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        {stkStatus === "sending" ? (
                          <span>Sending STK Prompt...</span>
                        ) : (
                          <>
                            <span>Send M-PESA Prompt</span>
                            <span>&rarr;</span>
                          </>
                        )}
                      </button>
                    </form>

                    {stkStatus === "sent" && (
                      <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-serif leading-relaxed">
                        ✓ {stkMessage}
                      </div>
                    )}
                    {stkStatus === "error" && (
                      <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs font-serif leading-relaxed">
                        {stkMessage}
                      </div>
                    )}
                  </div>

                  {/* Manual Paybill Instructions Fallback */}
                  <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-500 font-serif">
                    <span className="font-medium text-stone-700 block font-sans">
                      Or send manually:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-[11px]">
                      <li>Paybill: <strong>752922</strong></li>
                      <li>Account: <strong>Tithe / Offering / Name</strong></li>
                      <li>Amount: <strong>KES {totalGiving.toLocaleString()}</strong></li>
                    </ol>
                  </div>
                </div>

                {/* DIGITAL PLEDGE CARD */}
                <div id="digital-pledge-card" className="bg-[#001f44] rounded-xl p-6 text-white shadow-sm space-y-4 scroll-mt-24">
                  <div>
                    <span className="text-xs text-amber-300 font-medium uppercase tracking-wider block">
                      Stewardship Commitment
                    </span>
                    <h3 className="text-xl font-serif text-white mt-1">
                      Digital Pledge Card
                    </h3>
                    <p className="text-xs text-stone-300 font-serif mt-1">
                      Record your intention toward church projects. Data submits directly to the treasury ledger.
                    </p>
                  </div>

                  {pledgeStatus === "success" ? (
                    <div className="p-5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                      <div className="text-emerald-400 text-lg font-bold">✓</div>
                      <h4 className="text-sm font-medium text-emerald-200 font-serif">
                        Pledge Recorded
                      </h4>
                      <p className="text-xs text-stone-300 font-serif">
                        Thank you for your commitment to God&apos;s house. May the Lord bless your faithful stewardship.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPledgeStatus("idle");
                          setPledgeData({
                            fullName: "",
                            phoneNumber: "",
                            frequency: "Monthly",
                            amount: "",
                            cause: "Church Building / Renovation",
                          });
                        }}
                        className="mt-2 text-xs bg-emerald-800 hover:bg-emerald-700 font-medium px-3.5 py-1.5 rounded transition"
                      >
                        Submit Another Pledge
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handlePledgeSubmit} className="space-y-3.5 text-left">
                      <div>
                        <label className="block text-xs font-medium text-stone-200 mb-1">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Samuel Otieno"
                          value={pledgeData.fullName}
                          onChange={(e) => setPledgeData({ ...pledgeData, fullName: e.target.value })}
                          className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-200 mb-1">
                          Phone Number (M-PESA)
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="0712345678"
                          value={pledgeData.phoneNumber}
                          onChange={(e) => setPledgeData({ ...pledgeData, phoneNumber: e.target.value })}
                          className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-stone-200 mb-1">
                            Frequency
                          </label>
                          <select
                            value={pledgeData.frequency}
                            onChange={(e) => setPledgeData({ ...pledgeData, frequency: e.target.value })}
                            className="w-full bg-[#001737] border border-white/20 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="One-Time">One-Time</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-stone-200 mb-1">
                            Amount (KES)
                          </label>
                          <input
                            required
                            type="number"
                            min="50"
                            placeholder="1,000"
                            value={pledgeData.amount}
                            onChange={(e) => setPledgeData({ ...pledgeData, amount: e.target.value })}
                            className="w-full bg-[#001737] border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-200 mb-1">
                          Target Project / Fund
                        </label>
                        <select
                          value={pledgeData.cause}
                          onChange={(e) => setPledgeData({ ...pledgeData, cause: e.target.value })}
                          className="w-full bg-[#001737] border border-white/20 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Church Building / Renovation">Church Building &amp; Renovation</option>
                          <option value="Local Church Budget">Local Church Budget</option>
                          <option value="Camp Meeting Expense">Camp Meeting Expense</option>
                          <option value="Evangelism / VOP">Evangelism / VOP</option>
                          <option value="Youth & Pathfinders">Youth &amp; Pathfinders</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={pledgeStatus === "submitting"}
                        className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs uppercase tracking-wider py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer"
                      >
                        {pledgeStatus === "submitting" ? "Submitting..." : "Commit Pledge →"}
                      </button>

                      {pledgeStatus === "error" && (
                        <p className="text-xs text-rose-300 text-center">
                          Failed to record pledge. Please try again.
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Treasury Contact Card */}
                <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-2">
                  <h4 className="text-sm font-serif text-[#001f44]">
                    Treasury &amp; Stewardship Inquiries
                  </h4>
                  <p className="text-xs text-stone-500 font-serif leading-relaxed">
                    For tithe receipts, bank wire transfers, or queries, contact the treasury team:
                  </p>
                  <div className="text-xs text-stone-700 space-y-1 pt-1 font-sans">
                    <div>
                      Email:{" "}
                      <a
                        href={`mailto:${churchEmail}?subject=Tithe%20%2F%20Offering%20Inquiry`}
                        className="font-mono text-[#001f44] font-semibold underline hover:text-amber-800"
                      >
                        {churchEmail}
                      </a>
                    </div>
                    <div>Office: <strong>Sabbaths after Divine Service</strong></div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/leadership"
                      className="text-xs font-medium text-[#001f44] hover:underline"
                    >
                      View Treasury Department Leaders &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* TAB 2: MY STEWARDSHIP STATEMENT (OTP PROTECTED) */
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8">
            {otpStage !== "verified" ? (
              <div className="max-w-md mx-auto text-center space-y-5 py-8">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                  <AdventistLogo className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif text-[#001f44]">
                    Member Stewardship Statement
                  </h3>
                  <p className="text-xs text-stone-500 font-serif">
                    Access your official tithe and offering contributions securely via your phone number.
                  </p>
                </div>

                {otpStage === "phone" ? (
                  <form onSubmit={handleRequestOtp} className="space-y-3 pt-2 text-left">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        M-PESA Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0712 345 678"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium py-2.5 rounded-lg transition cursor-pointer"
                    >
                      {otpLoading ? "Sending SMS Code..." : "Send Verification Code →"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2 text-left">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        4-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="e.g. 7529"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest bg-white border border-stone-300 rounded-lg px-3 py-2 text-base font-mono font-bold text-stone-900 focus:outline-none focus:border-[#001f44]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium py-2.5 rounded-lg transition cursor-pointer"
                    >
                      {otpLoading ? "Verifying..." : "View My Statement →"}
                    </button>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setOtpStage("phone")}
                        className="text-[11px] text-stone-500 hover:underline"
                      >
                        ← Change Phone Number
                      </button>
                    </div>
                  </form>
                )}

                {otpNotice && (
                  <p className="text-[11px] text-stone-500 font-serif bg-stone-50 p-2.5 rounded border border-stone-200">
                    {otpNotice}
                  </p>
                )}
                {otpError && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                    {otpError}
                  </p>
                )}
              </div>
            ) : (
              /* VERIFIED STATEMENT VIEW */
              <div className="space-y-8">
                {/* Statement Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
                      Official Church Statement
                    </span>
                    <h3 className="text-2xl font-serif text-[#001f44]">
                      Stewardship Contributions
                    </h3>
                    <p className="text-xs text-stone-500 font-serif">
                      Account Number: <strong className="font-mono text-stone-800">+{statementData?.phone}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium px-4 py-2 rounded-lg border border-stone-300 transition"
                    >
                      Print Statement
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStage("phone");
                        setStatementData(null);
                        setOtpCode("");
                      }}
                      className="text-stone-500 hover:text-stone-900 text-xs px-3 py-2"
                    >
                      Exit
                    </button>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider block">
                      Total Contributed
                    </span>
                    <span className="text-xl font-bold font-mono text-[#001f44]">
                      KES {statementData?.totals.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider block">
                      Tithe (CKC Remittance)
                    </span>
                    <span className="text-xl font-bold font-mono text-amber-900">
                      KES {statementData?.totals.tithe.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider block">
                      Church Budget
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-900">
                      KES {statementData?.totals.combinedOffering.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-blue-800 tracking-wider block">
                      Sanctuary Building
                    </span>
                    <span className="text-xl font-bold font-mono text-blue-900">
                      KES {statementData?.totals.buildingFund.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Visual Proportion Breakdown Bar */}
                {statementData && statementData.totals.total > 0 && (
                  <div className="space-y-2 bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-700">Giving Allocation Distribution</span>
                      <span className="text-stone-500 font-mono text-[11px]">100% Accounted</span>
                    </div>

                    <div className="w-full h-4 rounded-full bg-stone-200 flex overflow-hidden">
                      <div
                        style={{
                          width: `${(statementData.totals.tithe / statementData.totals.total) * 100}%`,
                        }}
                        className="bg-amber-600 h-full"
                        title="Tithe"
                      />
                      <div
                        style={{
                          width: `${(statementData.totals.combinedOffering / statementData.totals.total) * 100}%`,
                        }}
                        className="bg-emerald-600 h-full"
                        title="Combined Offering"
                      />
                      <div
                        style={{
                          width: `${(statementData.totals.buildingFund / statementData.totals.total) * 100}%`,
                        }}
                        className="bg-blue-600 h-full"
                        title="Building Fund"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1 text-stone-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        Tithe ({Math.round((statementData.totals.tithe / statementData.totals.total) * 100)}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        Combined Offering ({Math.round((statementData.totals.combinedOffering / statementData.totals.total) * 100)}%)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        Sanctuary Building ({Math.round((statementData.totals.buildingFund / statementData.totals.total) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}

                {/* Transactions Table */}
                <div className="space-y-3">
                  <h4 className="text-base font-serif text-[#001f44]">
                    Recorded M-PESA Remittances
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 text-[11px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-50">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Receipt Code</th>
                          <th className="py-2.5 px-3">Allocation Tag</th>
                          <th className="py-2.5 px-3 text-right">Amount (KES)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-serif">
                        {statementData?.records.map((r) => (
                          <tr key={r.id} className="hover:bg-stone-50/60">
                            <td className="py-3 px-3 text-stone-600">
                              {new Date(r.timestamp).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-3 px-3 font-mono font-medium text-stone-900">
                              {r.receiptNumber}
                            </td>
                            <td className="py-3 px-3 text-stone-600">
                              {r.accountReference}
                            </td>
                            <td className="py-3 px-3 font-mono text-right font-medium text-[#001f44]">
                              {r.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}