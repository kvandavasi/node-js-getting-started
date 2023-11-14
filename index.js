const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Require body-parser for parsing POST request bodies

const PORT = process.env.PORT || 5001;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true })) // Use body-parser middleware for parsing URL-encoded bodies
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/body', (req, res) => {
    // Access the request body and print it
    console.log('Request Body:', req.body);
    res.send('Request Body Printed in Console'); // Send a response to the client
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
