const { config } = require('dotenv');
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter
//   const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 587,
//     auth: {
//       user: "api",
//       pass: "b6696ca8a169c1dd3b79f8b97a240ec5"
//     }
//   });
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

//   console.log(transporter);

  // 2. Define the email options
  const mailOptions = {
    from: 'touric <touric@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
