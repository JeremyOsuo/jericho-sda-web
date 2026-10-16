import { NextResponse } from "next/server";
import { getAllRecords } from "@/lib/ledger";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get("pin");

    // Protect with church secretariat admin PIN (752922)
    if (pin !== "752922") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Retrieve records from Supabase / ledger store
    const records = await getAllRecords();

    // Compute key conference and local church metrics
    const totals = records.reduce(
      (acc, curr) => {
        acc.grossCollections += curr.amount;
        acc.titheCKC += curr.breakdown.tithe;
        acc.localBudget += curr.breakdown.combinedOffering;
        acc.buildingFund += curr.breakdown.buildingFund;
        acc.welfare += curr.breakdown.welfare;
        acc.campMeeting += curr.breakdown.campMeeting;
        acc.youth += curr.breakdown.youthMinistry;
        return acc;
      },
      {
        grossCollections: 0,
        titheCKC: 0,
        localBudget: 0,
        buildingFund: 0,
        welfare: 0,
        campMeeting: 0,
        youth: 0,
      }
    );

    return NextResponse.json({
      success: true,
      totals,
      recordsCount: records.length,
      records,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load treasury data" },
      { status: 500 }
    );
  }
}