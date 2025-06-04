import { useQuery } from "@tanstack/react-query";
import { fetchShiftReport } from "../api/shifts";

export const useShiftReport = (
  shiftID: string,
  companyCode: string,
  userID: string
) => {
  return useQuery({
    queryKey: ["shiftReport", shiftID, companyCode, userID],
    queryFn: () => fetchShiftReport(shiftID, companyCode, userID),
  });
};
