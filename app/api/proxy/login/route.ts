import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;

    const apiRes = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = apiRes.headers.get("content-type");
    const isJSON = contentType?.includes("application/json");

    if (!apiRes.ok) {
      const errorData = isJSON ? await apiRes.json() : await apiRes.text();
      return NextResponse.json(
        { error: errorData.message || "Authentication failed" },
        { status: apiRes.status }
      );
    }

    const data = isJSON ? await apiRes.json() : await apiRes.text();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
