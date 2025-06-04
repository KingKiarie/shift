import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeader

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { shiftId: string; companyCode: string; userId: string } }
) {
  const { shiftId, companyCode, userId } = params;
  const token = getTokenFromHeader(req);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = `http://102.130.119.149:3000/shift/shiftReport/${shiftId}/${companyCode}/${userId}`;

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
