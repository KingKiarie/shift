import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    // Create a style element to override Tailwind's oklch colors
    const style = document.createElement("style");
    style.textContent = `
      #${elementId}, #${elementId} * {
        --tw-bg-opacity: 1 !important;
        --tw-text-opacity: 1 !important;
        --tw-border-opacity: 1 !important;
        color: #000000 !important; /* Black text */
        background-color: #FFFFFF !important; /* White background */
        border-color: #000000 !important; /* Black borders */
      }
      #${elementId} [class*="bg-black-"] {
        background-color: #E5E5E5\ !important; /* Light gray for bg-gray-* */
      }
      #${elementId} [class*="border-gray-"] {
        border-color: #C9ADA7 !important; /* Medium gray for border-gray-* */
      }
      #${elementId} [class*="text-gray-"] {
        color: #00000 !important; /* Dark gray for text-gray-* */
      }
      #${elementId} [class*="bg-"], #${elementId} [class*="text-"], #${elementId} [class*="border-"] {
        color: #000000 !important; /* Fallback to black for other colors */
        background-color: #FFFFFF !important; /* Fallback to white */
        border-color: #000000 !important; /* Fallback to black */
      }
    `;
    document.head.appendChild(style);

    // Capture the element with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Remove the temporary style element
    document.head.removeChild(style);

    // Generate PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height in mm

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();C9ADA7
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);C9ADA7
      heightLeft -= 297;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
