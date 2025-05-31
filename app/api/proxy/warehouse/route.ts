import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const companyCode = searchParams.get("companyCode");

  if (!companyCode) {
    return NextResponse.json(
      { error: "Missing companyCode in query parameters" },
      { status: 400 }
    );
  }

  try {
    const backendRes = await fetch(
      `http://102.130.119.149:3000/warehouse/${companyCode}`
    );

    const text = await backendRes.text();

    console.log("Warehouse API Status:", backendRes.status);
    console.log("Warehouse API Body:", text);

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: backendRes.status });
    } catch {
      return new NextResponse(text, {
        status: backendRes.status,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch warehouse data" },
      { status: 500 }
    );
  }
}
