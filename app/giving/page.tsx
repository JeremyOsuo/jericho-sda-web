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

export default function GivingPage() {
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dedicated Giving Breakdown categories
  const [givingItems, setGivingItems] = useState<GivingItem[]>([
    { id: "tithe", label: "Tithe (Holy to the Lord - 10%)", accountName: "Tithe", category: "Conference", amount: 0 },
    { id: "combined", label: "Combined Offering (Local Church Budget)", accountName: "Church Budget", category: "Local Church", amount: 0 },
    { id: "camp", label: "Camp Meeting Offering", accountName: "Camp Meeting", category: "Conference", amount: 0 },
    { id: "building", label: "Sanctuary Development / Building", accountName: "Building Fund", category: "Special Project", amount: 0 },
    { id: "welfare", label: "Dorcas & Community Welfare", accountName: "Welfare", category: "Local Church", amount: 0 },
    { id: "youth", label: "Adventist Youth & Pathfinders", accountName: "Youth Ministry", category: "Local Church", amount: 0 },
  ]);

  // Automatically calculate 10% tithe and suggested offerings on gross income change
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

  return (
    <main className="min-h-screen bg-slate-100/90 pb-36 relative z-10 selection:bg-amber-300 selection:text-[#001737]">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-br from-[#001129] via-[#001f49] to-[#002f6c] text-white pt-36 sm:pt-40 pb-24 sm:pb-28 px-4 sm:px-6 overflow-hidden border-b border-amber-400/20 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-amber-300/30 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <AdventistLogo className="w-4 h-4 text-amber-300" />
            <span>Stewardship Ministries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight drop-shadow-md">
            Faithful Giving &amp; Tithes
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            &ldquo;Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts.&rdquo;
            <span className="block text-amber-300 font-sans font-bold text-xs mt-1">
              — Malachi 3:10
            </span>
          </p>
        </div>
      </section>

      {/* 2. BODY CONTENT (FLOATING CONTAINER) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20 space-y-10">
        
        {/* M-PESA Paybill Info Banner */}
        <div className="bg-gradient-to-r from-[#001737] via-[#002f6c] to-[#001737] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-emerald-500 text-white font-mono text-[10px] font-black uppercase px-2.5 py-1 rounded">
              Verified Safaricom Paybill
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Lipa Na M-PESA Instructions
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-serif max-w-xl">
              Use Paybill <strong>752922</strong> for all remittances. In the account name, specify the breakdown (e.g., <em>Tithe/Offering/Camp</em>).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur shrink-0">
            <div className="text-center px-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block font-bold">
                Business No.
              </span>
              <span className="text-2xl font-black font-mono tracking-wider block text-white mt-0.5">
                752922
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard("752922", "paybill")}
              className="bg-[#c99700] hover:bg-[#b08400] active:scale-95 text-[#001737] font-black text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer shadow"
            >
              {copiedKey === "paybill" ? "Copied! ✓" : "Copy Paybill"}
            </button>
          </div>
        </div>

        {/* 2-Column Interface: Calculator & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Offering Calculator Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-[#002f6c]">
                Tithe &amp; Offerings Envelope
              </h3>
              <p className="text-xs text-slate-500 font-serif mt-1">
                Enter your gross earnings to calculate your biblical tithe (10%), then allocate offerings across ministries.
              </p>
            </div>

            {/* Quick Income Estimator */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Gross Monthly Earnings / Revenue (KES)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-mono font-bold text-slate-400">
                  KES
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 50,000"
                  value={grossIncome}
                  onChange={(e) => handleGrossChange(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-14 pr-4 py-2.5 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                />
              </div>
            </div>

            {/* Itemized Allocations */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Itemized Church Funds Breakdown:
              </span>

              {givingItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-serif">
                        {item.label}
                      </h4>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#002f6c] border border-blue-100 font-bold">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block font-mono mt-0.5">
                      Account tag: &ldquo;{item.accountName}&rdquo;
                    </span>
                  </div>

                  <div className="relative w-full sm:w-40 shrink-0">
                    <span className="absolute left-3 top-2 text-xs font-mono text-slate-400">
                      KES
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={item.amount || ""}
                      onChange={(e) =>
                        updateItemAmount(item.id, parseFloat(e.target.value) || 0)
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-3 py-1.5 text-xs font-mono font-bold text-right text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002f6c]"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Envelope Receipt & M-PESA Prompt */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#001737] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block font-bold">
                  Digital Envelope Summary
                </span>
                <h3 className="text-xl font-black font-serif text-white mt-1">
                  Total Remittance
                </h3>
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#c99700] mt-2">
                  KES {totalGiving.toLocaleString()}
                </div>
              </div>

              {/* Items Breakdown Review */}
              <div className="space-y-2 text-xs font-serif">
                {givingItems
                  .filter((item) => item.amount > 0)
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-blue-100">
                      <span>{item.accountName}</span>
                      <span className="font-mono font-bold text-white">
                        KES {item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}

                {totalGiving === 0 && (
                  <p className="text-slate-400 text-xs italic">
                    No amounts specified yet. Fill in figures in the calculator to view your envelope breakdown.
                  </p>
                )}
              </div>

              {/* Generated Account Field String for M-PESA */}
              {totalGiving > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                      Recommended Account Name Field:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          givingItems
                            .filter((i) => i.amount > 0)
                            .map((i) => `${i.accountName}:${i.amount}`)
                            .join(" "),
                          "accString"
                        )
                      }
                      className="text-[10px] text-amber-300 hover:text-white underline cursor-pointer"
                    >
                      {copiedKey === "accString" ? "Copied! ✓" : "Copy string"}
                    </button>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10 font-mono text-xs text-amber-200 break-all select-all">
                    {givingItems
                      .filter((i) => i.amount > 0)
                      .map((i) => `${i.accountName}:${i.amount}`)
                      .join(" ")}
                  </div>
                </div>
              )}

              {/* Step-by-step instructions */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-blue-200">
                <h5 className="font-bold text-white">How to complete on your phone:</h5>
                <ol className="list-decimal list-inside space-y-1 text-[11px] font-sans text-blue-200/90">
                  <li>Go to <strong>M-PESA</strong> &gt; <strong>Lipa na M-PESA</strong> &gt; <strong>Paybill</strong></li>
                  <li>Enter Business No: <strong className="text-white">752922</strong></li>
                  <li>Enter Account: <strong className="text-amber-300">Tithe / Offering / Your Name</strong></li>
                  <li>Enter Amount: <strong className="text-white">KES {totalGiving.toLocaleString()}</strong></li>
                  <li>Enter your M-PESA PIN and press Send</li>
                </ol>
              </div>
            </div>

            {/* Treasury Support Contact */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-3">
              <h4 className="text-sm font-bold font-serif text-[#002f6c]">
                Treasury &amp; Stewardship Inquiries
              </h4>
              <p className="text-xs text-slate-500 font-serif leading-relaxed">
                For tithe receipts, bank wire transfers, or gift pledges, please contact the Church Treasury directly.
              </p>
              <div className="text-xs text-slate-700 font-mono space-y-1">
                <div>Email: <strong>treasury@jerichosda.church</strong></div>
                <div>Office: <strong>Sabbaths after Divine Service</strong></div>
              </div>
              <div className="pt-2">
                <Link
                  href="/leadership"
                  className="text-xs font-bold text-[#002f6c] hover:underline"
                >
                  View Treasury Department Leaders →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}