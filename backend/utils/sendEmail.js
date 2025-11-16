const axios = require('axios');

const sendEmail = async (options) => {
  // The Brevo API Endpoint (This is a website URL, so it never gets blocked)
  const url = 'https://api.brevo.com/v3/smtp/email';

  const emailData = {
    sender: {
      name: 'Expense Tracker App',
      email: process.env.EMAIL_USER, // Must be your verified sender in Brevo
    },
    to: [
      {
        email: options.email, // The user receiving the OTP
      },
    ],
    subject: options.subject,
    htmlContent: `<p>${options.message}</p>`, // Brevo requires HTML content
  };

  try {
    await axios.post(url, emailData, {
      headers: {
        'api-key': process.env.BREVO_API_KEY, // Authenticate with the Key
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log('Email sent successfully via API');
  } catch (error) {
    // Log the exact error from Brevo if it fails
    console.error('Email Error:', error.response ? error.response.data : error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;