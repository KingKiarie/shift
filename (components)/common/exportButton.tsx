"use client";

import React from "react";
import { ShiftSalesSummary } from "@/lib/types/shiftSalesSummary";
import { exportToPDF } from "@/app/utils/exportPdf";
import { Download } from "lucide-react";

interface ExportButtonProps {
  summaryData: ShiftSalesSummary;
  pdfElementId: string;
  exportTitle: string;
  fileName: string;
  showDropdown?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  pdfElementId,
  fileName,
  showDropdown = false,
}) => {
  const handleExportPDF = () => {
    exportToPDF(pdfElementId, `${fileName}.pdf`);
  };

  return (
    <div className="relative">
      {showDropdown ? (
        <div className="group">
          <button
            className="bg-blue-800 text-white md:px-6 md:py-3 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 text-[12px]"
            onClick={handleExportPDF}
          >
            <Download size={16} />
            Export
          </button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
              onClick={handleExportPDF}
            >
              Export as PDF
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-700 text-white md:px-6 md:py-3 cursor-pointer px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 text-[12px]"
          onClick={handleExportPDF}
        >
          <Download size={16} />
          Export to PDF
        </button>
      )}
    </div>
  );
};
