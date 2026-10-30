"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../../components/AdventistLogo";
import GivingVerification from "@/components/GivingVerification";
import ErrorModal from "../../components/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import {
  Smartphone,
  Copy,
  Printer,
  Lock,
} from "lucide-react";

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

  // Reusable Modal States
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Notice from Treasury Desk");
  const [modalMessage, setModalMessage] = useState("");
  const [modalRetryAction, setModalRetryAction] = useState<(() => void) | undefined>(undefined);

  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("Connecting to Treasury Desk…");
  const [loadingSubtitle, setLoadingSubtitle] = useState("Please wait a moment while we process your request.");

  // M-PESA STK Push States
  const [stkPhone, setStkPhone] = useState<string>("");
  const [stkStatus, setStkStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [stkMessage, setStkMessage] = useState<string>("");

  // OTP Statement Lookup States
  const [otpPhone, setOtpPhone] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpStage, setOtpStage] = useState<"phone" | "code" | "verified">("phone");
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
  const treasuryPhone = "254700000000";

  const triggerError = (title: string, message: string, retry?: () => void) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalRetryAction(retry ? () => retry : undefined);
    setIsErrorModalOpen(true);
  };

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
  const handleStkPush = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = stkPhone.replace(/\s+/g, "");

    if (!cleanPhone || cleanPhone.length < 9) {
      triggerError(
        "Phone Number Required",
        "Please provide a valid Safaricom phone number (e.g., 0712 345 678) to dispatch your M-PESA payment prompt."
      );
      return;
    }
    if (totalGiving <= 0) {
      triggerError(
        "Envelope Amount Unallocated",
        "Please allocate an amount in your tithe envelope before triggering the automated M-PESA prompt."
      );
      return;
    }

    setStkStatus("sending");
    setStkMessage("");
    setLoadingTitle("Sending M-PESA Prompt…");
    setLoadingSubtitle(`Requesting KES ${totalGiving.toLocaleString()} prompt to ${cleanPhone}. Please unlock your phone.`);
    setIsLoadingModalOpen(true);

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: cleanPhone,
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
      const errorMsg = err instanceof Error ? err.message : "Could not reach Safaricom service.";
      setStkMessage(errorMsg);
      triggerError(
        "M-PESA Connection Issue",
        `We could not dispatch the automated payment prompt to ${cleanPhone}. You can remit manually via Paybill 752922 or reach out to the Treasury desk.`,
        () => handleStkPush()
      );
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  // OTP Request
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = otpPhone.replace(/\s+/g, "");

    if (!cleanPhone || cleanPhone.length < 9) {
      triggerError(
        "Invalid Phone Number",
        "Please enter a valid M-PESA phone number to receive your secure verification code."
      );
      return;
    }

    setLoadingTitle("Dispatching Security Code…");
    setLoadingSubtitle("Sending a 4-digit verification code to your mobile phone via SMS.");
    setIsLoadingModalOpen(true);
    setOtpNotice("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleanPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch verification code");

      setOtpStage("code");
      setOtpNotice(data.testCodeNotice || "A 4-digit verification code has been sent to your phone.");
    } catch (err: unknown) {
      triggerError(
        "Verification Code Not Sent",
        err instanceof Error ? err.message : "Error dispatching verification code. Please verify your phone number and try again.",
        () => handleRequestOtp()
      );
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  // OTP Verification
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = otpPhone.replace(/\s+/g, "");

    if (!otpCode || otpCode.trim().length !== 4) {
      triggerError(
        "Invalid Verification Code",
        "Please enter the complete 4-digit code sent to your phone."
      );
      return;
    }

    setLoadingTitle("Authenticating Statement Access…");
    setLoadingSubtitle("Verifying your security credentials against church treasury audit records.");
    setIsLoadingModalOpen(true);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleanPhone, code: otpCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid or expired verification code");

      setStatementData(data);
      setOtpStage("verified");
    } catch (err: unknown) {
      triggerError(
        "Authentication Notice",
        err instanceof Error ? err.message : "Failed to verify code. Please confirm the digits or request a new code.",
        () => handleVerifyOtp()
      );
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const handlePledgeSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPledgeStatus("submitting");
    setLoadingTitle("Registering Commitment…");
    setLoadingSubtitle("Logging your sacrificial pledge into the church stewardship record.");
    setIsLoadingModalOpen(true);

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pledgeData,
          phoneNumber: pledgeData.phoneNumber.replace(/\s+/g, ""),
          amount: Number(pledgeData.amount),
        }),
      });

      if (!res.ok) throw new Error("Pledge submission could not be verified by server");
      setPledgeStatus("success");
    } catch {
      setPledgeStatus("idle");
      triggerError(
        "Pledge Registration Notice",
        "We could not record your commitment card at this moment due to a connection drop. You can try again or message the Treasury desk directly on WhatsApp.",
        () => handlePledgeSubmit()
      );
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #e0edff 50%, #bfdbfe 100%)",
        minHeight: "100vh",
      }}
      className="text-slate-800 pb-32 font-sans"
    >
      {/* 1. HERO BANNER WITH SANCTUARY IMAGE */}
      <section className="relative bg-[#001f44] text-white pt-36 sm:pt-42 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <img
            src="/church-hero.jpg"
            alt="Jericho SDA Church Sanctuary Building"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001f44] via-[#001f44]/80 to-[#001f44]/75" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-stone-200 text-xs tracking-wider uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            <AdventistLogo className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">
              Stewardship Ministries &bull; Jericho SDA Church
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
            Faithful Giving &amp; Tithes
          </h1>

          <blockquote className="text-blue-100 text-sm md:text-base font-serif italic max-w-xl mx-auto pt-1 leading-relaxed">
            &ldquo;Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts.&rdquo;
            <cite className="block not-italic text-xs font-sans font-semibold text-amber-300 mt-1.5">
              &mdash; Malachi 3:10
            </cite>
          </blockquote>
        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 space-y-6 relative z-20">
        {/* Navigation Switcher: Envelope vs Personal Statement */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-blue-200/80 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("envelope")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "envelope"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-900"
              }`}
            >
              Tithe Envelope &amp; Giving
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("statement")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "statement"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-blue-900"
              }`}
            >
              My Stewardship Statement
            </button>
          </div>
        </div>

        {activeTab === "envelope" ? (
          <>
            {/* Paybill Quick Info Header */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-blue-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Official Safaricom Paybill
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-blue-950">
                  Lipa Na M-PESA &bull; 752922
                </h2>
                <p className="text-xs text-slate-500">
                  Allocate funds below to dispatch an automated prompt or remit manually.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl shrink-0">
                <div className="px-2">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
                    Paybill No.
                  </span>
                  <span className="text-xl font-extrabold font-mono text-slate-900">
                    752922
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("752922", "paybill")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey === "paybill" ? "Copied! ✓" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* 2-Column Interface: Calculator & Interactive Action Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Envelope Calculator */}
              <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-blue-200/70 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    Interactive Worksheet
                  </span>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Itemized Remittance Envelope
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enter income to calculate tithe or type directly into any fund field.
                  </p>
                </div>

                {/* Gross Income Quick Calculator */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block">
                      Gross Income / Earnings
                    </label>
                    <span className="text-[10px] text-slate-400">Autofills 10% Tithe &amp; 5% Budget</span>
                  </div>
                  <div className="relative w-full sm:w-44">
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono font-medium">KES</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 50,000"
                      value={grossIncome}
                      onChange={(e) => handleGrossChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-3 py-1.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Fund Rows */}
                <div className="space-y-2.5">
                  {givingItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 transition flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">
                          {item.label}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Tag: {item.accountName}
                        </span>
                      </div>

                      <div className="relative w-32 shrink-0">
                        <span className="absolute left-2.5 top-1.5 text-[11px] text-slate-400 font-mono">KES</span>
                        <input
                          type="number"
                          min="0"
                          value={item.amount || ""}
                          onChange={(e) =>
                            updateItemAmount(item.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-right text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Checkout Panel (STK vs Manual vs Pledge) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-blue-200/70 shadow-xs space-y-5">
                  {/* Summary Total */}
                  <div className="border-b border-slate-100 pb-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
                        Planned Envelope Total
                      </span>
                      <div className="text-2xl font-extrabold text-blue-900 font-mono mt-0.5">
                        KES {totalGiving.toLocaleString()}
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono">
                      {givingItems.filter((i) => i.amount > 0).length} Funds
                    </span>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-center text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("stk")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "stk"
                          ? "bg-blue-600 text-white shadow-2xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      STK Push
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("manual")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "manual"
                          ? "bg-blue-600 text-white shadow-2xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("pledge")}
                      className={`py-1.5 rounded-lg transition cursor-pointer ${
                        checkoutMode === "pledge"
                          ? "bg-blue-600 text-white shadow-2xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Pledge
                    </button>
                  </div>

                  {/* MODE 1: STK PUSH */}
                  {checkoutMode === "stk" && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Trigger a direct Safaricom PIN request to your phone for <strong>KES {totalGiving.toLocaleString()}</strong>.
                      </p>

                      <form onSubmit={handleStkPush} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Safaricom Mobile Number
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0712 345 678"
                            value={stkPhone}
                            onChange={(e) => setStkPhone(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={stkStatus === "sending" || totalGiving <= 0}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>{stkStatus === "sending" ? "Dispatched to phone..." : "Send M-PESA Prompt →"}</span>
                        </button>
                      </form>

                      {stkStatus === "sent" && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                          ✓ {stkMessage}
                        </div>
                      )}
                    </div>
                  )}

                  {/* MODE 2: MANUAL PAYBILL */}
                  {checkoutMode === "manual" && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
                      <span className="font-bold text-slate-900 block">
                        Manual Paybill Instructions:
                      </span>
                      <ol className="list-decimal list-inside space-y-1.5 leading-relaxed font-mono text-[11px]">
                        <li>M-PESA &rarr; Lipa na M-PESA &rarr; <strong>Paybill</strong></li>
                        <li>Business No: <strong className="text-slate-900 font-bold">752922</strong></li>
                        <li>Account No: <strong className="text-blue-700 font-bold">Tithe / Offering / Name</strong></li>
                        <li>Amount: <strong className="text-slate-900 font-bold">KES {totalGiving.toLocaleString()}</strong></li>
                      </ol>
                    </div>
                  )}

                  {/* MODE 3: DIGITAL PLEDGE */}
                  {checkoutMode === "pledge" && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Record a future commitment directly into the church stewardship register.
                      </p>

                      {pledgeStatus === "success" ? (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-1">
                          <p className="text-xs font-bold">✓ Pledge Committed</p>
                          <p className="text-[11px]">Thank you for supporting God&apos;s sanctuary.</p>
                          <button
                            type="button"
                            onClick={() => setPledgeStatus("idle")}
                            className="text-[11px] text-blue-700 font-bold underline pt-1 cursor-pointer"
                          >
                            New Pledge
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handlePledgeSubmit} className="space-y-2.5">
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            value={pledgeData.fullName}
                            onChange={(e) => setPledgeData({ ...pledgeData, fullName: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <input
                            required
                            type="tel"
                            placeholder="Phone (07...)"
                            value={pledgeData.phoneNumber}
                            onChange={(e) => setPledgeData({ ...pledgeData, phoneNumber: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={pledgeData.frequency}
                              onChange={(e) => setPledgeData({ ...pledgeData, frequency: e.target.value })}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-900 focus:outline-none"
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
                              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none"
                            />
                          </div>
                          <select
                            value={pledgeData.cause}
                            onChange={(e) => setPledgeData({ ...pledgeData, cause: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
                          >
                            <option value="Church Building / Renovation">Sanctuary Renovation</option>
                            <option value="Local Church Budget">Church Budget</option>
                            <option value="Camp Meeting Expense">Camp Meeting</option>
                            <option value="Youth & Pathfinders">Youth &amp; Pathfinders</option>
                          </select>
                          <button
                            type="submit"
                            disabled={pledgeStatus === "submitting"}
                            className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                          >
                            {pledgeStatus === "submitting" ? "Recording..." : "Record Pledge →"}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {/* Treasury Inquiries Compact Footer */}
                <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-blue-100 shadow-xs flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800 block">Treasury Support</span>
                    <a
                      href={`mailto:${churchEmail}`}
                      className="text-slate-500 hover:text-blue-700 font-mono text-[11px]"
                    >
                      {churchEmail}
                    </a>
                  </div>
                  <Link
                    href="/care"
                    className="text-blue-600 font-bold hover:underline text-[11px]"
                  >
                    Request Physical Envelope &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Live Verification Widget Component */}
            <div className="pt-4">
              <GivingVerification />
            </div>
          </>
        ) : (
          /* TAB 2: MY STEWARDSHIP STATEMENT (OTP PROTECTED) */
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200/70 shadow-xs space-y-6">
            {otpStage !== "verified" ? (
              <div className="max-w-md mx-auto text-center space-y-4 py-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif text-blue-950 font-normal">
                    Member Stewardship Statement
                  </h3>
                  <p className="text-xs text-slate-500">
                    Access your official tithe and offering contributions securely via your phone number.
                  </p>
                </div>

                {otpStage === "phone" ? (
                  <form onSubmit={handleRequestOtp} className="space-y-3 pt-2 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        M-PESA Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0712 345 678"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                    >
                      Send Verification Code →
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        4-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="e.g. 7529"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center tracking-widest bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-base font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                    >
                      View My Statement →
                    </button>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setOtpStage("phone")}
                        className="text-[11px] text-slate-500 hover:underline cursor-pointer"
                      >
                        ← Change Phone Number
                      </button>
                    </div>
                  </form>
                )}

                {otpNotice && (
                  <p className="text-[11px] text-slate-600 bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                    {otpNotice}
                  </p>
                )}
              </div>
            ) : (
              /* VERIFIED STATEMENT VIEW */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 block w-fit mb-1">
                      Official Church Statement
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-blue-950 font-normal">
                      Stewardship Contributions
                    </h3>
                    <p className="text-xs text-slate-500">
                      Account Number: <strong className="font-mono text-slate-800">+{statementData?.phone}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStage("phone");
                        setStatementData(null);
                        setOtpCode("");
                      }}
                      className="text-slate-500 hover:text-slate-900 text-xs px-2 py-2 cursor-pointer"
                    >
                      Exit
                    </button>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Total Contributed
                    </span>
                    <span className="text-lg font-bold font-mono text-slate-900">
                      KES {statementData?.totals.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100">
                    <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
                      Tithe
                    </span>
                    <span className="text-lg font-bold font-mono text-blue-900">
                      KES {statementData?.totals.tithe.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                      Church Budget
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-900">
                      KES {statementData?.totals.combinedOffering.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] uppercase font-bold text-indigo-800 tracking-wider block">
                      Building
                    </span>
                    <span className="text-lg font-bold font-mono text-indigo-900">
                      KES {statementData?.totals.buildingFund.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Visual Proportion Breakdown Bar */}
                {statementData && statementData.totals.total > 0 && (
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Giving Allocation Distribution</span>
                      <span className="text-slate-500 font-mono text-[11px]">100% Accounted</span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-200 flex overflow-hidden">
                      <div
                        style={{
                          width: `${(statementData.totals.tithe / statementData.totals.total) * 100}%`,
                        }}
                        className="bg-amber-500 h-full"
                        title="Tithe"
                      />
                      <div
                        style={{
                          width: `${(statementData.totals.combinedOffering / statementData.totals.total) * 100}%`,
                        }}
                        className="bg-emerald-500 h-full"
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
                  <h4 className="text-sm font-bold text-slate-900">
                    Recorded Remittances
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Receipt Code</th>
                          <th className="py-2.5 px-3">Allocation Tag</th>
                          <th className="py-2.5 px-3 text-right">Amount (KES)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {statementData?.records.map((r) => (
                          <tr key={r.id} className="hover:bg-blue-50/40">
                            <td className="py-2.5 px-3 text-slate-600">
                              {new Date(r.timestamp).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                              {r.receiptNumber}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {r.accountReference}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-right font-bold text-blue-900">
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

      {/* Reusable Loading Modal */}
      <LoadingModal
        isOpen={isLoadingModalOpen}
        title={loadingTitle}
        subtitle={loadingSubtitle}
      />

      {/* Reusable Human Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        supportPhone={treasuryPhone}
        onRetry={modalRetryAction}
      />
    </main>
  );
}