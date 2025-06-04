import { useQuery } from "@tanstack/react-query";
import { fetchPreviousShifts } from "../api/shifts";
;

export const usePreviousShifts = (companyCode?: string, userID?: string) => {
  return useQuery({
    queryKey: ["previousShifts", companyCode, userID],
    queryFn: () => fetchPreviousShifts(companyCode!, userID!),
    enabled: !!companyCode && !!userID,
  });
};
