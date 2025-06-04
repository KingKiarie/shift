import { apiClient } from "./axios";
import { PreviousShiftsResponse } from "../types/shift";
import { ShiftReportItem } from "../types/shiftReport";
import { ShiftSalesSummary } from "../types/shiftSalesSummary";

export const fetchShiftReport = async (
  shiftID: string,
  companyCode: string,
  userID: string
): Promise<ShiftReportItem> => {
  const { data } = await apiClient.get(
    `/shift/shiftReport/${shiftID}/${companyCode}/${userID}`
  );
  return data;
};

export const fetchSalesSummary = async (
  shiftID: string,
  companyCode: string,
  userID: string,
  p0: string
): Promise<ShiftSalesSummary> => {
  const { data } = await apiClient.get(
    `/shift/shiftSalesSummary/${shiftID}/${companyCode}/${userID}`
  );
  return data;
};
