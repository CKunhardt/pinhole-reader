const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/reader', (req, res) => {
  res.render('reader');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => console.log(`Pinhole reader running on port ${port}`));