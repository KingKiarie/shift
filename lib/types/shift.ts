export interface ShiftReportItem {
  itemCode: string;
  qtySold: number;
  qtyRequested: number;
  qtyTaken: number;
  qtyReturned: number;
  totalSale: number;
  avgPrice: number;
  stdCost: number;
  margin: number;
}

export interface ShiftReport {
  reportname: string;
  shiftid: string;
  reportDetails: ShiftReportItem[];
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

export interface SalesRep {
  SalesRepName: string;
  route: string;
}

export interface ShiftDetails {
  shiftID: number;
  shiftStatus: "OPEN" | "CLOSE";
  shiftStart: string;
  shiftEnd: string | null;
  userID: number;
}

export interface Expense {
  expenseDescription: string;
  expenseAmount: number;
}

export interface Payment {
  datepaid: string;
  chequeno: string;
  amountpaid: number;
  bank: string;
  paymentdesc: string;
}

export interface Debtor {
  custCode: string;
  custname: string;
  visitID: number;
  VSTDateTime: string;
  totalAmount: number;
}

export interface ShiftSalesSummary {
  reportType: string;
  salesRep: SalesRep[];
  shiftDetails: ShiftDetails[];
  expenseList: Expense[];
  totalPayments: number;
  totalExpense: number;
  netProfit: number;
  paymentsReceived: Payment[];
  debtors: Debtor[];
}

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
