const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("public/images/generic_logo.jpeg", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Miracles", 110, 57)
  
    .fontSize(10)
    .text("Mini Miracles", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
  .fontSize(10)
  .font("Helvetica-Bold")
  .text(invoice.parent.name, 50, 100)
  .font("Helvetica")
  .text(invoice.parent.address, 50, 115)
  .text(
    invoice.parent.city +
      ", " +
      invoice.parent.state + " " +
      invoice.parent.postal_code,
    50,
    130
  )

  generateBox(doc);
  //gives a base number of pixels to adjust length from the top
  const customerInformationLeft = 400;
  const customerInformationTop = 135;

  doc
  .fillColor("#444444")
  .fontSize(20)
  .text("Invoice", customerInformationLeft, customerInformationTop -25);

  doc
    .fontSize(10)
    .text("Invoice Number:", customerInformationLeft, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 450, customerInformationTop,  { align: "right" })
    .font("Helvetica")
    .text("Invoice Date:", customerInformationLeft, customerInformationTop + 15)
    .text(formatDate(new Date()), 450, customerInformationTop + 15,  { align: "right" })
    .text("Balance Due:", customerInformationLeft, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      450,
      customerInformationTop + 30,
      { align: "right" }
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 285;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Child Name",
    "Age Group",
    "Birthday",
    "Week's Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.child.length; i++) {
    const child = invoice.child[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      child.child,
      child.age_group,
      child.birth_day,
      formatCurrency(child.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due by Monday every week. Thank you.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  child,
  age_group,
  unitCost,
  birth_day,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(child, 50, y)
    .text(age_group, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(birth_day, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function generateBox(doc){
  doc
  .strokeColor("#aaaaaa")
  .lineWidth(3)
  .rect(393, 100, 160, 82)
  .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};