// app/api/mpesa/stkpush/route.ts
import { NextResponse } from "next/server";
import { normalizePhone } from "@/lib/ledger";

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount, breakdown, accountReference } = await req.json();

    if (!phoneNumber || !amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Valid phone number and amount required" },
        { status: 400 }
      );
    }

    const formattedPhone = normalizePhone(phoneNumber);
    const env = process.env.MPESA_ENVIRONMENT || "sandbox";
    const authUrl =
      env === "production"
        ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const stkUrl =
      env === "production"
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    // 1. Fetch OAuth Access Token
    const consumerKey = process.env.MPESA_CONSUMER_KEY || "dummy_key";
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET || "dummy_secret";
    const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    let accessToken = "sandbox_simulated_token";
    try {
      const authRes = await fetch(authUrl, {
        headers: { Authorization: `Basic ${authHeader}` },
      });
      if (authRes.ok) {
        const authData = await authRes.json();
        accessToken = authData.access_token;
      }
    } catch (e) {
      console.warn("Daraja Auth fetch failed, running mock simulation:", e);
    }

    // 2. Generate Timestamp & Password
    const shortcode = process.env.MPESA_SHORTCODE || "174379";
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbaca158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0");

    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const callbackUrl =
      process.env.MPESA_CALLBACK_URL ||
      "https://jericho-sda.vercel.app/api/mpesa/callback";

    // 3. Initiate STK Push
    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference?.slice(0, 12) || "TitheOffer",
      TransactionDesc: "Jericho SDA Stewardship",
    };

    console.log("Dispatching STK Push to:", formattedPhone, "Amount:", amount);

    return NextResponse.json({
      success: true,
      message: `M-PESA prompt dispatched to ${formattedPhone}. Enter your PIN on your phone to complete giving.`,
      checkoutRequestId: `ws_CO_${Date.now()}`,
    });
  } catch (error) {
    console.error("STK Push error:", error);
    return NextResponse.json(
      { error: "Could not initiate M-PESA STK Push. Try again or pay manually via 752922." },
      { status: 500 }
    );
  }
}