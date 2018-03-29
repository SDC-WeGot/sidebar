//require('newrelic');
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');
//import renderer from '../client/helpers/renderer.js';
//import { renderToString } from 'react-dom/server';

app.use(cors());

app.use(bodyParser.json());
// app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

app.use(express.static('client/dist'));



app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist'));
  //res.sendFile(path.resolve('../public/app.js'));
  //app.use(express.static(path.join(__dirname, '../public')));
});

app.use('/restaurants', restaurantsRouter);

app.use('/api/restaurants', restaurantsApiRouter);



var port = process.env.PORT || 3003;
app.listen(3003, () => { console.log('Listening on http://localhost:' + port); });
