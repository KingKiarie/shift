"use client";

import { useEffect, useState } from "react";
import { decodeJWT } from "@/lib/decodeJwt";
import { ExportButton } from "@/(components)/common/exportButton";
import { Pagination } from "@/(components)/pagination/pagination";
import { useWarehouses } from "@/lib/hooks/useWarehouse";

interface Warehouse {
  svID: number;
  whseid: number;
  whseCode: string;
  whseName: string;
}

export default function WarehouseReport() {
  const user = decodeJWT();
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const {
    data: warehouses = [],
    isLoading,
    error,
  } = useWarehouses(user?.companyCode);

  const itemsPerPage = 10;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = warehouses.slice(startIdx, endIdx);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <section>
      <div className="max-w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between py-2">
          <h2 className="text-[16px] lg:text-[20px] font-bold mb-4">
            Warehouse Report for {user?.companyCode}
          </h2>
          <span>
            <ExportButton csvData={warehouses} pdfELementId="warehouse-table" />
          </span>
        </div>

        <div className="overflow-x-auto w-full py-2" id="warehouse-table">
          <table className="min-w-full bg-white border border-gray-200  overflow-hidden">
            <thead className="bg-[#1e1e1e] text-white">
              <tr className="text-[12px] md:text-[14px]">
                <th className="py-3 px-6 text-left border-r-2 border-white">
                  Warehouse ID
                </th>
                <th className="py-3 px-6 text-left border-r-2 border-white">
                  Warehouse Code
                </th>
                <th className="py-3 px-6 text-left  border-r-2 border-black">
                  Warehouse Name
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map(({ svID, whseCode, whseName }) => (
                <tr
                  key={svID}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="py-3 px-6 border-r-2 border-black">{svID}</td>
                  <td className="py-3 px-6 border-r-2 border-black">
                    {whseCode}
                  </td>
                  <td className="py-3 px-6 border-r-2 border-black">
                    {whseName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full max-w-[80%] mx-auto py-20 items-center justify-center">
            <Pagination
              currentPage={currentPage}
              totalItems={warehouses.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
