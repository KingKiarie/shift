import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api/axios";
import { PreviousShiftsResponse } from "@/lib/types/shift";

export async function GET(req: NextRequest) {
  const companyCode = req.nextUrl.searchParams.get("companyCode");
  const userID = req.nextUrl.searchParams.get("userID");

  const authHeader = req.headers.get("authorization");
  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;

  if (!companyCode || !userID || !authHeader) {
    return NextResponse.json(
      { error: "Missing params or auth" },
      { status: 400 }
    );
  }

  try {
    const { data } = await apiClient.get<PreviousShiftsResponse>(
      `${BACKEND_URL}/shift/previousShifts/${companyCode}/${userID}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching previous shifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch previous shifts" },
      { status: error.response?.status || 500 }
    );
  }
}
