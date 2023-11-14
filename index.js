const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001
const http = require('http');
const bodyParser = require('body-parser');


// Parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint for handling POST requests to /body
app.post('/body', (req, res) => {
  const body = req.body;

  // Assuming Syslog messages are in the request body
  try {
    const syslogMessages = parseSyslogMessages(body);
    console.log('Received Syslog messages:');
    syslogMessages.forEach((message, index) => {
      console.log(`Message ${index + 1}: ${message}`);
    });
    res.status(200).send('Syslog messages processed successfully.');
  } catch (error) {
    console.error('Error processing Syslog messages:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Function to parse Syslog-formatted messages
function parseSyslogMessages(syslogData) {
  // Implement your Syslog parsing logic here
  // For simplicity, let's assume each line in the body is a separate Syslog message
  return syslogData.split('\n').filter((message) => message.trim() !== '');
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
