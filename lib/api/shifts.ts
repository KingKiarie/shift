import { apiClient } from "./axios";
import {
  ShiftReportItem,
  ShiftSalesSummary,
  PreviousShiftsResponse,
} from "../types/shift";

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
export const fetchPreviousShifts = async (
  companyCode: string,
  userID: string
): Promise<PreviousShiftsResponse> => {
  const { data } = await apiClient.get(
    `/shift/previousShifts/${companyCode}/${userID}`
  );
  return data; 
};
