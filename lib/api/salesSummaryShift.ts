import { ShiftSalesSummary } from "../types/shiftSalesSummary";
import { getToken } from "../token";

export async function fetchSalesSummaryShift(
  shiftID: string,
  companyCode: string,
  userID: string
): Promise<ShiftSalesSummary> {
  const token = getToken();

  const res = await fetch(
    `/api/proxy/shift/shiftsalessummary?shiftId=${shiftID}&companyCode=${companyCode}&userID=${userID}`,
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
