// function sendOTP() {
//   const mobile = document.getElementById("mobile").value;

//   fetch('/backend/otp.js/send', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ mobile })
//   }).then(res => {
//     if (res.ok) {
//       alert('OTP sent!');
//       document.getElementById("otpSection").style.display = "block";
//     }
//   });
// }

// function verifyOTP() {
//   const otp = document.getElementById("otp").value;

//   fetch('/backend/otp.js/verify', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ otp })
//   }).then(res => {
//     if (res.ok) {
//       alert('Login Successful!');
//       window.location.href = "dashboard.html";
//     } else {
//       alert('Invalid OTP');
//     }
//   });
// }


function sendOTP() {
  const mobile = document.getElementById('mobile').value;
  if (!mobile.match(/^\d{10}$/)) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }

  // Simulate sending OTP (replace with API call)
  console.log("Sending OTP to", mobile);
  
  document.getElementById('otpSection').style.display = 'block';
}

function verifyOTP() {
  const otp = document.getElementById('otp').value;
  if (!otp) {
    alert('Please enter the OTP');
    return;
  }

  // Simulate OTP verification (replace with API call)
  console.log("Verifying OTP:", otp);
  
  // Mock response
  alert('OTP Verified! Redirecting...');
}

