const agenda = require('../jobs/agenda');

const scheduleEmail = async (req, res) => {
  const { time, email, subject, body } = req.body;

  if (!time || !email || !subject || !body) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await agenda.schedule(time, 'send email', { email, subject, body });
    res.status(200).json({ message: 'Email scheduled successfully!' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ error: 'Failed to schedule email.' });
  }
};

module.exports = { scheduleEmail };
