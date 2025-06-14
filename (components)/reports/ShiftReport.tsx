"use client";
import React from "react";
import { useShiftReport } from "@/lib/hooks/useShiftReport";
import { ShiftReport } from "@/lib/types/shiftReport";
import { ExportButton } from "../common/exportButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ShiftReportComponentProps {
  shiftID: string;
  companyCode: string;
  userID: string;
}

export const ShiftReportComponent: React.FC<ShiftReportComponentProps> = ({
  shiftID,
  companyCode,
  userID,
}) => {
  const { data, isLoading, isError, error } = useShiftReport(
    shiftID,
    companyCode,
    userID
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading shift report...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-700">
          Error loading shift report: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-yellow-700">No shift report data available</div>
      </div>
    );
  }

  const shiftReport: ShiftReport = data;

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    }).format(numValue || 0);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value || 0);
  };

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg w-full"
      id="shift-report-template"
    >
      <div className="mb-6 flex flex-col  md:flex-row items-start justify-between">
        <div className="w-full flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {shiftReport.reportname}
          </h2>
          <p>salesperson:{shiftReport.shiftid}</p>
          <p className="text-gray-600">Shift ID: {shiftReport.shiftid}</p>
        </div>
        <div className="w-full flex items-end justify-end py-2">
          <Link
            href={`/dashboard/shift/shift-sales-summary/${shiftID}/${companyCode}/${userID}`}
            className="flex items-center space-x-2 cursor-pointer px-4 py-2 md:px-6 md:py-3 font-bold hover:border-blue-700  underline underline-offset-4 duration-300 ease-in"
          >
            <button>View reports</button>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <section className="mb-8">
        <div className="py-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Report Details
          </h3>

          <div>
            <ExportButton
              summaryData={shiftReport}
              fileName={`shift_report_${
                shiftReport.reportname || "unknown"
              }_shift_id_ ${shiftReport.shiftid}`}
              type="shift"
              showDropdown={true}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 text-left">
                  Item Code
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Qty Sold
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Qty Requested
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Qty Taken
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Qty Returned
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Total Sale
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Avg Price
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Std Cost
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-right">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody>
              {shiftReport.reportDetails.map((item, index) => (
                <tr
                  key={`${item.itemcode}-${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="border-b border-gray-100 px-4 py-3 font-medium">
                    {item.itemcode}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatNumber(item.qtySold)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatNumber(item.qtyRequested)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatNumber(item.qtyTaken)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatNumber(item.qtyReturned)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatCurrency(item.totalSale)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatCurrency(item.avgPrice)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatCurrency(item.stdCost * item.qtySold)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-right">
                    {formatCurrency(item.margin)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid md:grid-cols-1 gap-6">
        <section className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Grand Totals
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Qty Taken:</span>
              <span className="font-medium">
                {formatNumber(
                  shiftReport.reportDetails.reduce(
                    (total, item) => total + Number(item.qtyTaken),
                    0
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Qty Returned:</span>
              <span className="font-medium">
                {formatNumber(
                  shiftReport.reportDetails.reduce(
                    (total, item) => total + Number(item.qtyReturned),
                    0
                  )
                )}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Qty Sold:</span>
              <span className="font-medium">
                {formatNumber(
                  shiftReport.reportDetails.reduce(
                    (total, item) => total + Number(item.qtySold),
                    0
                  )
                )}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Sale:</span>
              <span className="font-medium">
                {formatCurrency(
                  shiftReport.reportDetails.reduce((total, profitValue) => {
                    const profitSale = profitValue.totalSale;
                    return total + profitSale;
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Margin:</span>
              <span className="font-bold text-green-600">
                {/* {shiftReport.reportDetails.map((profit, idx) => {
                  const profitValue =
                    profit.totalSale - profit.stdCost * profit.qtySold;
                  return <p key={idx}>{formatCurrency(profitValue)}</p>;
                })} */}
                {formatCurrency(
                  shiftReport.reportDetails.reduce((total, margin) => {
                    const marginValue =
                      margin.totalSale - margin.stdCost * margin.qtySold;
                    return total + marginValue;
                  }, 0)
                )}
              </span>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Profit Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Grand Profit:</span>
              <span className="font-bold text-green-600">
                <p className="font-semibold text-green-700 mt-4">
                  {formatCurrency(
                    shiftReport.reportDetails.reduce((total, profit) => {
                      const profitValue =
                        profit.totalSale - profit.stdCost * profit.qtySold;
                      return total + profitValue;
                    }, 0)
                  )}
                </p>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shift Expense:</span>
              <span className="font-medium text-red-600">
                {formatCurrency(shiftReport.profitOverview.shiftExpense)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Net Profit:</span>
              <span className="font-bold text-blue-600">
                <p className="font-semibold text-green-700 mt-4">
                  {formatCurrency(
                    shiftReport.reportDetails.reduce((total, netProfit) => {
                      const profitValue =
                        netProfit.totalSale -
                        netProfit.stdCost * netProfit.qtySold;
                      return total + profitValue;
                    }, 0) - shiftReport.profitOverview.shiftExpense
                  )}
                </p>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
