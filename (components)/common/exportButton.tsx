"use client";

import React from "react";
import { Download, FileDown, FileText } from "lucide-react";
import { exportShiftSummaryToPdf, exportCSV } from "@/app/utils/exportPdf";

interface ExportButtonProps {
  csvData?: object[];
  pdfElementId?: string;
  exportTitle?: string;
  fileName?: string;
  summaryData?: any;
  showDropdown?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  csvData = [],
  pdfElementId,
  exportTitle = "Export",
  fileName = "export",
  summaryData,
  showDropdown = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePdfExport = async () => {
    if (summaryData) {
      // Use the enhanced shift summary PDF export
      await exportShiftSummaryToPdf(summaryData, `${fileName}.pdf`);
    } else if (pdfElementId) {
      // Fallback to element-based export
      const { exportToPdf } = await import("@/app/utils/exportPdf");
      await exportToPdf(pdfElementId, `${fileName}.pdf`);
    }
    setIsOpen(false);
  };

  const handleCsvExport = () => {
    if (csvData && csvData.length > 0) {
      exportCSV(csvData, `${fileName}.csv`);
    } else if (summaryData) {
      // Convert summary data to CSV format
      const csvData = [
        {
          Route: summaryData.salesRep?.[0]?.route || "N/A",
          "Salesman Name": summaryData.salesRep?.[0]?.SalesRepName || "N/A",
          "Shift ID": summaryData.shiftDetails?.[0]?.shiftID || "N/A",
          "Shift Status": summaryData.shiftDetails?.[0]?.shiftStatus || "N/A",
          Date: summaryData.shiftDetails?.[0]?.shiftStart
            ? new Date(
                summaryData.shiftDetails[0].shiftStart
              ).toLocaleDateString("en-KE")
            : "N/A",
          "Total Payments": summaryData.totalPayments || 0,
          "Net Profit": summaryData.netProfit || 0,
          "Total Expenses": summaryData.totalExpense || 0,
        },
      ];
      exportCSV(csvData, `${fileName}.csv`);
    }
    setIsOpen(false);
  };

  if (!showDropdown) {
    return (
      <button
        onClick={handlePdfExport}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FileDown className="w-4 h-4 mr-2" />
        Export PDF
      </button>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <button
              onClick={handlePdfExport}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              <FileDown className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-500" />
              Export as PDF
            </button>
            <button
              onClick={handleCsvExport}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-500" />
              Export as CSV
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
