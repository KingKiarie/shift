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
    pdf.setFont(undefined, 'bold');
    pdf.text("Data Export", margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;

    const headers = Object.keys(data[0]);
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text("Data Records:", margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    
    data.forEach((record, index) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont(undefined, 'bold');
      pdf.text(`Record ${index + 1}:`, margin, yPosition);
      yPosition += 8;
      
      pdf.setFont(undefined, 'normal');
      
      headers.forEach(header => {
        const value = (record as any)[header];
        const text = `${header}: ${value ?? 'N/A'}`;
        
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
    pdf.setFont(undefined, 'bold');
    pdf.text("Exported Content", margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;

    const splitText = pdf.splitTextToSize(textContent, pageWidth - 2 * margin);
    
    splitText.forEach(line => {
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

const extractTextContent = (element: HTMLElement): string => {
  let content = '';
  
  const tables = element.querySelectorAll('table');
  tables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td, th');
      const rowData = Array.from(cells).map(cell => cell.textContent?.trim() || '').join(' | ');
      content += rowData + '\n';
    });
    content += '\n';
  });

  if (tables.length === 0) {
    content = element.textContent || element.innerText || '';
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
  pdf.setFont(undefined, 'bold');
  pdf.text(title, margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
  pdf.text(`Total Records: ${data.length}`, margin, yPosition + 6);
  yPosition += 20;

  const headers = Object.keys(data[0]);
  const colWidth = (pageWidth - 2 * margin) / headers.length;

  pdf.setFontSize(9);
  pdf.setFont(undefined, 'bold');
  
  headers.forEach((header, index) => {
    const x = margin + (index * colWidth);
    pdf.text(header, x + 2, yPosition);
  });
  
  pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 12;

  pdf.setFont(undefined, 'normal');
  
  data.forEach((record, rowIndex) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFont(undefined, 'bold');
      headers.forEach((header, index) => {
        const x = margin + (index * colWidth);
        pdf.text(header, x + 2, yPosition);
      });
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 12;
      pdf.setFont(undefined, 'normal');
    }

    headers.forEach((header, colIndex) => {
      const value = String((record as any)[header] ?? '');
      const x = margin + (colIndex * colWidth);
      
      const truncatedValue = value.length > 15 ? value.substring(0, 12) + '...' : value;
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
