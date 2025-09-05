// const express = require('express');
// const bodyParser = require('body-parser');
// const sql = require('mssql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // SQL Server connection config
// const dbConfig = {
//     user: 'sa',
//     password: '123',
//     server: './',
//     database: 'BROSONETECH',
//     options: {
//         encrypt: true, // if Azure SQL
//         trustServerCertificate: true
//     }
// };

// // Send OTP
// app.post('/send-otp', async (req, res) => {
//     const { mobile } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP

//     try {
//         let pool = await sql.connect(dbConfig);
//         await pool.request()
//             .input('mobile', sql.VarChar, mobile)
//             .input('otp', sql.Int, otp)
//             .query(`INSERT INTO OTP_Table (mobile, otp) VALUES (@mobile, @otp)`);

//         // TODO: Send OTP via SMS API like Twilio, Fast2SMS, etc.
//         res.json({ success: true, otp }); // Send otp for testing
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// // Verify OTP
// app.post('/verify-otp', async (req, res) => {
//     const { mobile, otp } = req.body;

//     try {
//         let pool = await sql.connect(dbConfig);
//         const result = await pool.request()
//             .input('mobile', sql.VarChar, mobile)
//             .input('otp', sql.Int, otp)
//             .query(`SELECT * FROM OTP_Table WHERE mobile = @mobile AND otp = @otp`);

//         if (result.recordset.length > 0) {
//             res.json({ success: true, message: 'OTP Verified!' });
//         } else {
//             res.json({ success: false, message: 'Invalid OTP' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//     }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));


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



// async function sendOTP() {
//   const mobile = document.getElementById('mobile').value;
//   if (!mobile.match(/^\d{10}$/)) {
//     alert('Please enter a valid 10-digit mobile number.');
//     return;
//   }

//   const response = await fetch('http://localhost:3000/send-otp', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ mobile })
//   });
//   const data = await response.json();

//   if (data.success) {
//     document.getElementById('otpSection').style.display = 'block';
//     console.log("OTP sent:", data.otp); // For testing only
//   } else {
//     alert('Error sending OTP');
//   }
// }

// async function verifyOTP() {
//   const mobile = document.getElementById('mobile').value;
//   const otp = document.getElementById('otp').value;

//   const response = await fetch('http://localhost:3000/verify-otp', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ mobile, otp })
//   });
//   const data = await response.json();

//   if (data.success) {
//     alert('OTP Verified! Redirecting...');
//     // window.location.href = '/dashboard.html';
//   } else {
//     alert('Invalid OTP');
//   }
// }