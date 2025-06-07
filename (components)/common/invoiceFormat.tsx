export default function InvoiceFormat() {
  return (
    <section>
      <div className="flex flex-col space-y-4 w-full">
        <div className="text-center py-4 flex flex-col border-b-2 border-black">
          <h1 className="text-[32px] font-bold">Shift Summary</h1>
          <h2 className="font-bold text-[24px]">Route: Sham</h2>
        </div>
        <div className="flex items-start justify-between">
          <div className="font-medium flex flex-col space-y-4">
            <span>Salesman Name:</span>
            <span>shiftId:</span>
            <span>Shift Status:</span>
          </div>
          <div className="space-y-4">
            <span>Date:</span>
            <div className="flex flex-col">
              <span className=" border-black font-medium">Amount:</span>
              <span className="border-t-2 border-b-2 text-center border-black py-2">
                {/* amount goes here */} 23232
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Net Sales:</span>
              <span className="border-t-2 text-center border-b-2 border-black py-2">
                {/* Amount goes here */} 2122123
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Expenses</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      SN
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Expense Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Airfare
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      50.00
                    </td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colspan="2"
                    >
                      TOTAL EXPENSES
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      50.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Payments Collected</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      SN
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Bank Deposited
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Date of Transaction
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Ref No.
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">GTB</td>
                    <td className="border border-gray-300 px-4 py-2">
                      2025-05-20
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Cheque/001
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      500.00
                    </td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colspan="5"
                    >
                      Grand Total
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      500.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8 w-full">
            <h2 className="text-xl font-bold mb-2">Debtor Invoices</h2>
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      SN
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Customer Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Reference
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Transaction Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      JAPA MINI SUPERMARKET
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      INV/00001
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      2025-05-01
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2,000.00
                    </td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td
                      className="border border-gray-300 px-4 py-2"
                      colspan="4"
                    >
                      Grand Total
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      2,000.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
