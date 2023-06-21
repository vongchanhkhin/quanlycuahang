const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config");
require("dotenv/config");

exports.sendMail = (to, subject, htmlContent) => {
  // Cấu hình transporter để gửi email
  const transporter = nodemailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  // Tạo nội dung email
  const mailOptions = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
};
