import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Shift {
  svID: number;
  whseId: number;
  whseCode: string;
  whseName: string;
}

export const useShifts = (companyCode: string | null | undefined) => {
  return useQuery<Shift[], Error>({
    queryKey: ["shift", companyCode],
    queryFn: async () => {
      if (!companyCode) throw new Error("Missing Company Code");
      const response = await axios.get(
        `/api/proxy/warehouse?companyCode=${companyCode}`
      );
      return response.data.data;
    },
    enabled: !!companyCode,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
