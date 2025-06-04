import { PreviousShiftsResponse } from "@/lib/types/shift";
import { getToken } from "../token";

export async function fetchPreviousShifts(
  companyCode: string,
  userID: string
): Promise<PreviousShiftsResponse> {
  const token = getToken();

  const res = await fetch(
    `/api/proxy/previous?companyCode=${companyCode}&userID=${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch previous shifts");
  }

  return res.json();
}
