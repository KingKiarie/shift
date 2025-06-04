import { useQuery } from "@tanstack/react-query";
import { getToken } from "../token";
import { decodeJWT } from "../decodeJwt";
import { ShiftSalesSummary } from "../types/shift";
import { fetchSalesSummary } from "../api/shifts";

export const useSalesSummary = (shiftID: string) => {
  const token = getToken();
  const decoded = decodeJWT(token || undefined);
  const userID = decoded?.userCode;
  const companyCode = decoded?.companyCode;

  return useQuery<ShiftSalesSummary>({
    queryKey: ["salesSummary", shiftID, companyCode, userID, token],
    queryFn: () => fetchSalesSummary(shiftID, companyCode!, userID!, token!),
    enabled: !!shiftID && !!companyCode && !!userID && !!token,
  });
};
