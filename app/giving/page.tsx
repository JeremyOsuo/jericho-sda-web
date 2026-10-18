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
  const [checkoutMode, setCheckoutMode] = useState<"stk" | "manual" | "pledge">("stk");
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
      {/* 1. HERO BANNER WITH AUTHENTIC CHURCH IMAGE */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-24 px-6 border-b border-stone-800 overflow-hidden">
        {/* Church Background Photo */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            src="/church-hero.jpg"
            alt="Jericho SDA Church Sanctuary Building"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001f44] via-[#001f44]/80 to-[#001f44]/75" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-300 text-xs tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span>Stewardship Ministries &bull; Jericho SDA Church</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight leading-tight">
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
      <div className="max-w-5xl mx-auto px-6 -mt-10 space-y-6 relative z-20">
        
        {/* Navigation Switcher: Envelope vs Personal Statement */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-white/90 backdrop-blur-md rounded-xl border border-stone-200 shadow-sm gap-1 font-sans">
            <button
              type="button"
              onClick={() => setActiveTab("envelope")}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === "envelope"
                  ? "bg-[#001f44] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Tithe Envelope &amp; Giving
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("statement")}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === "statement"
                  ? "bg-[#001f44] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              My Stewardship Statement
            </button>
          </div>
        </div>

        {activeTab === "envelope" ? (
          <>
            {/* Paybill Quick Info Header */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800">
                    Official Safaricom Paybill
                  </span>
                </div>
                <h2 className="text-xl font-serif text-[#001f44]">
                  Lipa Na M-PESA &bull; 752922
                </h2>
                <p className="text-xs text-stone-500 font-serif">
                  Allocate funds below to dispatch an automated prompt or remit manually.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl shrink-0">
                <div className="px-2">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block font-semibold">
                    Paybill No.
                  </span>
                  <span className="text-xl font-bold font-mono text-stone-900">
                    752922
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("752922", "paybill")}
                  className="bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {copiedKey === "paybill" ? "Copied! ✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* 2-Column Interface: Calculator & Interactive Action Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Envelope Calculator */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-lg font-serif text-[#001f44]">
                    Itemized Remittance Envelope
                  </h2>
                  <p className="text-xs text-stone-500 font-serif mt-0.5">
                    Enter income to calculate tithe or type directly into any fund field.
                  </p>
                </div>

                {/* Gross Income Quick Calculator */}
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block">
                      Gross Income / Earnings
                    </label>
                    <span className="text-[10px] text-stone-400">Autofills 10% Tithe &amp; 5% Budget</span>
                  </div>
                  <div className="relative w-full sm:w-44">
                    <span className="absolute left-3 top-2 text-xs text-stone-400 font-medium">KES</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 50,000"
                      value={grossIncome}
                      onChange={(e) => handleGrossChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg pl-11 pr-3 py-1.5 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#001f44]"
                    />
                  </div>
                </div>

                {/* Fund Rows */}
                <div className="space-y-2.5">
                  {givingItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-stone-200/80 bg-white hover:border-stone-300 transition flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-medium text-stone-900 truncate">
                            {item.label}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 block">
                          Tag: {item.accountName}
                        </span>
                      </div>

                      <div className="relative w-32 shrink-0">
                        <span className="absolute left-2.5 top-1.5 text-[11px] text-stone-400">KES</span>
                        <input
                          type="number"
                          min="0"
                          value={item.amount || ""}
                          onChange={(e) =>
                            updateItemAmount(item.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-right text-stone-900 focus:bg-white focus:outline-none focus:border-[#001f44]"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Checkout Panel (STK vs Manual vs Pledge) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-5">
                  
                  {/* Summary Total */}
                  <div className="border-b border-stone-100 pb-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block font-semibold">
                        Planned Envelope Total
                      </span>
                      <div className="text-2xl font-bold text-amber-800 font-mono mt-0.5">
                        KES {totalGiving.toLocaleString()}
                      </div>
                    </div>

                    <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {givingItems.filter((i) => i.amount > 0).length} Funds Selected
                    </span>
                  </div>

                  {/* Mode Selector Tabs (STK / Manual / Pledge) */}
                  <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl text-center text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("stk")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "stk"
                          ? "bg-[#001f44] text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      STK Push
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("manual")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "manual"
                          ? "bg-[#001f44] text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("pledge")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "pledge"
                          ? "bg-[#001f44] text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      Pledge
                    </button>
                  </div>

                  {/* MODE 1: STK PUSH */}
                  {checkoutMode === "stk" && (
                    <div className="space-y-3">
                      <p className="text-xs text-stone-500 font-serif leading-relaxed">
                        Trigger a direct Safaricom PIN request to your phone for <strong>KES {totalGiving.toLocaleString()}</strong>.
                      </p>

                      <form onSubmit={handleStkPush} className="space-y-2.5">
                        <div>
                          <label className="block text-[11px] font-medium text-stone-700 mb-1">
                            Safaricom Mobile Number
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0712 345 678"
                            value={stkPhone}
                            onChange={(e) => setStkPhone(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:bg-white focus:outline-none focus:border-[#001f44]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={stkStatus === "sending" || totalGiving <= 0}
                          className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer shadow-sm"
                        >
                          {stkStatus === "sending" ? "Dispatched to phone..." : "Send M-PESA Prompt →"}
                        </button>
                      </form>

                      {stkStatus === "sent" && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-serif">
                          ✓ {stkMessage}
                        </div>
                      )}
                      {stkStatus === "error" && (
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-serif">
                          {stkMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* MODE 2: MANUAL PAYBILL */}
                  {checkoutMode === "manual" && (
                    <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80 text-xs text-stone-600 font-serif">
                      <span className="font-semibold text-stone-800 block font-sans">
                        Manual Paybill Instructions:
                      </span>
                      <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                        <li>M-PESA &rarr; Lipa na M-PESA &rarr; <strong>Paybill</strong></li>
                        <li>Business No: <strong className="font-mono text-stone-900">752922</strong></li>
                        <li>Account No: <strong className="font-mono text-stone-900">Tithe / Offering / Name</strong></li>
                        <li>Amount: <strong className="font-mono text-stone-900">KES {totalGiving.toLocaleString()}</strong></li>
                      </ol>
                    </div>
                  )}

                  {/* MODE 3: DIGITAL PLEDGE */}
                  {checkoutMode === "pledge" && (
                    <div className="space-y-3">
                      <p className="text-xs text-stone-500 font-serif">
                        Record a future commitment directly into the treasury register.
                      </p>

                      {pledgeStatus === "success" ? (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-1">
                          <p className="text-xs font-semibold">✓ Pledge Committed</p>
                          <p className="text-[11px] font-serif">Thank you for supporting God&apos;s sanctuary.</p>
                          <button
                            type="button"
                            onClick={() => setPledgeStatus("idle")}
                            className="text-[11px] text-[#001f44] font-semibold underline pt-1 cursor-pointer"
                          >
                            New Pledge
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handlePledgeSubmit} className="space-y-2">
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            value={pledgeData.fullName}
                            onChange={(e) => setPledgeData({ ...pledgeData, fullName: e.target.value })}
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#001f44]"
                          />
                          <input
                            required
                            type="tel"
                            placeholder="Phone (07...)"
                            value={pledgeData.phoneNumber}
                            onChange={(e) => setPledgeData({ ...pledgeData, phoneNumber: e.target.value })}
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#001f44]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={pledgeData.frequency}
                              onChange={(e) => setPledgeData({ ...pledgeData, frequency: e.target.value })}
                              className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 focus:outline-none"
                            >
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="One-Time">One-Time</option>
                            </select>
                            <input
                              required
                              type="number"
                              min="50"
                              placeholder="Amount"
                              value={pledgeData.amount}
                              onChange={(e) => setPledgeData({ ...pledgeData, amount: e.target.value })}
                              className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-stone-900 focus:outline-none"
                            />
                          </div>
                          <select
                            value={pledgeData.cause}
                            onChange={(e) => setPledgeData({ ...pledgeData, cause: e.target.value })}
                            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-900 focus:outline-none"
                          >
                            <option value="Church Building / Renovation">Sanctuary Renovation</option>
                            <option value="Local Church Budget">Church Budget</option>
                            <option value="Camp Meeting Expense">Camp Meeting</option>
                            <option value="Youth & Pathfinders">Youth &amp; Pathfinders</option>
                          </select>
                          <button
                            type="submit"
                            disabled={pledgeStatus === "submitting"}
                            className="w-full bg-amber-400 hover:bg-amber-300 text-[#001f44] font-semibold text-xs py-2 rounded-lg transition cursor-pointer"
                          >
                            {pledgeStatus === "submitting" ? "Recording..." : "Record Pledge →"}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {/* Treasury Inquiries Compact Footer */}
                <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-800 block">Treasury Support</span>
                    <a
                      href={`mailto:${churchEmail}`}
                      className="text-stone-500 hover:text-amber-800 font-mono text-[11px]"
                    >
                      {churchEmail}
                    </a>
                  </div>
                  <Link
                    href="/care"
                    className="text-[#001f44] font-semibold hover:underline text-[11px]"
                  >
                    Request Envelope &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* TAB 2: MY STEWARDSHIP STATEMENT (OTP PROTECTED) */
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
            {otpStage !== "verified" ? (
              <div className="max-w-md mx-auto text-center space-y-4 py-8">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                  <AdventistLogo className="w-6 h-6 text-[#001f44]" />
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
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:bg-white focus:outline-none focus:border-[#001f44]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full bg-[#001f44] hover:bg-[#001530] text-white text-xs font-medium py-2.5 rounded-xl transition cursor-pointer"
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
                        className="w-full text-center tracking-widest bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-base font-mono font-bold text-stone-900 focus:bg-white focus:outline-none focus:border-[#001f44]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium py-2.5 rounded-xl transition cursor-pointer"
                    >
                      {otpLoading ? "Verifying..." : "View My Statement →"}
                    </button>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setOtpStage("phone")}
                        className="text-[11px] text-stone-500 hover:underline cursor-pointer"
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
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block">
                      Official Church Statement
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#001f44]">
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
                      className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium px-3.5 py-2 rounded-lg border border-stone-300 transition cursor-pointer"
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStage("phone");
                        setStatementData(null);
                        setOtpCode("");
                      }}
                      className="text-stone-500 hover:text-stone-900 text-xs px-2 py-2 cursor-pointer"
                    >
                      Exit
                    </button>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider block">
                      Total Contributed
                    </span>
                    <span className="text-lg font-bold font-mono text-[#001f44]">
                      KES {statementData?.totals.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider block">
                      Tithe
                    </span>
                    <span className="text-lg font-bold font-mono text-amber-900">
                      KES {statementData?.totals.tithe.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider block">
                      Church Budget
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-900">
                      KES {statementData?.totals.combinedOffering.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-semibold text-blue-800 tracking-wider block">
                      Building
                    </span>
                    <span className="text-lg font-bold font-mono text-blue-900">
                      KES {statementData?.totals.buildingFund.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Visual Proportion Breakdown Bar */}
                {statementData && statementData.totals.total > 0 && (
                  <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-700">Giving Allocation Distribution</span>
                      <span className="text-stone-500 font-mono text-[11px]">100% Accounted</span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-stone-200 flex overflow-hidden">
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
                  </div>
                )}

                {/* Transactions Table */}
                <div className="space-y-2">
                  <h4 className="text-sm font-serif text-[#001f44]">
                    Recorded Remittances
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 text-[10px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-50">
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Receipt Code</th>
                          <th className="py-2 px-3">Allocation Tag</th>
                          <th className="py-2 px-3 text-right">Amount (KES)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-serif">
                        {statementData?.records.map((r) => (
                          <tr key={r.id} className="hover:bg-stone-50/60">
                            <td className="py-2.5 px-3 text-stone-600">
                              {new Date(r.timestamp).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-medium text-stone-900">
                              {r.receiptNumber}
                            </td>
                            <td className="py-2.5 px-3 text-stone-600">
                              {r.accountReference}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-right font-medium text-[#001f44]">
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