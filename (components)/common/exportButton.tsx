import { exportCSV, exportToPdf, exportDataTableToPdf } from "@/app/utils/exportPdf";
import { useState } from "react";

type ExportButtonProps = {
  csvData: object[];
  pdfElementId: string;
  exportTitle?: string;
  fileName?: string;
};

export const ExportButton: React.FC<ExportButtonProps> = ({
  csvData,
  pdfElementId,
  exportTitle = "Data Export",
  fileName = "export",
}) => {
  const [hovering, setHovering] = useState(false);

  const handleExport = (type: "pdf" | "csv" | "pdf-table") => {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (type === "pdf") {
      exportToPdf(pdfElementId, `${fileName}-${timestamp}.pdf`, csvData);
    } else if (type === "pdf-table") {
      exportDataTableToPdf(csvData, `${fileName}-table-${timestamp}.pdf`, exportTitle);
    } else {
      exportCSV(csvData, `${fileName}-${timestamp}.csv`);
    }
    
    setHovering(false);
  };

  return (
    <>
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <button className="bg-[#1e1e1e] hover:bg-amber-300 text-white px-4 py-2 rounded transition-all duration-300 ease-in">
          Export
        </button>
        {hovering && (
          <div className="absolute mt-2 top-4 bg-white border rounded shadow-md z-10 w-36">
            <button
              onClick={() => handleExport("pdf")}
              className="block px-4 py-2 w-full text-left text-[10px] hover:bg-gray-100 border-b"
            >
              Export as PDF (Data)
            </button>
            <button
              onClick={() => handleExport("pdf-table")}
              className="block px-4 py-2 w-full text-left text-[10px] hover:bg-gray-100 border-b"
            >
              Export as PDF (Table)
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-[10px]"
            >
              Export as CSV
            </button>
          </div>
        )}
      </div>
    </>
  );
};