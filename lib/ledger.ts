// lib/ledger.ts
import { createClient } from "@supabase/supabase-js";

export interface GivingRecord {
  id: string;
  receiptNumber: string;
  phoneNumber: string; // e.g. 254712345678
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
  status: "Completed" | "Pending" | "Failed";
}

// In-memory fallbacks for offline testing & OTP tracking
declare global {
  var __jerichoLedger: GivingRecord[] | undefined;
  var __jerichoOtpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

if (!global.__jerichoLedger) {
  global.__jerichoLedger = [
    {
      id: "seed-1",
      receiptNumber: "TK9182JK10",
      phoneNumber: "254712345678",
      amount: 5000,
      timestamp: "2026-10-10T09:45:00.000Z",
      breakdown: {
        tithe: 3500,
        combinedOffering: 1000,
        campMeeting: 0,
        buildingFund: 500,
        welfare: 0,
        youthMinistry: 0,
      },
      accountReference: "Tithe:3500 Combined:1000 Building:500",
      status: "Completed",
    },
    {
      id: "seed-2",
      receiptNumber: "TK9248MM41",
      phoneNumber: "254712345678",
      amount: 2500,
      timestamp: "2026-10-03T10:15:00.000Z",
      breakdown: {
        tithe: 2000,
        combinedOffering: 500,
        campMeeting: 0,
        buildingFund: 0,
        welfare: 0,
        youthMinistry: 0,
      },
      accountReference: "Tithe:2000 Combined:500",
      status: "Completed",
    },
  ];
}

if (!global.__jerichoOtpStore) {
  global.__jerichoOtpStore = new Map();
}

export const otpStore = global.__jerichoOtpStore;

export function normalizePhone(raw: string): string {
  let cleaned = raw.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.slice(1);
  } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
    cleaned = "254" + cleaned;
  }
  return cleaned;
}

// Supabase client instance (server-side only)
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.startsWith("https://your-")) return null;
  return createClient(url, key);
}

// 1. Save Transaction to DB
export async function saveGivingRecord(record: GivingRecord): Promise<void> {
  // Always update local memory store
  global.__jerichoLedger!.unshift(record);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("giving_records").insert([
        {
          id: record.id,
          receipt_number: record.receiptNumber,
          phone_number: record.phoneNumber,
          amount: record.amount,
          timestamp: record.timestamp,
          tithe: record.breakdown.tithe,
          combined_offering: record.breakdown.combinedOffering,
          camp_meeting: record.breakdown.campMeeting,
          building_fund: record.breakdown.buildingFund,
          welfare: record.breakdown.welfare,
          youth_ministry: record.breakdown.youthMinistry,
          account_reference: record.accountReference,
          status: record.status,
        },
      ]);
      if (error) console.error("Supabase insert error:", error);
    } catch (e) {
      console.error("Database connection failure:", e);
    }
  }
}

// 2. Fetch Records by Member Phone
export async function getMemberRecords(phoneNumber: string): Promise<GivingRecord[]> {
  const phone = normalizePhone(phoneNumber);
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("giving_records")
        .select("*")
        .eq("phone_number", phone)
        .order("timestamp", { ascending: false });

      // Return Supabase data only if matching records were found
      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          receiptNumber: r.receipt_number,
          phoneNumber: r.phone_number,
          amount: Number(r.amount),
          timestamp: r.timestamp,
          breakdown: {
            tithe: Number(r.tithe || 0),
            combinedOffering: Number(r.combined_offering || 0),
            campMeeting: Number(r.camp_meeting || 0),
            buildingFund: Number(r.building_fund || 0),
            welfare: Number(r.welfare || 0),
            youthMinistry: Number(r.youth_ministry || 0),
          },
          accountReference: r.account_reference || "",
          status: r.status,
        }));
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to local memory:", e);
    }
  }

  // Fallback to local memory seed records
  return (global.__jerichoLedger || []).filter((r) => r.phoneNumber === phone);
}

// 3. Fetch All Records for Secretariat Treasury
export async function getAllRecords(): Promise<GivingRecord[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("giving_records")
        .select("*")
        .order("timestamp", { ascending: false });

      // Return Supabase data only if records were found
      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          receiptNumber: r.receipt_number,
          phoneNumber: r.phone_number,
          amount: Number(r.amount),
          timestamp: r.timestamp,
          breakdown: {
            tithe: Number(r.tithe || 0),
            combinedOffering: Number(r.combined_offering || 0),
            campMeeting: Number(r.camp_meeting || 0),
            buildingFund: Number(r.building_fund || 0),
            welfare: Number(r.welfare || 0),
            youthMinistry: Number(r.youth_ministry || 0),
          },
          accountReference: r.account_reference || "",
          status: r.status,
        }));
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to local memory:", e);
    }
  }

  // Fallback to local memory seed records
  return global.__jerichoLedger || [];
}