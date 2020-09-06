import jsPDF from 'jspdf'
import 'jspdf-autotable'

const doc = new jsPDF()

const DownloadPdf = (column, pdfData) => {
  doc.autoTable({
    head: [column],
    body: pdfData
  })

  doc.save('table.pdf')
}

export default DownloadPdf
