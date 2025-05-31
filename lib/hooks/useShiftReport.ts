import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ShiftReportData {
  reportname: string;
  shiftid: string;
  reportDetails: {
    itemCode: string;
    qtyTaken: number;
    qtyReturned: number;
    qtySold: number;
    avgPrice: number;
    stdCost: number;
    totalSale: number;
    margin: number;
  }[];
  grandTotals: {
    qtyTaken: number;
    qtyReturned: string;
    qtySold: number;
    totalSale: number;
    margin: string;
  };
  profitOverview: {
    grandProfit: number;
    shiftExpense: number;
  };
}

export const useShiftsReport = (
  shiftId: number | null | undefined,
  companyCode: string | null | undefined,
  userId: number | null | undefined
) => {
  return useQuery<ShiftReportData, Error>({
    queryKey: ["shiftReport", shiftId, companyCode, userId],
    queryFn: async () => {
      if (!shiftId || !companyCode || !userId)
        throw new Error("Missing parameters, Kindly Fix it");
      const response = await axios.get(
        `api/proxy/shift/shiftReport/${shiftId}/${companyCode}/${userId}`
      );
      return response.data;
    },
    enabled: !!shiftId && !!companyCode && !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
