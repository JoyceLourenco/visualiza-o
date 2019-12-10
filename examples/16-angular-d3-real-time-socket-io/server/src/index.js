const app = require('express')();
const http = require('http').Server(app);
const market = require('./lib/market');

const hostname = 'localhost';
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/market', (req, res) => {
  res.send(market.marketPositions);
});

http.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});