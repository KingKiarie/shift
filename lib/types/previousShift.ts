export interface PreviousShift {
  shiftID: string;
  shiftStart: string; // ISO Date string
  shiftEnd: string | null; // null if shift is still open
  shiftStatus: "OPEN" | "CLOSE"; // literal types for better safety
}

export interface PreviousShiftsResponse {
  message: string;
  status: string;
  shiftList: PreviousShift[];
  statusCode: number;
  companyCode: string;
  userID: string;
}
