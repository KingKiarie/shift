export interface PreviousShift {
  shiftID: string;
  shiftStart: string; 
  shiftEnd: string | null; 
  shiftStatus: "OPEN" | "CLOSE"; 
}

export interface PreviousShiftsResponse {
  message: string;
  status: string;
  shiftList: PreviousShift[];
  statusCode: number;
  companyCode: string;
  userID: string;
}
