import { fetchSalesSummary } from "@/lib/api/shifts";
import { decodeJWT } from "@/lib/decodeJwt";

export default function ShiftSales() {
  const decoded = decodeJWT();

  const userId = decoded?.userCode;
  const companyCode = decoded?.companyCode;
  const shiftId = decoded?.shiftID?.toString();

  const { data, isLoading, isError } = fetchSalesSummary(
    shiftId ?? "",
    companyCode ?? "",
    userId ?? ""
  );

  if (!decoded) {
    return (
      <section>
        <div>User is not authenticated or token expired.</div>;
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <div>Loading....</div>
      </section>
    );
  }
  if (isError || !data) {
    return (
      <section>
        <div>Failed to load shift summary.</div>
      </section>
    );
  }

  const {
    reportType,
    salesRep,
    shiftDetails,
    expenseList,
    totalPayments,
    totalExpense,
    netProfit,
    paymentsReceived,
    debtors,
  } = data;

  return (
    <section className="p-6">
      <h1 className="text-xl font-bold mb-4">{reportType}</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Sales Reps</h2>
        <ul>
          {salesRep.map((rep, idx) => (
            <li key={idx}>
              {rep.SalesRepName.trim()} - Route: {rep.route}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Shift Details</h2>
        {shiftDetails.map((shift) => (
          <div key={shift.shiftID}>
            <p>ID: {shift.shiftID}</p>
            <p>Status: {shift.shiftStatus}</p>
            <p>Start: {new Date(shift.shiftStart).toLocaleString()}</p>
            <p>
              End:{" "}
              {shift.shiftEnd
                ? new Date(shift.shiftEnd).toLocaleString()
                : "Ongoing"}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Expenses</h2>
        <ul>
          {expenseList.map((expense, idx) => (
            <li key={idx}>
              {expense.expenseDescription}: KES {expense.expenseAmount}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payments Received</h2>
        <ul>
          {paymentsReceived.map((payment, idx) => (
            <li key={idx}>
              {payment.datepaid} - {payment.bank} - KES {payment.amountpaid}
              {payment.chequeno && ` (Cheque: ${payment.chequeno})`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Debtors</h2>
        <ul>
          {debtors.map((debtor, idx) => (
            <li key={idx}>
              {debtor.custname} (KES {debtor.totalAmount}) on{" "}
              {new Date(debtor.VSTDateTime).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 font-bold">
        <p>Total Payments: KES {totalPayments}</p>
        <p>Total Expenses: KES {totalExpense}</p>
        <p>💰 Net Profit: KES {netProfit}</p>
      </div>
    </section>
  );
}
