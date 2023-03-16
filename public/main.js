const form = document.getElementById("paymentForm");
const email = document.getElementById("pay-mail");

const cardTypes = document.querySelectorAll('input[name="card-type"]');
const cardNumber = document.getElementById("card-number");
const cardPin = document.getElementById("card-pin");
const expiryDate = document.getElementById("expiration-date");
const cvv = document.getElementById("card-cvv");

const typeError = document.getElementById("type-error");

//add extra stroke to expiry date.
expiryDate.addEventListener('keydown', (event) => {
   
    const key = event.keyCode || event.charCode;

    if (key !== 8 && key !== 46) {
      if (expiryDate.value.length == 2) {
        expiryDate.value = expiryDate.value + "/";
      }
    }

    if ((key == 8 || key == 46) && expiryDate.value.length === 4) {
      expiryDate.value = expiryDate.value.slice(0, 3);
    }  
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let cardTypeValue;
    for (const cardType of cardTypes) {
      if (cardType.checked) {
        cardTypeValue = cardType.value;
        break;
      }
    }
    typeError.innerText = cardTypeValue
      ? ''
      : `Please choose card type`;


    const data = {
      email: email.value,
      cardType: cardTypeValue,
      cardNumber: cardNumber.value,
      cardPin: cardPin.value,
      expiryDate: expiryDate.value,
      cvv: cvv.value,
    };
    
   
    try {
      let response = await axios({
        method: "post",
        url: "/payment",
        data: data,
      });

       //console.log(response);
      if(response.data.status === "401"){
        alert(response.data.message); 
      }

      if(response.data.status === "200"){
        alert(response.data.message);
        window.location.replace("/pay");
      }
      
    } catch (error) {
      console.log(error);
    } 

     
});

//validate email
email.addEventListener('keyup', (event) => {
    const emailError = document.getElementById("email-error");
    const validMailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validMailFormat.test(email.value)) {
      emailError.innerText = "Please enter a valid email address.";
    }else{
        emailError.innerText = '';
    }
});

// validate card number
cardNumber.addEventListener('keyup', (event) => {
  const cardError = document.getElementById("card-error");
  if (cardNumber.value.length < 16 || cardNumber.value.length > 16) {
    cardError.innerText = "Please insert the 16 Digit PIN.";
  }else{
      cardError.innerText = '';
  }
});

//validate pin

cardPin.addEventListener('keyup', (event) => {
  const pinError = document.getElementById("pin-error");
  if (cardPin.value.length < 4 || cardPin.value.length > 4) {
    pinError.innerText = "Please ensure it is a 4 digit pin";
  }else{
      pinError.innerText = '';
  }
});

//validate expiry date
expiryDate.addEventListener('keyup', (event) => {
  const expError = document.getElementById("expiration-error");
  if (expiryDate.value.length < 5 || expiryDate.value.length > 5) {
    expError.innerText = "Insert month and year e.g 01/23";
  }else{
    expError.innerText = '';
  }
});

//validate cvv
cvv.addEventListener('keyup',(event) => {
  const cvvError = document.getElementById("cvv-error");
  if (cvv.value.length < 3 || cvv.value.length > 3) {
    cvvError.innerText = "Please ensure it is a 3 digit number";
  }else{
    cvvError.innerText = '';
  }
});
