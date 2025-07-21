app.get('/test-email', async (req, res) => {
  try {
    await sendMail('receiver@example.com', 'Test Email', '<h1>Hello from Job Fiction!</h1>');
    res.send('Email sent successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});
