"use client";

import { useParams } from "next/navigation";
import { decodeJWT } from "@/lib/decodeJwt";
import PreviousShiftsTable from "@/(components)/reports/previousShiftsTable";

export default function PreviousShiftsPage() {
  const params = useParams();
  const user = decodeJWT();

  const companyCode = params?.companyCode as string;
  const userID =
    (params?.userId as string) || user?.id || user?.userId || user?.sub;

  if (!companyCode || !userID) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Missing Information
          </h2>
          <p className="text-gray-600">
            Company code or user ID is required to view previous shifts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[95%] mx-auto w-full ">
        <PreviousShiftsTable companyCode={companyCode} userID={userID} />
      </div>
    </div>
  );
}
