const otpForm = document.getElementById("paymentForm");
const payEmail = document.getElementById("pay-mail");
const payOTP = document.getElementById("pay-otp");

otpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    data = {
        email: payEmail.value,
        otp: payOTP.value
    };

    try {
        let response = await axios({
          method: "post",
          url: "/payment/validateOTP",
          data: data,
        });

        if (response.data.status === "401") {
          alert(response.data.message);
        }

        if (response.data.status === "200") {
          window.location.replace("/success");
        }
    } catch (error) {
        console.log(error);
    }
    
});

//validate Email before submission
payEmail.addEventListener('keyup', () => {
    const emailError = document.getElementById("email-error");
    const validMailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validMailFormat.test(payEmail.value)) {
      emailError.innerText = "Please enter a valid email address.";
    } else {
      emailError.innerText = "";
    }
});


//validate OTP before submission 
payOTP.addEventListener("keyup", () => {
  const otpError = document.getElementById("otp-error");
  if (payOTP.value.length < 6 || payOTP.value.length > 6) {
    otpError.innerText = "Please insert the 6 digit OTP.";
  } else {
    otpError.innerText = "";
  }
});