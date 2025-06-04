"use client";

import { useParams } from "next/navigation";
import { ShiftSalesSummaryComponent } from "@/(components)/reports/ShiftSalesSummary";

export default function ShiftSalesSummaryPage() {
  const params = useParams();

  const shiftID = params.shiftId as string;
  const companyCode = params.companyCode as string;
  const userID = params.userId as string;

  return (
    <ShiftSalesSummaryComponent
      shiftID={shiftID}
      companyCode={companyCode}
      userID={userID}
    />
  );
}
