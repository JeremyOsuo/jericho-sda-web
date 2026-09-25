import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.PLEDGE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing PLEDGE_SHEET_WEBHOOK_URL in environment");
      return NextResponse.json(
        { success: false, error: "Webhook URL not configured" },
        { status: 500 }
      );
    }

    // Google Apps Script processes text/plain without parser rejection
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      cache: "no-store",
    });

    // Google Apps Script redirect returns either 200 or 302
    if (!response.ok && response.status !== 302) {
      const errText = await response.text();
      console.error(`Google Script failed with status ${response.status}:`, errText);
      return NextResponse.json(
        { success: false, error: `Google Script error: ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Pledge recorded successfully" });
  } catch (error) {
    console.error("Pledge submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}