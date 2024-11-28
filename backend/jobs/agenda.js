const Agenda = require('agenda');
const nodemailer = require('nodemailer');

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'jobs' },
});

agenda.define('send email', async (job) => {
  const { email, subject, body } = job.attrs.data;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Start the Agenda scheduler
agenda.start();

module.exports = agenda;
