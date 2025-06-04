"use client";

import { decodeJWT } from "@/lib/decodeJwt";
import { ExportButton } from "@/(components)/common/exportButton";
import { usePreviousShifts } from "@/lib/hooks/usePreviousShifts";
import { PreviousShiftsResponse } from "@/lib/types/shift";

export default function PreviousShiftPage() {
  const user = decodeJWT();

  const companyCode = user?.companyCode;
  const userID = user?.userID;

  console.log("decoded user", user);

  const { data, isLoading, error } = usePreviousShifts(companyCode, userID);

  const formatPastShiftDataForExport = (data: PreviousShiftsResponse) => {
    return data.shiftList.map((shift) => ({
      "Shift ID": shift.shiftID,
      "Shift Start": new Date(shift.shiftStart).toLocaleString(),
      "Shift End": shift.shiftEnd
        ? new Date(shift.shiftEnd).toLocaleString()
        : "Ongoing",
      "Shift Status": shift.shiftStatus,
      "User ID": data.userID,
      "Company Code": data.companyCode,
    }));
  };

  console.log("Previous Shifts Data:", data);

  return (
    <section className="w-full min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Previous Shifts
        </h2>

        {isLoading ? (
          <p className="text-gray-600 animate-pulse">
            Fetching past timelines...
          </p>
        ) : error ? (
          <p className="text-red-500">
            Something went sideways. Try again later.
          </p>
        ) : data?.shiftList?.length === 0 ? (
          <p className="text-gray-500">No previous shifts found.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {data?.shiftList.map((shift) => (
                <li
                  key={shift.shiftID}
                  className="p-4 bg-white shadow-md rounded-md flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-lg">
                      Shift ID: {shift.shiftID}
                    </p>
                    <p className="text-sm text-gray-600">
                      Start: {new Date(shift.shiftStart).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      End:{" "}
                      {shift.shiftEnd
                        ? new Date(shift.shiftEnd).toLocaleString()
                        : "Still Open"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      shift.shiftStatus === "OPEN"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {shift.shiftStatus}
                  </span>
                </li>
              ))}
            </ul>

            {data?.shiftList?.length > 0 && (
              <div className="pt-4">
                <ExportButton
                  data={formatPastShiftDataForExport(data)}
                  filename="Previous_Shifts"
                  formatOptions={{ csv: true, pdf: true }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
