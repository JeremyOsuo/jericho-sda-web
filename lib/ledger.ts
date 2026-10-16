// lib/ledger.ts

export interface GivingRecord {
  id: string;
  receiptNumber: string; // e.g. TJH8934KLP
  phoneNumber: string;   // normalized e.g. 254712345678
  amount: number;
  timestamp: string;     // ISO string
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

// In-memory array fallback (or connect to Supabase/Prisma/Postgres in prod)
declare global {
  var __jerichoLedger: GivingRecord[] | undefined;
  var __jerichoOtpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

if (!global.__jerichoLedger) {
  global.__jerichoLedger = [
    // Seed sample transactions for Jericho SDA demonstration
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

export const ledgerStore = global.__jerichoLedger;
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