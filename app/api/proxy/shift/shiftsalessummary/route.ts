import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api/axios";
import { ShiftSalesSummary } from "@/lib/types/shiftSalesSummary";

export async function GET(req: NextRequest) {
  const companyCode = req.nextUrl.searchParams.get("companyCode");
  const userID = req.nextUrl.searchParams.get("userID");
  const shiftID = req.nextUrl.searchParams.get("shiftId");

  const authHeader = req.headers.get("authorization");
  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;
  if (!companyCode || !userID || !shiftID || !authHeader) {
    return NextResponse.json(
      { error: "Missing params or auth" },
      { status: 400 }
    );
  }
  try {
    const { data } = await apiClient.get<ShiftSalesSummary>(
      `${BACKEND_URL}/shift/shiftSalesSummary/${shiftID}/${companyCode}/${userID}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching shift sales summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch shift sales summary" },
      { status: error.response?.status || 500 }
    );
  }
}
