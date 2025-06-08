import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api/axios";
import { ShiftReport } from "@/lib/types/shiftReport";

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
    const { data } = await apiClient.get<ShiftReport>(
      `${BACKEND_URL}/shift/shiftReport/${shiftID}/${companyCode}/${userID}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching shift Report:", error);
    return NextResponse.json(
      { error: "Failed to fetch shift report" },
      { status: error.response?.status || 500 }
    );
  }
}
