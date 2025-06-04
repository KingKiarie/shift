"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ShiftSalesSummaryProps {
  summary: any;
}

export const ShiftSalesSummaryComponent: React.FC<ShiftSalesSummaryProps> = ({
  summary,
}) => {
  if (!summary) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
        <AlertCircle size={20} className="inline mr-2" />
        No sales summary available for this shift.
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <div className="space-y-6 w-full h-auto  p-4">
      {/* Header Section */}
      <div className="">
        <h2 className="text-2xl font-bold text-gray-900">
          Shift Summary Report
        </h2>
        <table className=" bg-white min-w-full divide-y divide-gray-200 mt-2">
          <tbody className="border-2 border-black">
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2">
                Route
              </th>
              <td className="px-6 py-3">
                {summary.salesRep[0]?.route || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2">
                Salesman Name
              </th>
              <td className="px-6 py-3">
                {summary.salesRep[0]?.SalesRepName || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2">
                Shift ID
              </th>
              <td className="px-6 py-3 ">
                {summary.shiftDetails[0]?.shiftID || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2">
                Shift Status
              </th>
              <td className="px-6 py-3">
                {summary.shiftDetails[0]?.shiftStatus || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2">
                Date
              </th>
              <td className="px-6 py-3">
                {formatDate(summary.shiftDetails[0]?.shiftStart) || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <th className="border-r-2 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <td className="px-6 py-3 text-right">
                {formatCurrency(summary.totalPayments)}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 border-r-2 uppercase tracking-wider">
                Net Sales
              </th>
              <td className="px-6 py-3 text-right">
                {formatCurrency(summary.netProfit)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Expenses Section */}
      <div className="w-full ">
        <h3 className="text-start text-[24px] md:text-[32px] font-semibold mt-4">
          Expenses
        </h3>
        {summary.expenseList.length > 0 ? (
          <table className="text-center bg-white min-w-full divide-y divide-gray-200 mt-2">
            <thead className="text-center w-full">
              <tr className="border-2 border-black text-center">
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r-2 border-black ">
                  SN
                </th>
                <th className="border-r-2 border-black px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expense Description
                </th>
                <th className=" px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.expenseList.map((expense: any, i: number) => (
                <tr key={i} className="border-2 border-black">
                  <td className="border-r-2 px-6 py-4 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="border-r-2 px-6 py-4 whitespace-nowrap">
                    {expense.expenseDescription}
                  </td>
                  <td className=" px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    -{formatCurrency(expense.expenseAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-2 border-black">
              <tr>
                <td className="px-6 py-3 border-r-2" colSpan={2}>
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-medium text-red-600">
                  -{formatCurrency(summary.totalExpense)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500 mt-2">No expenses recorded.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 text-[24px] md:text-[32px]">
          Payments Collected
        </h3>
        {summary.paymentsReceived.length > 0 ? (
          <table className="bg-white min-w-full divide-y divide-gray-200 mt-2">
            <thead>
              <tr className="bg-gray-50 border-2 border-black">
                <th className="px-6  py-3 bg-gray-50 border-r-2 border-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className=" border-r-2 border-black  px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank Deposited
                </th>
                <th className=" border-r-2 border-black  px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Transaction
                </th>
                <th className="border-r-2 border-black px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ref no.
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {summary.paymentsReceived.map((payment: any, i: number) => (
                <tr
                  key={i}
                  className="border-b-2 border-black hover:bg-gray-50"
                >
                  <td className="px-6 py-4 border-l-2 border-r-2 border-black whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {payment.bank || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {payment.datepaid}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {payment.chequeno || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {formatCurrency(payment.amountpaid)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border border-black">
                <td className="px-6 py-3" colSpan={4}>
                  Grand Total
                </td>
                <td className="border-l-2 border-black px-6 py-3 text-sm font-medium">
                  {formatCurrency(summary.totalPayments)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500 mt-2">No payments recorded.</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-4 text-[24px] md:text-[32px]">
          Debtor Invoices{" "}
        </h3>
        {summary.paymentsReceived.length > 0 ? (
          <table className="bg-white min-w-full divide-y divide-gray-200 mt-2">
            <thead>
              <tr className="bg-gray-50 border-2 border-black">
                <th className="px-6  py-3 bg-gray-50 border-r-2 border-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className=" border-r-2 border-black  px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className=" border-r-2 border-black  px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="border-r-2 border-black px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {summary.debtors.map((debtor: any, i: number) => (
                <tr
                  key={i}
                  className="border-b-2 border-black hover:bg-gray-50"
                >
                  <td className="px-6 py-4 border-l-2 border-r-2 border-black whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {debtor.custname || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {debtor.custCode || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {formatDate(debtor.VSTDateTime) || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-r-2 border-black whitespace-nowrap">
                    {formatCurrency(debtor.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border border-black">
                <td className="px-6 py-3" colSpan={4}>
                  Grand Total
                </td>
                <td className="border-l-2 border-black px-6 py-3 text-sm font-medium">
                  {formatCurrency(summary.totalPayments)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500 mt-2">No payments recorded.</p>
        )}
      </div>
    </div>
  );
};
