"use client";

import { useParams } from "next/navigation";
import { usePreviousShifts } from "@/lib/hooks/usePreviousShifts";
import { PreviousShiftsTable } from "@/(components)/reports/previousShiftsTable";

export default function PreviousShiftsPage() {
  const { companyCode, userId } = useParams() as {
    shiftId: string;
    companyCode: string;
    userId: string;
  };

  const {
    data: shifts,
    isLoading,
    error,
  } = usePreviousShifts(companyCode, userId);

  if (isLoading) return <p>Loading previous shifts...</p>;
  if (error) return <p>Error loading shifts: {String(error)}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Previous Shifts for User #{userId}
      </h1>
      {shifts && shifts.length > 0 ? (
        <PreviousShiftsTable shifts={shifts} />
      ) : (
        <p>No previous shifts found 🥲</p>
      )}
    </main>
  );
}
