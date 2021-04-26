const moment = require("moment");
// THIS MAPS THE DATABASE DATA INTO A VAR FOR THE INVOICE PDF GENERATION
async function mapInvoice (data){
    const childArray =[];
    let sub = 0;
    data.children.forEach(function(item, index) {

      let childData = {
        child: `${item.firstName} ${item.lastName}`.toUpperCase(),
        age_group: item.billing.type.toUpperCase(),
        birth_day: moment(item.birthdate).format('DD/MM/YYYY'),
        amount: item.billing.cost * 100
      }
      childArray.push(childData)
      sub = sub + item.billing.cost * 100
      console.log(sub)
    });

    const invoice = {
      parent: {
        name: data.firstName.toUpperCase() + " " + data.lastName.toUpperCase(),
        address: data.address.toUpperCase(),
        city: data.city.toUpperCase(),
        state: data.state.toUpperCase(),
        postal_code: data.postalCode
      },
      child: childArray,
      subtotal: sub,
      invoice_nr: data.lastName.substr(0, 3) + data.id + 1,
      paid: 0,
    };
    console.log(invoice)
    return invoice;
  };

  module.exports = {
    mapInvoice
  }

  