import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const companyCode = searchParams.get("companyCode");
  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;

  if (!companyCode) {
    return NextResponse.json(
      { message: "Missing companyCode" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/user/getUsers/${companyCode}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
