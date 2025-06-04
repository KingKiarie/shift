import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";

export async function GET(
  req: NextRequest,
  context: { params: { shiftId: string; companyCode: string; userId: string } }
) {
  const { shiftId, companyCode, userId } = context.params;

  if (!shiftId || !companyCode || !userId) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `http://102.130.119.149:3000/shift/shiftSalesSummary/${shiftId}/${companyCode}/${userId}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        {
          message: `Upstream error: ${res.status} ${res.statusText}`,
          details: errorText,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch shift sales summary" },
      { status: 500 }
    );
  }
}
