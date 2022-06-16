const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.get('/admin', (req, res) => {
  res.send('This is the top secret admin page');
});

app.listen(3000);
