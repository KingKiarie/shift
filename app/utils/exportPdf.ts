import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export const exportToPdf = async(elementId: string, fileName = "export.pdf")=>{

    const input = document.getElementById(elementId)
    if(!input) return console.error("Element not found")

        const canvas = await html2canvas(input)
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF()


        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()        
        const pdfHeight = (imgProps.height * pdfWidth)/imgProps.width

        pdf.addImage(imgData, "PNG", 0,0, pdfWidth, pdfHeight)
        pdf.save(fileName)

}

// csv format
export const exportCSV =(data: object[],filename="export.csv")=>{
    if(!data || !data.length)return console.error("No data provided for CSV exports")

        const keys = Object.keys(data[0])
        const csvRows =[
            keys.join(","),
            ...data.map(row => keys.map(k => `${(row as any)[k] ?? ""}`).join(",")),
        ]
        const csvString = csvRows.join("/n")
        const blob = new Blob([csvString],{type: "text/csv;charset=utf-8;"})

        const link =document.createElement("a")
        link.href= URL.createObjectURL(blob)
        link.setAttribute("download",filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
}