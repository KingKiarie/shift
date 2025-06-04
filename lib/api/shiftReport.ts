import { ShiftReport } from "../types/shiftReport";
import { getToken } from "../token";

export async function fetchShiftReport(
  shiftID: string,
  companyCode: string,
  userID: string
): Promise<ShiftReport> {
  const token = getToken();

  const res = await fetch(
    `/api/proxy/shift/shiftreport/?shiftId=${shiftID}&companyCode=${companyCode}&userID=${userID}`,
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
