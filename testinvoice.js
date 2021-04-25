const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
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
      .text("ACME Inc.", 110, 57)
      .fontSize(10)
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();
  }
  
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }

  function generateCustomerInformation(doc, invoice) {
    const parent = invoice.parent;
  
    doc
      .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 200)
      .text(`Invoice Date: ${new Date()}`, 50, 215)
      .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 130)
  
      .text(parent.name, 300, 200)
      .text(parent.address, 300, 215)
      .text(`${parent.city}, ${parent.state}, ${parent.country}`, 300, 130)
      .moveDown();
  }

  function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
      .text(c3, 280, y, { width: 90, align: "right" })
      .text(c4, 370, y, { width: 90, align: "right" })
      .text(c5, 0, y, { align: "right" });
  }

  function generateInvoiceTable(doc, invoice) {
    let i,
      invoiceTableTop = 330;
  
    for (i = 0; i < invoice.child.length; i++) {
      const item = invoice.child[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.child,
        item.age_group,
        item.birth_day,
        item.amount
      );
    }
  }

  module.exports = {
    createInvoice
  } 