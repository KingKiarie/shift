import { exportCSV, exportToPdf } from "@/app/utils/exportPdf";
import { useState } from "react";

type ExportButtonProps = {
  csvData: object[];
  pdfELementId: string;
};

export const ExportButton: React.FC<ExportButtonProps> = ({
  csvData,
  pdfELementId,
}) => {
  const [hovering, setHovering] = useState(false);

  const handleExport = (type: "pdf" | "csv") => {
    if (type === "pdf") exportToPdf(pdfELementId);
    else exportCSV(csvData);
    setHovering(false);
  };

  return (
    <>
      <div
        className="relative inline-block text-left"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <button className="bg-[#1e1e1e] hover:bg-amber-300 text-white px-4 py-2 rounded  transition-all duration-300 ease-in ">
          Export
        </button>
        {hovering && (
          <div className="absolute mt-2 top-4 bg-white border rounded shadow-md z-10 w-28">
            <button
              onClick={() => handleExport("pdf")}
              className="block px-4 py-2 w-full text-left text-[10px] hover:bg-gray-100"
            >
              Export as PDF
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
