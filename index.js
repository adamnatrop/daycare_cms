
const { createInvoice } = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    postal_code: 94111
  },
  child: [
    {
      child: "Charlie",
      age_group: "Infant",
      quantity: 5,
      amount: 4000
    },
    {
      child: "Bily",
      age_group: "Toddler",
      quantity: 4,
      amount: 3200
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

createInvoice(invoice, "invoice.pdf");