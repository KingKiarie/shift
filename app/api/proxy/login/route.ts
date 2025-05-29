import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch("http://102.130.119.149:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await apiRes.text(); 

    console.log("API Response Status:", apiRes.status);
    console.log("API Response Body:", text);

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: apiRes.status });
    } catch {
      return new NextResponse(text, {
        status: apiRes.status,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
