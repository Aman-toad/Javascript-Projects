let contacts = JSON.parse(localStorage.getItem("book")) || [];

async function addContact(){
  const inpName = document.getElementById("js-inpName").value;
  const inpNum = document.getElementById("js-inpNum").value;
  const displayApiData = document.getElementById('displayApiData');

  if(inpName==='' && inpNum===''){
    alert('Please fill the Name and Number section')
  }else {
    // Api Post Feature 
    displayApiData.style.display = 'block';
    displayApiData.textContent = 'Sending Data To the Server...';
    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: inpName,
          phone : inpNum
        })
      });

      const data = await res.json();
      displayApiData.textContent = `Thanks, the data with name ${data.name} and "${data.phone}" is successfully stored your (fake ID: ${data.id})`;
    }catch (err){
      displayApiData.textContent = 'failed to send feedback';
      console.error(err);    
    }

    const newContact = {name: inpName, phone: inpNum};
    contacts.push(newContact);

    localStorage.setItem("book", JSON.stringify(contacts));
            
    document.getElementById("js-inpName").value = '';
    document.getElementById("js-inpNum").value = '';
    displayContacts();
  }
}

function displayContacts(){
  const contacts = JSON.parse(localStorage.getItem("book")) || [];

  if (!Array.isArray(contacts)) {
    console.warn("Contacts in localStorage is not an array. Resetting it.");
    localStorage.setItem("book", JSON.stringify([]));
    return;
  }

  const displayDiv = document.querySelector('.name-nums');

  displayDiv.innerHTML = `
    <div class="added-names">Name</div>
    <div class="added-nums">Phone Numbers</div>
    <div><button class="thanks-msg" onclick="thankUmsg()">&#128516;</button></div>
    `;

  contacts.forEach((contact, index) => {
    displayDiv.innerHTML += `<div class="added-names">${contact.name}</div>
    <div class="added-nums">${contact.phone}</div>
    <div class="added-btns">
      <button class="remove-btn" data-index="${index}">Remove</button>
    </div>`;
  });
}

displayContacts();

document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', removeContact);
  });

function removeContact(event){
  const index = event.target.getAttribute('data-index');

  contacts.splice(index , 1);

  localStorage.setItem('book', JSON.stringify(contacts));

  showContacts();
}

function showContacts(){
  const tableBody = document.querySelector('.name-nums')
  tableBody.innerHTML = `<div class="added-names">Name</div>
    <div class="added-nums">Phone Numbers</div>
    <div><button class="thanks-msg">&#128516;</button></div>`;

  contacts.forEach((contact, index) => {
    tableBody.innerHTML +=`
    <div class="added-names">${contact.name}</div>
    <div class="added-nums">${contact.phone}</div>
    <div class="added-btns">
      <button class="remove-btn" data-index="${index}">Remove</button>
    </div>`;
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', removeContact);
  });
}

function thankUmsg(){
  document.querySelector('.contact-form').style.display='none';
  document.querySelector('.wrapper').innerHTML=`
  <div class="msg">
    <div>Thank you for Visiting this Page and using Our Contact form You can refresh the page
    </div>
  </div>`;
}