export interface ShiftReportItem {
  itemcode: string;
  qtySold: number;
  qtyRequested: number;
  qtyTaken: number;
  qtyReturned: number;
  totalSale: number;
  avgPrice: number;
  stdCost: number;
  margin: number;
}

export interface GrandTotals {
  qtyTaken: number;
  qtyReturned: string;
  qtySold: number;
  totalSale: number;
  margin: string;
}

export interface ProfitOverview {
  grandProfit: number;
  shiftExpense: number;
}

export interface ShiftReport {
  reportname: string;
  shiftid: string;
  reportDetails: ShiftReportItem[];
  grandTotals: GrandTotals;
  profitOverview: ProfitOverview;
}
