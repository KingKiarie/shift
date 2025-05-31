import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface SalesSummaryData {
  reportType: string;
  salesRep: {
    SalesRepName: string;
    route: string;
  }[];
  shiftDetails: {
    shiftID: number;
    shiftStatus: string;
    shiftStart: string;
    shiftEnd: string | null;
    userID: number;
  }[];
  expenseList: {
    expenseDescription: string;
    expenseAmount: number;
  }[];
  totalPayments: number;
  totalExpense: number;
  netProfit: number;
  paymentsReceived: {
    datepaid: string;
    chequeno: string;
    amountpaid: number;
    bank: string;
    paymentdesc: string;
  }[];
  debtors: {
    custCode: string;
    custname: string;
    visitID: number;
    VSTDateTime: string;
    totalAmount: number;
  }[];
}

export const useSalesSummary = (
  shiftId: number | null | undefined,
  companyCode: string | null | undefined,
  userId: number | null | undefined
) => {
  return useQuery<SalesSummaryData, Error>({
    queryKey: ["salesSummary", shiftId, companyCode, userId],
    queryFn: async () => {
      if (!shiftId || !companyCode || !userId)
        throw new Error("Missing params");
      const response = await axios.get(
        `/api/proxy/shift/shiftSalesSummary/${shiftId}/${companyCode}/${userId}`
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
