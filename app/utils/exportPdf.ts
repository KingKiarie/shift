import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// 🖨️ Export to PDF (Black & White)
export const exportToPdf = async (
  elementId: string,
  fileName = "export.pdf"
) => {
  const input = document.getElementById(elementId);
  if (!input) return console.error("Element not found");

  // Clone target element to preserve original styles
  const clone = input.cloneNode(true) as HTMLElement;

  // Apply black & white styles to clone
  clone.style.filter = "grayscale(100%) contrast(150%)";
  clone.style.color = "black";
  clone.style.backgroundColor = "white";
  clone.style.borderColor = "black";

  // Apply B&W styles recursively
  clone.querySelectorAll("*").forEach((el) => {
    const element = el as HTMLElement;
    element.style.color = "black";
    element.style.backgroundColor = "white";
    element.style.borderColor = "black";
  });

  clone.style.position = "fixed";
  clone.style.top = "-10000px";
  document.body.appendChild(clone);

  const canvas = await html2canvas(clone);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);

  document.body.removeChild(clone);
};

export const exportCSV = (data: object[], filename = "export.csv") => {
  if (!data || !data.length)
    return console.error("No data provided for CSV export");

  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.join(","), // header row
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
