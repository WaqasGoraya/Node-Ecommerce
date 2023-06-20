import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'leadtest77@gmail.com',
        pass: 'cafmqxwzdueovdku',
    },
});
// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP ERROR',error);
  } else {
    console.log("SMTP Connected");
  }
});
export default transporter;