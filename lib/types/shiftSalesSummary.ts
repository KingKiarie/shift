export interface SalesRep {
  SalesRepName: string;
  route: string;
}

export interface ShiftDetail {
  shiftID: number;
  shiftStatus: string;
  shiftStart: string; // ISO Date string
  shiftEnd: string | null;
  userID: number;
}

export interface Expense {
  expenseDescription: string;
  expenseAmount: number;
}

export interface PaymentReceived {
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
  shiftDetails: ShiftDetail[];
  expenseList: Expense[];
  totalPayments: number;
  totalExpense: number;
  netProfit: number;
  paymentsReceived: PaymentReceived[];
  debtors: Debtor[];
}
