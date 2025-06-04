import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch("http://102.130.119.149:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = apiRes.headers.get("content-type");
    const isJSON = contentType?.includes("application/json");

    const data = isJSON ? await apiRes.json() : await apiRes.text();

    return new NextResponse(isJSON ? JSON.stringify(data) : data, {
      status: apiRes.status,
      headers: {
        "Content-Type": isJSON ? "application/json" : "text/plain",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
