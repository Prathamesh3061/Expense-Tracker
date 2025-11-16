const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create Transporter with Port 587 (TLS)
  // This is often more reliable on cloud servers than 465
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Helps if Render IP has issues
    }
  });

  // 2. Verify connection (Helps debugging)
  try {
      await transporter.verify();
      console.log('SMTP Connection established successfully.');
  } catch (error) {
      console.error('SMTP Connection Failed:', error);
      throw new Error('Email service unreachable');
  }

  const message = {
    from: `Expense Tracker <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send Email
  try {
      const info = await transporter.sendMail(message);
      console.log('Email sent: %s', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;