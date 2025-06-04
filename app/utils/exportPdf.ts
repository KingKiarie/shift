import jsPDF from "jspdf";

export const exportToPdf = async (
  elementId: string,
  fileName = "export.pdf",
  data?: object[]
) => {
  const input = document.getElementById(elementId);
  if (!input) return console.error("Element not found");

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  if (data && data.length > 0) {
    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("Data Export", margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;

    const headers = Object.keys(data[0]);

    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("Data Records:", margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");

    data.forEach((record, index) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont(undefined, "bold");
      pdf.text(`Record ${index + 1}:`, margin, yPosition);
      yPosition += 8;

      pdf.setFont(undefined, "normal");

      headers.forEach((header) => {
        const value = (record as any)[header];
        const text = `${header}: ${value ?? "N/A"}`;

        const splitText = pdf.splitTextToSize(text, pageWidth - 2 * margin);
        pdf.text(splitText, margin + 10, yPosition);
        yPosition += splitText.length * 5;

        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
      });

      yPosition += 5;
    });
  } else {
    const textContent = extractTextContent(input);

    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("Exported Content", margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;

    const splitText = pdf.splitTextToSize(textContent, pageWidth - 2 * margin);

    splitText.forEach((line) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 6;
    });
  }

  pdf.save(fileName);
};

// Enhanced function specifically for shift summary reports
export const exportShiftSummaryToPdf = async (
  summaryData: any,
  fileName = "shift-summary.pdf"
) => {
  // Transform the data structure to match your component's data format
  const shiftData = {
    route: summaryData.salesRep?.[0]?.route || "N/A",
    salesmanName: summaryData.salesRep?.[0]?.SalesRepName || "N/A",
    date: summaryData.shiftDetails?.[0]?.shiftStart
      ? new Date(summaryData.shiftDetails[0].shiftStart).toLocaleDateString(
          "en-KE",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }
        )
      : "N/A",
    shiftId: summaryData.shiftDetails?.[0]?.shiftID || "N/A",
    shiftStatus: summaryData.shiftDetails?.[0]?.shiftStatus || "N/A",
    amount: summaryData.totalPayments || 0,
    netSales: summaryData.netProfit || 0,
    expenses:
      summaryData.expenseList?.map((expense: any, index: number) => ({
        sn: index + 1,
        description: expense.expenseDescription || "N/A",
        amount: expense.expenseAmount || 0,
      })) || [],
    paymentsCollected:
      summaryData.paymentsReceived?.map((payment: any, index: number) => ({
        sn: index + 1,
        bank: payment.bank || "N/A",
        date: payment.datepaid || "N/A",
        refNo: payment.chequeno || "N/A",
        description: "",
        amount: payment.amountpaid || 0,
      })) || [],
    totalExpense: summaryData.totalExpense || 0,
    totalPayments: summaryData.totalPayments || 0,

    debtorInvoices:
      summaryData.debtors?.map((debtor: any, index: number) => ({
        sn: index + 1,
        custCode: debtor.custCode || "N/A",
        custName: debtor.custname || "N/A",
        visitID: debtor.visitID || "N/A",
        date: debtor.VSTDateTime
          ? new Date(debtor.VSTDateTime).toLocaleDateString("en-KE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A",
      })) || [],
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number = 20) => {
    if (yPosition > pageHeight - requiredSpace) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Title
  pdf.setFontSize(18);
  pdf.setFont(undefined, "bold");
  pdf.text("Shift Summary Report", margin, yPosition);
  yPosition += 20;

  // Basic Information Section
  pdf.setFontSize(12);
  pdf.setFont(undefined, "normal");

  const basicInfo = [
    [`Route:`, shiftData.route],
    [`Salesman Name:`, shiftData.salesmanName, `Date:`, shiftData.date],
    [
      `Shift ID:`,
      shiftData.shiftId,
      `Amount:`,
      formatCurrency(shiftData.amount),
    ],
    [`Shift Status:`, shiftData.shiftStatus],
    [`Net Sales:`, formatCurrency(shiftData.netSales)],
  ];

  basicInfo.forEach((info) => {
    checkNewPage();
    if (info.length === 2) {
      pdf.text(`${info[0]} ${info[1]}`, margin, yPosition);
    } else if (info.length === 4) {
      pdf.text(`${info[0]} ${info[1]}`, margin, yPosition);
      pdf.text(`${info[2]} ${info[3]}`, margin + 100, yPosition);
    }
    yPosition += 8;
  });

  yPosition += 10;

  // Expenses Section
  if (shiftData.expenses && shiftData.expenses.length > 0) {
    checkNewPage(60);

    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Expenses", margin, yPosition);
    yPosition += 12;

    // Table header
    pdf.setFontSize(10);
    pdf.setFont(undefined, "bold");
    pdf.text("SN", margin, yPosition);
    pdf.text("Expense Description", margin + 25, yPosition);
    pdf.text("Amount", margin + 120, yPosition);

    // Header line
    pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
    yPosition += 12;

    // Table rows
    pdf.setFont(undefined, "normal");
    let totalExpenses = 0;

    shiftData.expenses.forEach((expense) => {
      checkNewPage();
      pdf.text(String(expense.sn || ""), margin, yPosition);
      pdf.text(expense.description || "", margin + 25, yPosition);
      pdf.text(formatCurrency(expense.amount || 0), margin + 120, yPosition);
      totalExpenses += expense.amount || 0;
      yPosition += 8;
    });

    // Total line
    pdf.line(margin + 100, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
    pdf.setFont(undefined, "bold");
    pdf.text("TOTAL EXPENSES", margin + 25, yPosition);
    pdf.text(formatCurrency(totalExpenses), margin + 120, yPosition);
    yPosition += 15;
  }

  // Payments Collected Section
  if (shiftData.paymentsCollected && shiftData.paymentsCollected.length > 0) {
    checkNewPage(80);

    pdf.setFontSize(14);
    pdf.setFont(undefined, "bold");
    pdf.text("Payments Collected", margin, yPosition);
    yPosition += 12;

    // Table header
    pdf.setFontSize(9);
    pdf.setFont(undefined, "bold");
    const colWidths = [15, 25, 30, 35, 35];
    const headers = [
      "SN",
      "Bank Deposited",
      "Date of Transaction",
      "Ref No.",
      "Amount",
    ];
    let xPos = margin;

    headers.forEach((header, index) => {
      pdf.text(header, xPos, yPosition);
      xPos += colWidths[index];
    });

    // Header line
    pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
    yPosition += 12;

    // Table rows
    pdf.setFont(undefined, "normal");
    let grandTotal = 0;

    shiftData.paymentsCollected.forEach((payment) => {
      checkNewPage();
      xPos = margin;

      const rowData = [
        String(payment.sn || ""),
        payment.bank || "",
        payment.date || "",
        payment.refNo || "",
        formatCurrency(payment.amount || 0),
      ];

      rowData.forEach((data, index) => {
        const truncatedData =
          data.length > 12 ? data.substring(0, 9) + "..." : data;
        pdf.text(truncatedData, xPos, yPosition);
        xPos += colWidths[index];
      });

      grandTotal += payment.amount || 0;
      yPosition += 8;
    });

    // Grand Total line
    pdf.line(margin + 100, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
    pdf.setFont(undefined, "bold");
    pdf.text("Grand Total", margin + 60, yPosition);
    pdf.text(formatCurrency(grandTotal), margin + 120, yPosition);
    yPosition += 15;
  }

  // Debtor Invoices Section - Remove this section since it's not in your component
  // The component doesn't have debtor invoices, so we'll skip this section

  // Footer
  yPosition = pageHeight - 30;
  pdf.setFontSize(8);
  pdf.setFont(undefined, "normal");
  pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);

  pdf.save(fileName);
};

const extractTextContent = (element: HTMLElement): string => {
  let content = "";

  const tables = element.querySelectorAll("table");
  tables.forEach((table) => {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      const rowData = Array.from(cells)
        .map((cell) => cell.textContent?.trim() || "")
        .join(" | ");
      content += rowData + "\n";
    });
    content += "\n";
  });

  if (tables.length === 0) {
    content = element.textContent || element.innerText || "";
  }

  return content;
};

export const exportDataTableToPdf = async (
  data: object[],
  fileName = "data-export.pdf",
  title = "Data Export"
) => {
  if (!data || !data.length) {
    return console.error("No data provided for PDF export");
  }

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text(title, margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
  pdf.text(`Total Records: ${data.length}`, margin, yPosition + 6);
  yPosition += 20;

  const headers = Object.keys(data[0]);
  const colWidth = (pageWidth - 2 * margin) / headers.length;

  pdf.setFontSize(9);
  pdf.setFont(undefined, "bold");

  headers.forEach((header, index) => {
    const x = margin + index * colWidth;
    pdf.text(header, x + 2, yPosition);
  });

  pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 12;

  pdf.setFont(undefined, "normal");

  data.forEach((record, rowIndex) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = margin;

      pdf.setFont(undefined, "bold");
      headers.forEach((header, index) => {
        const x = margin + index * colWidth;
        pdf.text(header, x + 2, yPosition);
      });
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 12;
      pdf.setFont(undefined, "normal");
    }

    headers.forEach((header, colIndex) => {
      const value = String((record as any)[header] ?? "");
      const x = margin + colIndex * colWidth;

      const truncatedValue =
        value.length > 15 ? value.substring(0, 12) + "..." : value;
      pdf.text(truncatedValue, x + 2, yPosition);
    });

    yPosition += 8;
  });

  pdf.save(fileName);
};

export const exportCSV = (data: object[], filename = "export.csv") => {
  if (!data || !data.length)
    return console.error("No data provided for CSV export");

  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.join(","),
    ...data.map((row) =>
      keys.map((k) => `"${(row as any)[k] ?? ""}"`).join(",")
    ),
  ];
  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
