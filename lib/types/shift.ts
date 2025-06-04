import { ShiftReport } from "./shiftReport";
import { ShiftSalesSummary } from "./shiftSalesSummary";

export interface Shift {
  shiftID: string;
  shiftStart: string;
  shiftEnd: string | null;
  shiftStatus: "OPEN" | "CLOSE";
}

export interface FullShiftData {
  meta: {
    companyCode: string;
    userID: string;
    shift: Shift;
  };
  report: ShiftReport;
  summary: ShiftSalesSummary;
}
export interface PreviousShiftsResponse {
  message: string;
  status: string;
  shiftList: Shift[];
  statusCode: number;
  companyCode: string;
  userID: string;
}
