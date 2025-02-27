const path = require('path');
const express = require('express');
const routes = require('./routes');
const db = require('./db');
const logger = require('morgan');

/*---require() function imports and middleware below--*/
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

/*--- app.use() middleware below ---*/
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use('/api', routes);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
db.on('error', console.log.bind(console, 'MongoDB connection error:'));
app.listen(PORT, () => console.log(`Hello, port ${PORT}. I'm listening...`));
