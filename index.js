const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5001;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.text({ type: 'application/logplex-1' })) // Use body-parser to parse the specified content type
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/body', (req, res) => {
    // Log the Syslog-formatted messages
    console.log('Syslog Message Received:', req.body);

    res.send('Syslog Message Logged in Console');
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
