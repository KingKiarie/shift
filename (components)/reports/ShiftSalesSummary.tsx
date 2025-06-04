"use client";

import React from "react";
import { useSalesSummary } from "@/lib/hooks/useShiftSalesSummary";
import {
  AlertCircle,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
  Clock,
  CreditCard,
  Receipt,
  MapPin,
} from "lucide-react";

interface ShiftSalesSummaryProps {
  shiftID: string;
  companyCode: string;
  userID: string;
}

export const ShiftSalesSummaryComponent: React.FC<ShiftSalesSummaryProps> = ({
  shiftID,
  companyCode,
  userID,
}) => {
  const {
    data: summary,
    isLoading,
    error,
  } = useSalesSummary(shiftID, companyCode, userID);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
        <AlertCircle size={20} />
        Failed to load sales summary
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
        No sales summary available for this shift.
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Shift Sales Summary
        </h2>
        <p className="text-gray-600">{summary.reportType}</p>
      </div>

      {/* Sales Reps */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users size={18} />
          Sales Reps
        </h3>
        <ul className="mt-2 space-y-2">
          {summary.salesRep.map((rep, i) => (
            <li
              key={i}
              className="p-3 bg-gray-50 border rounded-md flex justify-between items-center"
            >
              <span className="font-medium">{rep.SalesRepName}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={14} />
                {rep.route}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shift Details */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock size={18} />
          Shift Details
        </h3>
        <div className="mt-2 space-y-2">
          {summary.shiftDetails.map((shift, i) => (
            <div key={i} className="border p-3 rounded-md bg-gray-50 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Shift #{shift.shiftID}</span>
                <span className="text-sm text-blue-600">
                  {shift.shiftStatus}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Started: {formatDateTime(shift.shiftStart)}</p>
                {shift.shiftEnd && (
                  <p>Ended: {formatDateTime(shift.shiftEnd)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-xl font-semibold text-green-700">
                {formatCurrency(summary.totalPayments)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingDown className="text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-semibold text-red-700">
                {formatCurrency(summary.totalExpense)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-xl font-semibold text-blue-700">
                {formatCurrency(summary.netProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Received */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard size={18} />
          Payments Received ({summary.paymentsReceived.length})
        </h3>
        {summary.paymentsReceived.length ? (
          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {summary.paymentsReceived.map((payment, i) => (
              <li
                key={i}
                className="p-3 border rounded-md flex justify-between items-start bg-white"
              >
                <div>
                  <p className="font-medium">
                    {formatCurrency(payment.amountpaid)}
                  </p>
                  <div className="text-sm text-gray-600">
                    {payment.chequeno && <p>Cheque: {payment.chequeno}</p>}
                    {payment.bank && <p>Bank: {payment.bank}</p>}
                    {payment.paymentdesc && <p>{payment.paymentdesc}</p>}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {payment.datepaid}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No payments recorded.</p>
        )}
      </div>

      {/* Expenses */}
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Receipt size={18} />
          Expenses ({summary.expenseList.length})
        </h3>
        {summary.expenseList.length ? (
          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {summary.expenseList.map((expense, i) => (
              <li
                key={i}
                className="p-3 border rounded-md flex justify-between bg-white"
              >
                <span>{expense.expenseDescription}</span>
                <span className="text-red-600">
                  -{formatCurrency(expense.expenseAmount)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No expenses recorded.</p>
        )}
      </div>
    </div>
  );
};
