"use client";

import { useState } from "react";
import Link from "next/link";
import AdventistLogo from "../components/AdventistLogo";
import AuthGateCard from "../components/AuthGateCard";
import { useAuth } from "@/context/AuthContext";
import { estates, EstateCell } from "@/data/estates";

export default function MemberPortalPage() {
  const { user, isLoading, updateAffiliatedEstate } = useAuth();

  // Tab State
  const [activeTab, setActiveTab] = useState<"cells" | "giving" | "hymnal">("cells");

  // Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Cell UI State
  const [isChangingCell, setIsChangingCell] = useState(false);
  const [showOtherEstates, setShowOtherEstates] = useState(false);
  const [cellToast, setCellToast] = useState<string | null>(null);

  // Stewardship Calculator State
  const [income, setIncome] = useState<string>("");
  const [offeringRatio, setOfferingRatio] = useState<number>(10);
  const [campMeetingFund, setCampMeetingFund] = useState<string>("500");
  const [welfareFund, setWelfareFund] = useState<string>("300");
  const [copiedPaybill, setCopiedPaybill] = useState(false);

  // Hymnal State
  const [hymnQuery, setHymnQuery] = useState("");
  const [hymnType, setHymnType] = useState<"sdah" | "nzk">("sdah");

  if (isLoading) return null;

  if (!user) {
    return (
      <AuthGateCard
        title="Member Fellowship Portal"
        message="This secure sanctuary portal is reserved for members of Jericho SDA Church. Sign in to view your prayer cell, calculate stewardship, and access church resources."
        requiredRole="Church Member"
      />
    );
  }

  // Determine member's affiliated cell
  const userEstateName = user.estate || "Uhuru Estate Prayer Fellowship";
  const myCell =
    estates.find(
      (e) =>
        e.name.toLowerCase().includes(userEstateName.toLowerCase()) ||
        e.area.toLowerCase().includes(userEstateName.toLowerCase())
    ) || estates[0];

  const handleSelectCell = (cell: EstateCell) => {
    updateAffiliatedEstate(cell.name);
    setIsChangingCell(false);
    setCellToast(`Successfully affiliated with ${cell.name}!`);
    setTimeout(() => setCellToast(null), 3500);
  };

  // Calculations for Stewardship Slip
  const numericIncome = parseFloat(income) || 0;
  const titheAmount = Math.round(numericIncome * 0.1);
  const combinedOffering = Math.round(numericIncome * (offeringRatio / 100));
  const numericCamp = parseFloat(campMeetingFund) || 0;
  const numericWelfare = parseFloat(welfareFund) || 0;
  const totalSacredReturn = titheAmount + combinedOffering + numericCamp + numericWelfare;

  const copyPaybillInfo = () => {
    navigator.clipboard.writeText("752922");
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2500);
  };

  const hymnSamples = [
    { no: 590, sdah: "Trust and Obey", nzk: "Mwamini Na Kutii", key: "Theme 2026" },
    { no: 100, sdah: "Great Is Thy Faithfulness", nzk: "Wewe Ni Mwaminifu", key: "Adoration" },
    { no: 334, sdah: "Come, Thou Fount of Every Blessing", nzk: "Mto Wa Baraka", key: "Praise" },
    { no: 524, sdah: "Tis So Sweet to Trust in Jesus", nzk: "Ni Furaha Kumwamini Yesu", key: "Faith" },
    { no: 614, sdah: "Sound the Battle Cry", nzk: "Pigeni Parapanda", key: "Mission" },
    { no: 1, sdah: "Praise to the Lord, the Almighty", nzk: "Msifuni Bwana", key: "Worship" },
  ];

  const filteredHymns = hymnSamples.filter((h) => {
    const q = hymnQuery.toLowerCase();
    return (
      h.no.toString().includes(q) ||
      h.sdah.toLowerCase().includes(q) ||
      h.nzk.toLowerCase().includes(q) ||
      h.key.toLowerCase().includes(q)
    );
  });

  return (
    <main className="bg-slate-100 min-h-screen pb-28 text-slate-800">
      {/* 1. PORTAL HERO HEADER */}
      <header className="bg-gradient-to-br from-[#001737] via-[#00224f] to-[#001026] text-white pt-32 pb-14 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              <AdventistLogo className="w-4 h-4 text-amber-300" />
              <span>Jericho SDA • Member Fellowship &amp; Care</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight">
                Welcome, {user.name}
              </h1>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-white/20 transition cursor-pointer"
                title="View Full Profile"
              >
                👤 View Profile
              </button>
            </div>
            <p className="text-xs sm:text-sm text-blue-200 font-serif">
              Affiliated with <strong className="text-white underline">{myCell.name}</strong> • {myCell.meetingDay}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            {/* CLICKABLE PROFILE BADGE */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-3 px-4 backdrop-blur-sm transition text-left cursor-pointer group"
            >
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block font-bold group-hover:underline">
                My Home Cell (View Card)
              </span>
              <span className="text-xs font-black font-mono text-white truncate max-w-[160px] block">
                {myCell.area}
              </span>
            </button>
            <Link
              href="/care"
              className="bg-amber-400 hover:bg-amber-300 text-[#001737] font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-2xl transition shadow hover:scale-105"
            >
              Pastoral Care Desk →
            </Link>
          </div>
        </div>
      </header>

      {/* FULL MEMBER PROFILE MODAL */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-mono text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="w-16 h-16 rounded-full bg-[#001737] text-amber-300 font-mono font-black text-2xl flex items-center justify-center shadow-md">
                {user.avatarInitials}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
                  Church Member Profile
                </span>
                <h3 className="text-xl font-black font-serif text-slate-900">
                  {user.name}
                </h3>
                <p className="text-xs text-slate-500 font-serif">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3 font-serif text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                  Assigned Prayer Cell:
                </span>
                <strong className="text-sm font-bold text-[#001737] block">
                  {myCell.name}
                </strong>
                <p className="text-[11px] text-slate-600">
                  Meeting: {myCell.meetingDay} • Host: {myCell.currentHost}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Presiding Elder
                  </span>
                  <span className="font-bold text-slate-800 text-xs block pt-0.5">
                    {myCell.elder}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Cell Fellowship
                  </span>
                  <span className="font-bold text-slate-800 text-xs block pt-0.5">
                    {myCell.memberCount} Members
                  </span>
                </div>
              </div>

              {user.department && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Active Ministry
                  </span>
                  <span className="font-bold text-slate-800 text-xs block pt-0.5">
                    {user.department}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setIsChangingCell(true);
                  setActiveTab("cells");
                }}
                className="w-full bg-[#002f6c] hover:bg-[#00224f] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition cursor-pointer"
              >
                Change My Prayer Cell
              </button>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST ALERT */}
      {cellToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#001737] text-amber-300 border border-amber-300/40 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold font-mono animate-in fade-in slide-in-from-top-4">
          ✓ {cellToast}
        </div>
      )}

      {/* 2. NAVIGATION TABS */}
      <section className="max-w-6xl mx-auto px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-md flex items-center gap-2 overflow-x-auto">
          {[
            { id: "cells", label: "📍 My Estate Prayer Cell", badge: myCell.area },
            { id: "giving", label: "💰 Sacred Stewardship Slip", badge: "Paybill 752922" },
            { id: "hymnal", label: "🎵 Hymnal & Songs", badge: "SDAH / NZK" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#002f6c] text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-[#001737]"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. TAB 1: MY ESTATE PRAYER CELL */}
      {activeTab === "cells" && (
        <section className="max-w-6xl mx-auto px-6 pt-8 space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#002f6c]/20 shadow-lg space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-[#001737] font-black text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md">
                    My Registered Cell
                  </span>
                  <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Midweek Family
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#001737]">
                  {myCell.name}
                </h2>
                <p className="text-xs text-slate-500 font-serif">
                  Area: <strong>{myCell.area}</strong> • Standard Meeting: <strong>{myCell.meetingDay}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsChangingCell(!isChangingCell)}
                className="self-start sm:self-center bg-slate-100 hover:bg-slate-200 text-[#002f6c] text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition border border-slate-200 cursor-pointer"
              >
                {isChangingCell ? "✕ Close Selector" : "⇄ Switch My Cell"}
              </button>
            </div>

            {isChangingCell && (
              <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200/80 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase font-mono text-[#002f6c]">
                    Select Your New Neighborhood Cell:
                  </h4>
                  <span className="text-[10px] text-slate-500 font-serif">
                    Updates your affiliation immediately
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {estates.map((cell) => (
                    <button
                      key={cell.id}
                      type="button"
                      onClick={() => handleSelectCell(cell)}
                      className={`p-3 rounded-xl text-left border text-xs transition cursor-pointer flex flex-col justify-between ${
                        myCell.id === cell.id
                          ? "bg-[#002f6c] text-white border-[#002f6c] shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <span className="font-bold block truncate">{cell.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">{cell.area}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Fellowship Size
                </span>
                <div className="text-2xl font-black font-mono text-[#002f6c]">
                  {myCell.memberCount} Members
                </div>
                <p className="text-[11px] text-slate-500 font-serif">
                  Registered families in this prayer zone
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Presiding Elder in Charge
                </span>
                <div className="text-sm font-bold text-slate-900 pt-1">
                  {myCell.elder}
                </div>
                <a
                  href={`tel:${myCell.contact}`}
                  className="text-xs font-mono font-bold text-[#002f6c] hover:underline block"
                >
                  📞 {myCell.contact}
                </a>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  This Week&apos;s Host &amp; Venue
                </span>
                <div className="text-xs font-bold text-slate-900 pt-1">
                  🏡 {myCell.currentHost}
                </div>
                <p className="text-[11px] text-slate-500 font-serif truncate">
                  {myCell.venue}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-[#b08400] font-bold text-xs uppercase font-mono">
                <span>📖</span>
                <span>Current Midweek Lesson Reading</span>
              </div>
              <p className="text-sm font-serif font-bold text-slate-900">
                &ldquo;{myCell.studyTopic}&rdquo;
              </p>
              <p className="text-xs text-slate-600 font-serif">
                Song service starts at 06:00 PM prompt. Bring your Bible and SDA Hymnal / Nyimbo za Kristo.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black font-serif text-slate-900">
                  Visiting Another Part of Eastlands?
                </h3>
                <p className="text-xs text-slate-500 font-serif">
                  Browse meeting venues across all 10 estate prayer cells for your family or friends.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowOtherEstates(!showOtherEstates)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-xl transition border border-slate-200 cursor-pointer"
              >
                {showOtherEstates ? "Hide Directory ▲" : "Browse All 10 Cells ▼"}
              </button>
            </div>

            {showOtherEstates && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 animate-in fade-in duration-200 border-t border-slate-100">
                {estates.map((cell) => (
                  <div
                    key={cell.id}
                    className={`rounded-2xl p-4 border transition flex flex-col justify-between space-y-3 ${
                      cell.id === myCell.id
                        ? "bg-amber-50/70 border-amber-300"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase bg-white px-2 py-0.5 rounded border border-slate-200">
                          {cell.area}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          {cell.memberCount} members
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 font-serif pt-1">
                        {cell.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 font-serif line-clamp-1">
                        Venue: {cell.venue}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{cell.elder}</span>
                      <a
                        href={`tel:${cell.contact}`}
                        className="font-mono font-bold text-[#002f6c] hover:underline"
                      >
                        {cell.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. TAB 2: STEWARDSHIP SLIP */}
      {activeTab === "giving" && (
        <section className="max-w-6xl mx-auto px-6 pt-8 space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
                  Malachi 3:10 Calculator
                </span>
                <h2 className="text-xl font-black font-serif text-slate-900 mt-1">
                  Stewardship Breakdown Calculator
                </h2>
                <p className="text-xs text-slate-500 font-serif">
                  Calculate and verify your returns before remitting through M-PESA Paybill.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Gross Income / Blessings (KES)
                  </label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter monthly income (e.g. 50000)"
                    className="w-full text-sm font-mono font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50 text-slate-900"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      Combined Budget Offering Percentage
                    </label>
                    <span className="text-xs font-mono font-black text-[#002f6c]">
                      {offeringRatio}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={20}
                    step={1}
                    value={offeringRatio}
                    onChange={(e) => setOfferingRatio(parseInt(e.target.value, 10))}
                    className="w-full accent-[#002f6c] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>5% (Free will)</span>
                    <span>10% (Biblical Standard)</span>
                    <span>20% (Sacrificial)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Camp Meeting (KES)
                    </label>
                    <input
                      type="number"
                      value={campMeetingFund}
                      onChange={(e) => setCampMeetingFund(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Welfare &amp; Dorcas (KES)
                    </label>
                    <input
                      type="number"
                      value={welfareFund}
                      onChange={(e) => setWelfareFund(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-900 uppercase">
                    Paybill: <strong>752922</strong>
                  </span>
                  <button
                    type="button"
                    onClick={copyPaybillInfo}
                    className="text-[10px] font-mono uppercase tracking-wider font-black bg-[#001737] text-white px-3 py-1 rounded-lg hover:bg-[#002f6c] transition cursor-pointer"
                  >
                    {copiedPaybill ? "✓ Copied!" : "Copy Number"}
                  </button>
                </div>
                <p className="text-[11px] text-amber-800 font-serif leading-relaxed">
                  Account Name: <strong>Your Name or Envelope Number</strong> (e.g. <em>{user.name.split(" ")[0]} - Tithe</em>).
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 border-dashed shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <AdventistLogo className="w-5 h-5 text-[#001737]" />
                  <span className="text-xs font-mono uppercase font-black tracking-widest text-[#001737]">
                    Jericho SDA Church Tithe Slip
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                  Digital Record
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Member:</span>
                  <strong className="text-slate-900">{user.name}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Sacred Tithe (10% to Conference):</span>
                  <strong className="text-[#002f6c] font-black">KES {titheAmount.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Combined Church Budget ({offeringRatio}%):</span>
                  <strong className="text-slate-800 font-bold">KES {combinedOffering.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Camp Meeting Fund:</span>
                  <span className="text-slate-700">KES {numericCamp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Local Welfare &amp; Dorcas:</span>
                  <span className="text-slate-700">KES {numericWelfare.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-2.5 bg-slate-50 px-3 rounded-xl border border-slate-200 mt-2">
                  <span className="text-xs font-black uppercase text-slate-900">Total Return:</span>
                  <span className="text-lg font-black text-amber-700">
                    KES {totalSacredReturn.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full bg-[#001737] hover:bg-[#002f6c] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🖨️ Print / Save Digital Slip</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. TAB 3: HYMNAL FINDER */}
      {activeTab === "hymnal" && (
        <section className="max-w-4xl mx-auto px-6 pt-8 space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#b08400] font-bold block">
                Praise &amp; Worship Companion
              </span>
              <h2 className="text-xl font-black font-serif text-slate-900 mt-1">
                SDA Hymnal &amp; Nyimbo za Kristo Finder
              </h2>
              <p className="text-xs text-slate-500 font-serif">
                Quickly locate Sabbath songs by hymn number, English title, or Swahili title.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={hymnQuery}
                onChange={(e) => setHymnQuery(e.target.value)}
                placeholder="Search by number (e.g. 590) or title (Trust and Obey / Mwamini)..."
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002f6c] bg-slate-50"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHymnType("sdah")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    hymnType === "sdah"
                      ? "bg-[#002f6c] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  SDA Hymnal
                </button>
                <button
                  type="button"
                  onClick={() => setHymnType("nzk")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    hymnType === "nzk"
                      ? "bg-[#002f6c] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Nyimbo za Kristo
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredHymns.length > 0 ? (
                filteredHymns.map((hymn) => (
                  <div
                    key={hymn.no}
                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-mono font-black text-xs flex items-center justify-center">
                        #{hymn.no}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">
                          {hymnType === "sdah" ? hymn.sdah : hymn.nzk}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-serif">
                          {hymnType === "sdah" ? `NZK: ${hymn.nzk}` : `SDAH: ${hymn.sdah}`} • {hymn.key}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-[#002f6c] font-bold">
                      Sabbath Song
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 font-mono">
                  No hymn matching &ldquo;{hymnQuery}&rdquo; in demo set.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. FOOTER BACK LINK */}
      <section className="max-w-6xl mx-auto px-6 pt-12 text-center">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-wider text-[#002f6c] hover:underline"
        >
          ← Return to Main Sanctuary Website
        </Link>
      </section>
    </main>
  );
}