import { NextResponse } from "next/server";
import { saveGivingRecord, GivingRecord } from "@/lib/ledger";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = data?.Body?.stkCallback;

    if (!result) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid payload" });
    }

    const { ResultCode, ResultDesc, CallbackMetadata } = result;

    // ResultCode 0 means transaction was successful
    if (ResultCode === 0 && CallbackMetadata?.Item) {
      const items = CallbackMetadata.Item;

      const getVal = (name: string) =>
        items.find((i: { Name: string; Value?: string | number }) => i.Name === name)?.Value;

      const amount = Number(getVal("Amount") || 0);
      const receiptNumber = String(getVal("MpesaReceiptNumber") || `REC_${Date.now()}`);
      const rawPhone = String(getVal("PhoneNumber") || "");

      // Standardize phone format (e.g. 254712345678)
      const phone = rawPhone.startsWith("+") ? rawPhone.slice(1) : rawPhone;

      // Default proportional allocation if not specified in STK metadata:
      // 70% Tithe, 20% Combined Offering, 10% Local Church Building
      const tithe = Math.round(amount * 0.7);
      const combined = Math.round(amount * 0.2);
      const building = amount - tithe - combined;

      const record: GivingRecord = {
        id: `tx_${Date.now()}`,
        receiptNumber,
        phoneNumber: phone,
        amount,
        timestamp: new Date().toISOString(),
        breakdown: {
          tithe,
          combinedOffering: combined,
          campMeeting: 0,
          buildingFund: building,
          welfare: 0,
          youthMinistry: 0,
        },
        accountReference: `Tithe:${tithe} Budget:${combined} Building:${building}`,
        status: "Completed",
      };

      // Persist permanently to Supabase (with in-memory fallback)
      await saveGivingRecord(record);

      console.log(`[DARAJA CALLBACK SUCCESS] Receipt: ${receiptNumber} | Phone: ${phone} | Amount: KES ${amount}`);
    } else {
      console.warn(`[DARAJA CALLBACK FAILED/CANCELLED] Code: ${ResultCode} | Desc: ${ResultDesc}`);
    }

    // Always respond with Safaricom's expected receipt acceptance envelope
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback processing error:", err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with error" });
  }
}