import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/lib/token";

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { shiftId: string; companyCode: string; userId: string } }
) {
  const { shiftId, companyCode, userId } = params;
  const token = getToken();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;

  const url = `${BACKEND_URL}/shift/shiftReport/${shiftId}/${companyCode}/${userId}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("[SHIFT REPORT ERROR]", err);
    return NextResponse.json(
      { error: "Failed to fetch shift report" },
      { status: 500 }
    );
  }
}
