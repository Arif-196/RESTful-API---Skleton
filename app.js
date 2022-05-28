const http = require('http');
const express =  require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

const hostname = process.env.DB_HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express() // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

routes(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default API route',
}));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});