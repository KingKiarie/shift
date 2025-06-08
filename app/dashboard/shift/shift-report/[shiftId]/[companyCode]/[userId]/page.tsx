"use client";

import { useParams } from "next/navigation";
import { decodeJWT } from "@/lib/decodeJwt";
import { ShiftReportComponent } from "@/(components)/reports/ShiftReport";

export default function ShiftReportPage() {
  const params = useParams();
  const user = decodeJWT();

  const shiftID = params?.shiftId as string;
  const companyCode = params?.companyCode as string;
  const userID =
    (params?.userId as string) ||
    user?.shiftID ||
    user?.companyCode ||
    user?.userName;

  console.log("Shift ID:", shiftID);
  console.log("Company Code:", companyCode);
  console.log("User ID:", userID);

  if (!shiftID || !companyCode || !userID) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Missing Information
          </h2>
          <p className="text-gray-600">
            Shift ID, company code, or user ID is missing. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShiftReportComponent
          shiftID={shiftID}
          companyCode={companyCode}
          userID={userID}
        />
      </div>
    </div>
  );
}
