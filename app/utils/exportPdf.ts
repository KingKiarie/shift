import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export const generateShiftReportPDF = (summary: any, fileName: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftX = 10;
  const rightX = pageWidth - 70;
  let y = 15;

  // === Helpers
  const centerTitle = (text: string, fontSize = 14) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    doc.text(text, pageWidth / 2, y, { align: "center" });
    y += 6;
  };

  const renderTable = (head: string[][], body: any[][]) => {
    autoTable(doc, {
      theme: "grid",
      startY: y,
      head,
      body,
      styles: {
        fontSize: 10,
        textColor: 0,
        lineColor: 0,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        fontStyle: "bold",
        lineColor: 0,
      },
      didDrawPage: (data) => {
        y = data.cursor.y + 10;
      },
    });
  };

  // === TITLE
  centerTitle("Shift Summary Report");
  centerTitle(`Route: ${summary.salesRep[0]?.route || "N/A"}`);

  // === Divider Line
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(leftX, y, pageWidth - leftX, y);
  y += 6;

  // === LEFT COLUMN
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let leftY = y;
  doc.text(
    `Salesman Name: ${summary.salesRep[0]?.SalesRepName || "N/A"}`,
    leftX,
    leftY
  );
  leftY += 5;
  doc.text(
    `Shift ID: ${summary.shiftDetails[0]?.shiftID || "N/A"}`,
    leftX,
    leftY
  );
  leftY += 5;
  doc.text(
    `Shift Status: ${summary.shiftDetails[0]?.shiftStatus || "N/A"}`,
    leftX,
    leftY
  );

  // === RIGHT COLUMN
  let rightY = y;
  doc.text(
    `Date: ${formatDate(summary.shiftDetails[0]?.shiftStart)}`,
    rightX,
    rightY
  );
  rightY += 7;

  doc.setFont("helvetica", "bold");
  doc.text("Amount", rightX, rightY);
  rightY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`${formatCurrency(500)}`, rightX, rightY); // Replace with actual if available
  rightY += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Net Sales", rightX, rightY);
  rightY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`${formatCurrency(summary.netProfit)}`, rightX, rightY);

  // Update y to max height used
  y = Math.max(leftY, rightY) + 10;

  // === EXPENSES
  centerTitle(" Expenses");
  const expenseRows = summary.expenseList?.length
    ? summary.expenseList.map((e: any, i: number) => [
        `${i + 1}. ${e.expenseDescription}`,
        `-${formatCurrency(e.expenseAmount)}`,
      ])
    : [["No expenses recorded.", ""]];

  if (summary.expenseList?.length) {
    expenseRows.push([
      "Total Expenses",
      `-${formatCurrency(summary.totalExpense)}`,
    ]);
  }

  renderTable([["Description", "Amount"]], expenseRows);

  // === PAYMENTS
  centerTitle(" Payments Collected");
  const paymentRows = summary.paymentsReceived?.length
    ? summary.paymentsReceived.map((p: any, i: number) => [
        `${i + 1}. ${p.bank || "N/A"}`,
        p.datepaid,
        p.chequeno || "N/A",
        formatCurrency(p.amountpaid),
      ])
    : [["No payments recorded.", "", "", ""]];

  if (summary.paymentsReceived?.length) {
    paymentRows.push(["", "", "Total", formatCurrency(summary.totalPayments)]);
  }

  renderTable([["Bank", "Date", "Ref", "Amount"]], paymentRows);

  // === DEBTORS
  centerTitle("Debtor Invoices");
  const debtorRows = summary.debtors?.length
    ? summary.debtors.map((d: any, i: number) => [
        `${i + 1}. ${d.custname}`,
        d.custCode,
        formatDate(d.VSTDateTime),
        formatCurrency(d.totalAmount),
      ])
    : [["No debtor invoices.", "", "", ""]];

  if (summary.debtors?.length) {
    const totalDebt = summary.debtors.reduce(
      (acc: number, d: any) => acc + d.totalAmount,
      0
    );
    debtorRows.push(["", "", "Total Debt", formatCurrency(totalDebt)]);
  }

  renderTable([["Customer", "Code", "Date", "Amount"]], debtorRows);

  // === FINISH
  doc.save(fileName);
};
