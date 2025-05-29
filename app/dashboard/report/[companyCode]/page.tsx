"use client";

import { useEffect, useState } from "react";
import { decodeJWT } from "@/lib/decodeJwt";

interface Warehouse {
  svID: number;
  whseid: number;
  whseCode: string;
  whseName: string;
}

export default function Report() {
  const user = decodeJWT();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.companyCode) {
      setError("No company code available");
      setLoading(false);
      return;
    }

    async function fetchWarehouses() {
      try {
        const res = await fetch(
          `/api/proxy/warehouse?companyCode=${user?.companyCode}`
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setWarehouses(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchWarehouses();
  }, [user?.companyCode]);

  if (loading) return <div>Loading warehouses... hold tight 🚀</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <section>
      <div className="max-w-[90%] mx-auto">
        <h2 className="text-xl font-bold mb-4">
          Warehouse Report for {user?.companyCode}
        </h2>
        <div className="overflow-x-auto w-full py-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-[#1e1e1e] text-white">
              <tr className="text-[12px] md:text-[14px]">
                <th className="py-3 px-6 text-left border-r-2 border-white">
                  Warehouse ID
                </th>
                <th className="py-3 px-6 text-left border-r-2 border-white">
                  Warehouse Code
                </th>
                <th className="py-3 px-6 text-left border-r-2 border-white">
                  Warehouse Name
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {warehouses.map(({ svID, whseCode, whseName }) => (
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
        </div>
      </div>
    </section>
  );
}
