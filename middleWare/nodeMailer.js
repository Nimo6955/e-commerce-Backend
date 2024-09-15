const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "singhsukhpal20012001@gmail.com",
    pass: "dwfvcuggqdozbqtz",
  },
});

async function sendMail(to, subject, text, html) {

  const info = await transporter.sendMail({
    from: 'singhsukhpal20012001@gmail.com', 
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail }