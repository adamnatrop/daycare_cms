//const createInvoice = require("./createInvoice.js");


// async function getData(event) {
//   fetch('/api/internal/1')
//   .then((response) => {
//   return response.json();
//   }).then((res) => {
  
//   mapInvoice(res);
//   })
  
// };

// async function submitInvoice(invoice) {
//  try {
//   const response = await fetch('/api/internal/invoice', {
//     method: 'POST',
//     body: JSON.stringify(invoice),
//     headers: {'Content-Type': 'application/json'},
//   });
//  } catch (err) {
//    console.log(err);
//  }
 
// };




async function mapInvoice (data){
  
    const childArray =[];
    
    data.children.forEach(function(item, index) {
     
      let childData = {
        child: `${item.firstName} ${item.lastName}`,
        age_group: item.billing.type,
        birth_day: item.birthdate,
        amount: item.billing.cost
      }
      childArray.push(childData)
      
    });
  
      let subtotal = 0
  
    for (let i = 0; i >= childArray.length ; i++){
      subtotal = subtotal + childArray.amount
    };
  
    const invoice = {
      parent: {
        name: data.firstName + " " + data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        postal_code: data.postalCode
      },
      child: childArray,
    
      subtotal: subtotal,
      invoice_nr: +1,
      paid: 0,
    };
    
    return invoice;
    //submitInvoice(invoice);
    // createInvoice(invoice, "invoice.pdf");
  };






  // document
  // .querySelector('.writeInvoice')
  // .addEventListener('click', getData);

  module.exports = {
    mapInvoice
  }