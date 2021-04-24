
async function getData(event) {
    event.preventDefault();
    console.log('FIRED');
    let url = '/api/internal/1';
    try {
      let res = await fetch(url);
      response = res.json()
    //   mapInvoice(response);
      return await console.log(response);
    } catch (error) {
      console.log(error);
    };
  };



async function mapInvoice (data){
    const childArray =[];
    Object.entries(data).forEach(entry => {
      let childData = {
        child: item.firstName + " " + item.firstName,
        age_group: item.billing.type,
        birth_day: item.birthDate,
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
      invoice_nr: invoice_nr++,
      paid: 0,
    };
  
    createInvoice(invoice, "invoice.pdf");
  };

  document
  .querySelector('.writeInvoice')
  .addEventListener('click', getData);
