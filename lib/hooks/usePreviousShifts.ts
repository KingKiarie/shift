import { useQuery } from "@tanstack/react-query";
import { fetchPreviousShifts } from "../api/previousShifts";

export function usePreviousShifts(companyCode: string, userID: string) {
  return useQuery({
    queryKey: ["previousShifts", companyCode, userID],
    queryFn: () => fetchPreviousShifts(companyCode, userID),
  });
}
