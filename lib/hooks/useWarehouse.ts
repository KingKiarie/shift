import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Warehouse {
  shiftID: number;
  shiftStart: TimeRanges;
  shiftEnd: TimeRanges;
  shiftStatus: boolean;
}

export const useWarehouses = (companyCode: string | null | undefined) => {
  return useQuery<Warehouse[], Error>({
    queryKey: ["warehouses", companyCode],
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
