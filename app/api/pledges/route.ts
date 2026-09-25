import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.PLEDGE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Missing PLEDGE_SHEET_WEBHOOK_URL");
      return NextResponse.json(
        { success: false, error: "Webhook not configured" },
        { status: 500 }
      );
    }

    // Google Apps Script requires text/plain and following redirects
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      redirect: "follow",
      cache: "no-store",
    });

    return NextResponse.json({ success: true, message: "Pledge saved" });
  } catch (error) {
    console.error("Pledge submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}