// app/dashboard/shift-report/page.tsx
"use client";

import { useState } from "react";
// import { usePreviousShifts } from "@/lib/hooks/usePreviousShifts";
// import { useShiftReport } from "@/lib/hooks/useShiftReport";
// import { useShiftSalesSummary } from "@/lib/hooks/useShiftSalesSummary";
// import { PreviousShiftsTable } from "./components/PreviousShiftsTable";
// import { ShiftReportDetails } from "./components/ShiftReportDetails";
// import { ShiftSalesSummaryDetails } from "./components/ShiftSalesSummaryDetails";
import { usePreviousShifts } from "@/lib/hooks/usePreviousShifts";
import { useShiftReport } from "@/lib/hooks/useShiftReport";
import { useSalesSummary } from "@/lib/hooks/useShiftSalesSummary";
import { PreviousShiftsTable } from "./previousShiftsTable";

export default function ShiftReportPage() {
  const [selectedShiftID, setSelectedShiftID] = useState<string | null>(null);

  const { data: shifts, isLoading: loadingShifts } = usePreviousShifts(
    companyCode,
    userID
  );

  const { data: shiftReport } = useShiftReport(
    selectedShiftID,
    companyCode,
    userID,
    {
      enabled: !!selectedShiftID,
    }
  );

  const { data: shiftSummary } = useSalesSummary(
    selectedShiftID,
    companyCode,
    userID,
    {
      enabled: !!selectedShiftID,
    }
  );

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold">Shift Reports</h1>

      {loadingShifts ? (
        <p>Loading shifts...</p>
      ) : (
        <PreviousShiftsTable
          shifts={shifts}
          onSelectShift={setSelectedShiftID}
        />
      )}

      {/* {selectedShiftID && shiftReport && (
        <ShiftReportDetails report={shiftReport} />
      )} */}

      {/* {selectedShiftID && shiftSummary && (
        <ShiftSalesSummaryDetails summary={shiftSummary} />
      )} */}
    </div>
  );
}
