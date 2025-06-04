import { Shift } from "@/lib/types/shift";

interface Props {
  shifts: Shift[];
  onSelectShift: (shiftID: string) => void;
}

export const PreviousShiftsTable = ({ shifts, onSelectShift }: Props) => (
  <table className="w-full border mt-4">
    <thead className="bg-gray-200">
      <tr>
        <th>Shift ID</th>
        <th>Start</th>
        <th>End</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {shifts.map((shift) => (
        <tr
          key={shift.shiftID}
          onClick={() => onSelectShift(shift.shiftID)}
          className="cursor-pointer hover:bg-gray-100"
        >
          <td>{shift.shiftID}</td>
          <td>{shift.shiftStart}</td>
          <td>{shift.shiftEnd ?? "Open"}</td>
          <td>{shift.shiftStatus}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
