import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const companyCode = searchParams.get("companyCode");

  if (!companyCode) {
    return NextResponse.json({ message: "Missing companyCode" }, { status: 400 });
  }

  try {
    const res = await fetch(`http://102.130.119.149:3000/user/getUsers/${companyCode}`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
