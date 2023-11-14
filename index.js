const express = require('express');
const path = require('path');
const winston = require('winston');

const PORT = process.env.PORT || 5001;

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // This will format the log message as JSON
  ),
  transports: [new winston.transports.Console()],
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/body', (req, res) => {
    // Log the request body in syslog format
    logger.info({
      message: 'Request Body Received',
      requestBody: req.body,
      // You can add more fields like timestamp, hostname, etc. as needed
    });

    res.send('Request Body Logged in Console');
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
