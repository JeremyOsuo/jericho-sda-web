"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, AlertCircle, Printer, Loader2 } from "lucide-react";

// Point this to your Treasury Portal URL (e.g., https://treasury.jerichosda.org or http://localhost:3000 during local testing)
const TREASURY_API_URL = process.env.NEXT_PUBLIC_TREASURY_URL || "http://localhost:3000";

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
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GivingRecord[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const isPhone = /^[0-9+]+$/.test(query.trim());
    const param = isPhone ? `phone=${encodeURIComponent(query.trim())}` : `receipt=${encodeURIComponent(query.trim())}`;

    try {
      const res = await fetch(`${TREASURY_API_URL}/api/receipts/verify?${param}`);
      const json = await res.json();

      if (!res.ok || !json.verified) {
        setError(json.message || "No verified record found. Ensure the receipt code or phone number matches church records.");
      } else {
        setResults(json.records);
      }
    } catch (err) {
      setError("Unable to connect to Treasury verification service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Verify Your Church Giving</h2>
        <p className="text-sm text-gray-500">
          Check the official audit status of your M-Pesa giving or Sabbath envelope contribution.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Receipt Reference (e.g., REC-...) or Phone (e.g., 0712345678)"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg flex items-center gap-2 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {results.length} Verified Record(s) Found
            </span>
            <button
              onClick={() => window.print()}
              className="text-xs flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print Statement
            </button>
          </div>

          <div className="divide-y border rounded-xl overflow-hidden bg-white shadow-sm">
            {results.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {item.receipt_number}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} &bull; {item.payment_method}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Total Given</span>
                    <span className="text-base font-bold font-mono text-gray-900">
                      KES {Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-xs grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-gray-500 block">Tithe</span>
                    <span className="font-semibold font-mono">KES {Number(item.tithe).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Combined Offering</span>
                    <span className="font-semibold font-mono">KES {Number(item.combined_offering).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Building / Dev</span>
                    <span className="font-semibold font-mono">KES {Number(item.building_fund).toLocaleString()}</span>
                  </div>
                  {Number(item.welfare) > 0 && (
                    <div>
                      <span className="text-gray-500 block">Welfare</span>
                      <span className="font-semibold font-mono">KES {Number(item.welfare).toLocaleString()}</span>
                    </div>
                  )}
                  {Number(item.camp_meeting) > 0 && (
                    <div>
                      <span className="text-gray-500 block">Camp Meeting</span>
                      <span className="font-semibold font-mono">KES {Number(item.camp_meeting).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}