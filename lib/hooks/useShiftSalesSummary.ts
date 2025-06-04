import { useQuery } from "@tanstack/react-query";
import { fetchSalesSummaryShift } from "../api/salesSummaryShift";

export const useSalesSummary = (
  shiftID: string,
  companyCode: string | null,
  userID: string | null
) => {
  return useQuery({
    queryKey: ["salesSummary", shiftID, companyCode, userID],
    queryFn: () => fetchSalesSummaryShift(shiftID, companyCode!, userID!),
    enabled: !!shiftID && !!companyCode && !!userID,
  });
};
