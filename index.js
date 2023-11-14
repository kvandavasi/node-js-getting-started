const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001
const http = require('http');


const server = http.createServer((req, res) => {
  // Check if the request is for the /body endpoint
  if (req.url === '/body' && req.method === 'POST') {
    let body = '';

    // Collect data chunks from the request
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // Process the request once it's complete
    req.on('end', () => {
      // Assuming Syslog messages are in the request body
      try {
        const syslogMessages = parseSyslogMessages(body);
        console.log('Received Syslog messages:');
        syslogMessages.forEach((message, index) => {
          console.log(`Message ${index + 1}: ${message}`);
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Syslog messages processed successfully.');
      } catch (error) {
        console.error('Error processing Syslog messages:', error.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  } else {
    // Handle other endpoints or methods
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
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
