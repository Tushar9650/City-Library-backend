const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: 'tusharsinghota9650@gmail.com',
    pass: 's1v36yOfQnJLgRUt'
  }
});

function sendEmail(studentPayableAmount, studentBalanceAmount,studentPaidAmount,studentEmail) {

  const mailOptions = {
    from: 'CityLibrary@gmail.com',
    to: studentEmail,
    subject: 'You fees are submitted successfully to the library',
    html: `<h2>Invoice for Fee Details</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Description</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Amount (Rs.)</th>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Payable Amount</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentPayableAmount}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Balance Amount</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentBalanceAmount}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Paid Amount</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentPaidAmount}</td>
      </tr>
    </table>
    <p>Thank you for your payment. If you have any questions, feel free to contact us.</p>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

}

function sendRemovalEmail(studentName, studentEmail) {
  const mailOptions = {
    from: 'CityLibrary@gmail.com',
    to: studentEmail,
    subject: 'Notice of Removal from the Library',
    html: `
      <p>Dear ${studentName},</p>
      <p>We regret to inform you that your membership has been revoked from City Library due to specific reasons (optional to mention).</p>
      <p>Effective immediately, you are no longer permitted to access the library facilities and services. We kindly request that you return any borrowed materials to avoid any late fees or penalties.</p>
      <p>If you have any concerns or wish to discuss this matter further, please feel free to contact us at your convenience.</p>
      <p>Thank you for your understanding.</p>
      <p>Sincerely,</p>
      <p>City Library</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function sendRegistrationEmail(studentName, studentEmail, seatNumber, joiningDate, studentPayableAmount, studentBalanceAmount,studentPaidAmounts) {
  const mailOptions = {
    from: 'CityLibrary@gmail.com',
    to: studentEmail,
    subject: 'Welcome to City Library!',
    html: `
      <p>Dear ${studentName},</p>
      <p>Welcome to City Library! We are pleased to inform you that your registration has been successfully processed.</p>
      <p>Your details:</p>
      <ul>
        <li>Seat Number: ${seatNumber}</li>
        <li>Joining Date: ${joiningDate}</li>
       </ul>
       <h2>Invoice for Fee Details</h2>
       <table style="border-collapse: collapse; width: 100%;">
         <tr>
           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Description</th>
           <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Amount (Rs.)</th>
         </tr>
         <tr>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Payable Amount</td>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentPayableAmount}</td>
         </tr>
         <tr>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Balance Amount</td>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentBalanceAmount}</td>
         </tr>
         <tr>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Paid Amount</td>
           <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${studentPaidAmounts}</td>
         </tr>
       </table>     
      <p>Thank you for joining our library community!</p>
      <p>Best regards,</p>
      <p>City Library</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.post('/register-user', (req, res) => {
  const { studentName, studentEmail, seatNumber, joiningDate, studentPayableAmount, studentBalanceAmount,studentPaidAmounts} = req.body;

  // Call the sendEmail function with the provided data
  sendRegistrationEmail(studentName, studentEmail, seatNumber, joiningDate, studentPayableAmount, studentBalanceAmount,studentPaidAmounts);

  res.json({ success: true }); // Send a response indicating success
});



app.post('/send-email', (req, res) => {
  const { payableAmount, balanceAmount, paidAmount, email } = req.body;

  // Call the sendEmail function with the provided data
  sendEmail(payableAmount, balanceAmount, paidAmount, email);

  res.json({ success: true }); // Send a response indicating success
});

app.post('/send-user-remove', (req, res) => {
  const { studentName, studentEmail } = req.body;

  // Call the sendRemovalEmail function with the provided data
  sendRemovalEmail(studentName, studentEmail);

  res.json({ success: true }); // Send a response indicating success
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sendEmail(1000,100,900,'tusharsinghota9650@gmail.com')

// export default sendEmail;