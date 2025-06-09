import { NextRequest, NextResponse } from "next/server";
import { User, GetUsersResponse } from "@/lib/types/user";

export async function GET(req: NextRequest) {
  const companyCode = req.nextUrl.searchParams.get("companyCode");
  const shiftID = req.nextUrl.searchParams.get("shiftId");

  if (!companyCode) {
    return NextResponse.json(
      { message: "Missing companyCode parameter" },
      { status: 400 }
    );
  }

  const BACKEND_URL = process.env.NEXT_API_BACKEND_URL;
  const authHeader = req.headers.get("authorization");

  if (!BACKEND_URL) {
    return NextResponse.json(
      { message: "Backend URL not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/user/getUsers/${companyCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: authHeader || "",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
