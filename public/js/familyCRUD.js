
// NEED TO GET PARENT ID AS A DATA VALUE ON UPDATE PAGES AND WHEN ADDING A NEW CHILD ON FAMILY PROFILE

// NEED TO GET PARENT ID AS DATA VALUE ON ADD NEW PARENT ADD NEW CHILD

// LOGIC FLOW FOR NEW FAMILIES NEEDS TO BE ADD NEW PARENT FIRST THEN ADD NEW CHILD PASS PARENT ID 
// SO THAT WE CAN ASSIGN THE CHILD TO THE PARENT

const parentIdData = document.querySelector('#parentId');
const parentId = parentIdData.dataset.id,
const childIdData = document.querySelector('#childId');
const childId = childIdData.dataset.id,

// const parentFirst = document.querySelector('#familyEdit-first').value.trim();
// const parentLast = document.querySelector('#familyEdit-last').value.trim();
// const phone = document.querySelector('#familyEdit-phone').value.trim();
// const email = document.querySelector('#familyEdit-email').value.trim();
// const address = document.querySelector('#familyEdit-address').value.trim();
// const city = document.querySelector('#familyEdit-city').value.trim();
// const state = document.querySelector('#familyEdit-state').value.trim();
// const postalCode = document.querySelector('#familyEdit-postalCode').value.trim();

// const childFirst = document.querySelector('#familyChildEdit-first').value.trim();
// const childLast = document.querySelector('#familyChildEdid-last').value.trim();
// const birthdate = document.querySelector('#familyChildEdit-birth').value.trim();
// const billing = document.querySelector('#familyChildEdit-billing').value.trim();


const updateParent = async (event) => {
    event.preventDefault();
    let parentIdData = document.querySelector('#parentId');
    let parentId = parentIdData.dataset.id,

    const parentInfo = {
        
        firstName: document.querySelector('#familyEdit-first').value.trim(),
        lastName: document.querySelector('#familyEdit-last').value.trim(),
        phone: document.querySelector('#familyEdit-phone').value.trim(),
        email: document.querySelector('#familyEdit-email').value.trim(),
        address: document.querySelector('#familyEdit-address').value.trim(),
        city: document.querySelector('#familyEdit-city').value.trim(),
        state: document.querySelector('#familyEdit-state').value.trim(),
        postalCode: document.querySelector('#familyEdit-postalCode').value.trim(),
    };

    if (parentInfo) {
        const response = await fetch(`/api/internal/updateParent/${parentId}`, {
            method: 'PUT',
            body: JSON.stringify({parentInfo}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace(`/api/internal/familyProfile/${parentId}`);
        } else {
            alert(response.statusText);
        }
    }    
};

const updateChild = async (event) => {
    event.preventDefault();
    let childIdData = document.querySelector('#childId');
    let childId = childIdData.dataset.id,
    
    const childInfo = {
        firstName: document.querySelector('#familyChildEdit-first').value.trim(),
        lastName: document.querySelector('#familyChildEdid-last').value.trim(),
        birthdate: document.querySelector('#familyChildEdit-birth').value.trim(),
        billing: document.querySelector('#familyChildEdit-billing').value.trim(),
    };

    if(childInfo) {
        const response = await fetch(`/api/internal/updateChild/${childId}`, {
            method: 'PUT',
            body: JSON.stringify({childInfo}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/api/internal');
        } else {
            alert(response.statusText);
        }
    }
};


const newParent = async (event) => {
    event.preventDefault();
   
    const parentInfo = {
        
        firstName: document.querySelector('#familyEdit-first').value.trim(),
        lastName: document.querySelector('#familyEdit-last').value.trim(),
        phone: document.querySelector('#familyEdit-phone').value.trim(),
        email: document.querySelector('#familyEdit-email').value.trim(),
        address: document.querySelector('#familyEdit-address').value.trim(),
        city: document.querySelector('#familyEdit-city').value.trim(),
        state: document.querySelector('#familyEdit-state').value.trim(),
        postalCode: document.querySelector('#familyEdit-postalCode').value.trim(),
    };

    if (parentInfo) {
        const response = await fetch('/api/internal/newParent/', {
            method: 'POST',
            body: JSON.stringify({parentInfo}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
           // document.location.replace('/api/internal/addChild');
            const res = await fetch('/api/internal/addChild', {
                method: 'GET',

            });
            if (response.ok){
                console.log("SUCCESS")
            } else {
                alert(response.statusText);
            };

        } else {
            alert(response.statusText);
        }
    }    
};

// async function getData(event) {
//   fetch('/api/internal/1')
//   .then((response) => {
//   return response.json();
//   }).then((res) => {
  
//   mapInvoice(res);
//   })
  
// };


const newChild = async (event) => {
    event.preventDefault();
    let parentIdData = document.querySelector('#parentId');
    let parentId = parentIdData.dataset.id,

    const childInfo = {
        firstName: document.querySelector('#familyChildEdit-first').value.trim(),
        lastName: document.querySelector('#familyChildEdid-last').value.trim(),
        birthdate: document.querySelector('#familyChildEdit-birth').value.trim(),
        parent_id: parentId,
        billing_id: document.querySelector('#familyChildEdit-billing').value.trim(),
    };

    if(childInfo) {
        const response = await fetch('/api/internal/newChild/', {
            method: 'POST',
            body: JSON.stringify({childInfo}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace(`/api/internal/familyProfile/${parentId}`);
        } else {
            alert(response.statusText);
        }
    }
};


document
  .querySelector('#updateParent')
  .addEventListener('click', updateParent);


document
  .querySelector('#updateChild')
  .addEventListener('click', updateChild);

  document
  .querySelector('#newChild')
  .addEventListener('click', newChild);

  document
  .querySelector('#newParent')
  .addEventListener('click', newParent);

