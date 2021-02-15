require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  if (!process.env.POSTFIX_HOST) {
    throw Error('You should first fill the .env-example file and the rename it to .env');
  }

  const transporter = nodemailer.createTransport({
      host: process.env.POSTFIX_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.POSTFIX_USER,
        pass: process.env.POSTFIX_PASSWORD
      }
  });

  const result = await transporter.sendMail({
    from: `"Stackhero Test" <stackhero-test@${process.env.POSTFIX_DOMAIN}>`, // sender address
    to: process.env.POSTFIX_EMAIL_TO, // list of receivers
    subject: 'This is a test email', // Subject line
    text: 'Hi, this is a test email from a Stackhero instance', // plain text body
    html: 'Hi, this is a test email from a <b>Stackhero</b> instance' // html body
  });

  console.log(`Message sent to ${process.env.POSTFIX_EMAIL_TO} with id %s`, result.messageId);
})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  process.exit(1);
});