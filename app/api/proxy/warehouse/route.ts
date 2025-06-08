import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const companyCode = searchParams.get("companyCode");
  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;

  if (!companyCode) {
    return NextResponse.json(
      { message: "Missing companyCode in query parameters" },
      { status: 400 }
    );
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/warehouse/${companyCode}`);

    const contentType = backendRes.headers.get("content-type");
    const isJSON = contentType?.includes("application/json");

    const data = isJSON ? await backendRes.json() : await backendRes.text();

    return new NextResponse(isJSON ? JSON.stringify(data) : data, {
      status: backendRes.status,
      headers: {
        "Content-Type": isJSON ? "application/json" : "text/plain",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Failed to fetch warehouse data" },
      { status: 500 }
    );
  }
}
