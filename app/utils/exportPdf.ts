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

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value || 0);
};

export const generateShiftReportPDF = (summary: any, fileName: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Salesman summary report trip", pageWidth / 2, y, {
    align: "center",
  });
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Shift ID: ${summary.shiftid || "N/A"}`, 14, y);
  y += 15;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Salesman:${summary.Salesman || "N/A"}`, 14, y);
  y += 20;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Report Details", 14, y);
  y += 10;

  const tableData =
    summary.reportDetails?.map((item: any) => [
      item.itemcode || "N/A",
      formatNumber(item.qtySold || 0),
      formatNumber(item.qtyRequested || 0),
      formatNumber(item.qtyTaken || 0),
      formatNumber(item.qtyReturned || 0),
      formatCurrency(item.totalSale || 0),
      formatCurrency(item.avgPrice || 0),
      formatCurrency(item.stdCost || 0),
      formatCurrency(item.margin || 0),
    ]) || [];

  autoTable(doc, {
    startY: y,
    head: [
      [
        "Item Code",
        "Qty Sold",
        "Qty Requested",
        "Qty Taken",
        "Qty Returned",
        "Total Sale",
        "Avg Price",
        "Std Cost",
        "Margin",
      ],
    ],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 8,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    didDrawPage: (data) => {
      y = (data.cursor?.y ?? 0) + 10;
    },
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Grand Totals", 14, y);
  y += 10;

  const totals =
    summary.reportDetails?.reduce(
      (acc: any, item: any) => ({
        qtyTaken: acc.qtyTaken + (item.qtyTaken || 0),
        qtyReturned: acc.qtyReturned + (item.qtyReturned || 0),
        qtySold: acc.qtySold + (item.qtySold || 0),
        totalSale: acc.totalSale + (item.totalSale || 0),
      }),
      { qtyTaken: 0, qtyReturned: 0, qtySold: 0, totalSale: 0 }
    ) || {};

  // const grandTotalsData = [
  //   [formatNumber(totals.qtyTaken || 0)],
  //   [formatNumber(totals.qtyReturned || 0)],
  //   [formatNumber(totals.qtySold || 0)],
  //   [formatCurrency(totals.totalSale || 0)],
  //   [
  //     summary.reportDetails?.[0]?.margin
  //       ? formatCurrency(summary.reportDetails[0].margin)
  //       : "KES 0.00",
  //   ],
  // ];
  const grandTotalsData =
    summary.reportDetails?.map((item: any) => [
      formatNumber(item.qtyTaken || 0),
      formatNumber(item.qtyReturned || 0),
      formatNumber(item.qtySold || 0),
      formatNumber(item.totalSale || 0),
      formatCurrency(item.margin || 0),
    ]) || [];

  autoTable(doc, {
    startY: y,
    head: [["Qty Taken", "Qty Returned", "Qty Sold", "Total Sale", "Margin"]],
    body: grandTotalsData,
    theme: "grid",
    styles: {
      fontSize: 8,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    didDrawPage: (data) => {
      y = (data.cursor?.y ?? 0) + 10;
    },
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Profit Overview", 14, y);
  y += 10;

  const grandProfit =
    summary.reportDetails?.reduce((acc: number, item: any) => {
      return (
        acc +
        ((item.totalSale || 0) - (item.stdCost || 0) * (item.qtySold || 0))
      );
    }, 0) || 0;

  const netProfit = grandProfit - (summary.profitOverview?.shiftExpense || 0);

  const profitOverviewData = [
    [
      formatCurrency(grandProfit),
      formatCurrency(summary.profitOverview?.shiftExpense || 0),
      formatCurrency(netProfit),
    ],
  ];

  autoTable(doc, {
    startY: y,
    head: [["Grand Profit", "Shift Expense", "Net Profit"]],
    body: profitOverviewData,
    theme: "grid",
    styles: {
      fontSize: 8,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    didDrawPage: (data) => {
      y = (data.cursor?.y ?? 0) + 10;
    },
  });

  doc.save(fileName);
};

export const generateSalesSummaryPDF = (summary: any, fileName: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftX = 10;
  const rightX = pageWidth - 70;
  let y = 15;

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
        y = (data.cursor?.y ?? 0) + 10;
      },
    });
  };

  // === TITLE ===
  centerTitle("Shift Sales Summary");
  centerTitle(`Route: ${summary.salesRep[0]?.route || "N/A"}`);

  // === Divider Line ===
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(leftX, y, pageWidth - leftX, y);
  y += 6;

  // === LEFT COLUMN ===
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let leftY = y;
  doc.text(
    `Salesman: ${summary.salesRep[0]?.SalesRepName || "N/A"}`,
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

  // === RIGHT COLUMN ===
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
  doc.text(`${formatCurrency(summary.totalPayments)}`, rightX, rightY);
  rightY += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Net Sales", rightX, rightY);
  rightY += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`${formatCurrency(summary.netProfit)}`, rightX, rightY);

  y = Math.max(leftY, rightY) + 10;

  // === EXPENSES ===
  centerTitle("Expenses");
  const expenseRows = summary.expenseList?.length
    ? summary.expenseList.map((e: any, i: number) => [
        `${i + 1}. ${e.expenseDescription}`,
        `-${formatCurrency(e.expenseAmount)}`,
      ])
    : [["No expenses recorded.", ""]];

  if (summary.expenseList?.length) {
    expenseRows.push(["Total", `-${formatCurrency(summary.totalExpense)}`]);
  }

  renderTable([["Description", "Amount"]], expenseRows);

  // === PAYMENTS COLLECTED ===
  centerTitle("Payments Collected");
  const paymentRows = summary.paymentsReceived?.length
    ? summary.paymentsReceived.map((p: any, i: number) => [
        `${i + 1}. ${p.bank || "N/A"}`,
        formatDate(p.datepaid),
        p.chequeno || "N/A",
        formatCurrency(p.amountpaid),
      ])
    : [["No payments recorded.", "", "", ""]];

  if (summary.paymentsReceived?.length) {
    paymentRows.push(["", "", "Total", formatCurrency(summary.totalPayments)]);
  }

  renderTable([["Bank", "Date", "Ref", "Amount"]], paymentRows);

  // === DEBTOR INVOICES ===
  centerTitle("Debtor Invoices");
  const debtorRows = summary.debtors?.length
    ? summary.debtors.map((d: any, i: number) => [
        `${i + 1}. ${d.custname || "N/A"}`,
        d.custCode || "N/A",
        formatDate(d.VSTDateTime),
        formatCurrency(d.totalAmount),
      ])
    : [["No debtor invoices.", "", "", ""]];

  if (summary.debtors?.length) {
    const totalDebt = summary.debtors.reduce(
      (acc: number, d: any) => acc + (d.totalAmount || 0),
      0
    );
    debtorRows.push(["", "", "Total Debt", formatCurrency(totalDebt)]);
  }

  renderTable([["Customer", "Code", "Date", "Amount"]], debtorRows);

  doc.save(fileName);
};
