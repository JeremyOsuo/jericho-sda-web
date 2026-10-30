"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Printer,
  Loader2,
  HelpCircle,
} from "lucide-react";
import ErrorModal from "./ErrorModal";

const TREASURY_API_URL = process.env.NEXT_PUBLIC_TREASURY_URL || "";

interface GivingRecord {
  id: string;
  receipt_number: string;
  sender_name?: string;
  phone_number?: string;
  amount: number;
  tithe: number;
  combined_offering: number;
  building_fund: number;
  welfare: number;
  camp_meeting: number;
  payment_method: string;
  timestamp: string;
}

export default function GivingVerification() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GivingRecord[] | null>(null);

  // Error Modal State
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setLoading(true);
    setResults(null);

    const isPhone = /^[0-9+]+$/.test(cleanQuery);
    const param = isPhone
      ? `phone=${encodeURIComponent(cleanQuery)}`
      : `receipt=${encodeURIComponent(cleanQuery)}`;

    try {
      const endpoint = TREASURY_API_URL
        ? `${TREASURY_API_URL}/api/receipts/verify?${param}`
        : `/api/receipts/verify?${param}`;

      const res = await fetch(endpoint);

      if (!res.ok) {
        throw new Error("Service response was not OK");
      }

      const json = await res.json();

      if (!json.verified || !json.records || json.records.length === 0) {
        setModalTitle("Record Pending Reconciliation");
        setModalMessage(
          `No verified record found for "${cleanQuery}". If you gave recently via M-Pesa or envelope, our church treasury reconciles records weekly on Sabbath. You can also chat directly with the treasury desk.`
        );
        setErrorModalOpen(true);
      } else {
        setResults(json.records);
      }
    } catch {
      setModalTitle("Service Updating");
      setModalMessage(
        "The church audit records system is undergoing routine synchronization. Please try again shortly or contact the treasury desk below for immediate verification."
      );
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-black tracking-tight text-slate-950">
          Verify Church Giving
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-serif">
          Check the official audit status of your M-Pesa tithes, combined offerings, or building contributions.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="M-Pesa Reference (e.g. QAB...) or Receipt No."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 bg-[#001f44] hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          ) : (
            "Verify"
          )}
        </button>
      </form>

      {/* Helpful Hint */}
      <div className="flex items-start gap-2 text-[11px] text-slate-500 font-mono bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
        <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <span>
          Tip: Enter your 10-character M-Pesa reference (e.g. <strong>QAB1234567</strong>) or your envelope receipt number.
        </span>
      </div>

      {/* Verified Results View */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{results.length} Verified Record(s) Found</span>
            </span>
            <button
              onClick={() => window.print()}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Statement</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            {results.map((item) => (
              <div key={item.id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-md inline-block">
                      {item.receipt_number}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1.5 font-mono">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      &bull; {item.payment_method}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">
                      Total Verified
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-slate-950">
                      KES{" "}
                      {Number(item.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 text-xs grid grid-cols-2 sm:grid-cols-3 gap-3 border border-slate-100">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Tithe</span>
                    <span className="font-semibold font-mono text-slate-900">
                      KES {Number(item.tithe).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">
                      Combined Offering
                    </span>
                    <span className="font-semibold font-mono text-slate-900">
                      KES {Number(item.combined_offering).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">
                      Building / Development
                    </span>
                    <span className="font-semibold font-mono text-slate-900">
                      KES {Number(item.building_fund).toLocaleString()}
                    </span>
                  </div>
                  {Number(item.welfare) > 0 && (
                    <div>
                      <span className="text-slate-500 text-[11px] block">Welfare</span>
                      <span className="font-semibold font-mono text-slate-900">
                        KES {Number(item.welfare).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {Number(item.camp_meeting) > 0 && (
                    <div>
                      <span className="text-slate-500 text-[11px] block">
                        Camp Meeting
                      </span>
                      <span className="font-semibold font-mono text-slate-900">
                        KES {Number(item.camp_meeting).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Human Error / Notice Card Modal */}
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        supportPhone="254700000000"
        onRetry={() => handleSearch()}
      />
    </div>
  );
}