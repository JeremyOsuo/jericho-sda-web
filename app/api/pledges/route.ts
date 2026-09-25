import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.PLEDGE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Webhook URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status: ${response.status}`);
    }

    return NextResponse.json({ success: true, message: "Pledge saved" });
  } catch (error) {
    console.error("Pledge submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}