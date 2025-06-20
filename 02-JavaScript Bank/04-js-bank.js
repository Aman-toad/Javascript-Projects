let bankAccount = {
  accountHolder: '',
  balance: 0,
}; 

const backBtn = document.querySelector('.js-back-btns');

function createAccount(){
  document.querySelector('.signup').style.display='block';
  document.querySelector('.js-work').style.display='none';
}

function hideAllSection(){
  document.querySelectorAll('.section').forEach((div) => {
    div.style.display = 'none';
  })
}

function showAllSection(){
  document.querySelectorAll('.section').forEach((div) => {
    div.style.display = 'block';
  })
}

function showBalance(){
  hideAllSection();
  document.querySelector('.js-balance').style.display='block';

  const balanceInfo = document.querySelector('.js-balance-info');
  balanceInfo.style.display='block';

  backBtn.style.display='block'

  if(bankAccount.accountHolder === ''){
    document.querySelector('.js-balance-info').textContent = `Please create the Bank Account First`;
    return;
  }

  document.getElementById('accountHolderName').textContent = `Name: ${bankAccount.accountHolder}`;
    
  document.getElementById('accountBalance').textContent = `Balance: ₹${bankAccount.balance}`;
}

function withdraw(){
  hideAllSection();
  document.querySelector('.js-withdraw').style.display='block';
  document.querySelector('.js-withdrawing').style.display='block';
}

function deposit(){
  hideAllSection();
  document.querySelector('.js-deposit').style.display='block';
  document.querySelector('.js-depositing').style.display='block';

  document.getElementById('accountHolderName').textContent = `Name: ${bankAccount.accountHolder}`;
    
  document.getElementById('accountBalance').textContent = `Balance: ₹${bankAccount.balance}`;
}

function accountCreated(){
  const inpName = document.getElementById('accountName').value;
  const inpDeposit = document.getElementById('initialDeposit').value;
  
  if (inpName ==='' || inpDeposit <= 0){
    alert('Enter a valid Name or Initial Deposit');
    return;
  }

  bankAccount.accountHolder = inpName;
  bankAccount.balance = inpDeposit;

  document.querySelector('.js-account-name').textContent=`${bankAccount.accountHolder}`;

  alert(`Account has been created Successfully 
        Name: ${bankAccount.accountHolder}
        Deposit: ₹${bankAccount.balance}
        Thankyou for creating the Bank account`);

  document.getElementById('accountName').value='';
  document.getElementById('initialDeposit').value='';

  document.querySelector('.signup').style.display='none';
  document.querySelector('.js-work').style.display='block';
  document.querySelector('.js-createAccount').style.display='none';
  document.querySelector('.service').style.display='flex';
}


function depositingMoney(){
  const depositInp = document.getElementById('depositMoney').value;

  if (depositInp < 0 || depositInp ===''){
    alert('Enter a Valid Amount')
  }

  document.querySelector('.js-deposit').style.display='none';
  document.querySelector('.js-depositing').style.display='none';
  showAllSection()
  document.querySelector('.js-createAccount').style.display='none';

  alert(`₹${depositInp} Deposited to your Account`)

  bankAccount.balance = eval(bankAccount.balance - (-depositInp))
}


function withdrawingMoney(){
  const withdrawInp = document.getElementById('withdrawMoney').value;

  if (withdrawInp < 0 || withdrawInp ===''){
    alert('Enter a Valid Amount')
  } else if(withdrawInp > bankAccount.balance){
    alert(`₹${withdrawInp} is not in your bank account`)
  }else{
    document.querySelector('.js-withdraw').style.display='none';
  document.querySelector('.js-withdrawing').style.display='none';
  showAllSection()
  document.querySelector('.js-createAccount').style.display='none';

  alert(`₹${withdrawInp} withdraw from your Account`)

  bankAccount.balance = eval(bankAccount.balance - withdrawInp)
  }

  withdrawInp.textContent='';
}

function back(){
  showAllSection();
  document.querySelector('.js-balance-info').style.display='none';
  document.querySelector('.js-back-btns').style.display='none';
  document.querySelector('.js-createAccount').style.display='none';
}