import { apiClient } from "../api/axios";
import {
  FullShiftData,
  PreviousShiftsResponse,
  ShiftReport,
  ShiftSalesSummary,
} from "../types/shift";

const getFullShiftData = async (
  shiftID: string,
  companyCode: string,
  userID: string
): Promise<FullShiftData> => {
  const [report, summary] = await Promise.all([
    apiClient.get<ShiftReport>(
      `/shift/shiftReport/${shiftID}/${companyCode}/${userID}`
    ),
    apiClient.get<ShiftSalesSummary>(
      `/shift/shiftSalesSummary/${shiftID}/${companyCode}/${userID}`
    ),
  ]);

  const previous = await apiClient.get<PreviousShiftsResponse>(
    `/shift/previousShifts/${companyCode}/${userID}`
  );

  const matchedShift = previous.data.shiftList.find(
    (s) => s.shiftID === shiftID
  );

  if (!matchedShift) {
    throw new Error("Shift metadata not found");
  }

  return {
    meta: {
      companyCode,
      userID,
      shift: matchedShift,
    },
    report: report.data,
    summary: summary.data,
  };
};
