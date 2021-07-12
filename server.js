'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// Function
const getWeatherData = require('./components/weather');
const getMoviesData = require('./components/movies');
const getRestaurants = require('./components/restaurants');
// port to up;oad on data
const port = process.env.PORT || 3666;


app.get('/', function (req, res) {
  res.send('This is the start of a demo, the road of achieving my dreams <3');
});


app.get('/weather', getWeatherData);
app.get('/movies', getMoviesData);
app.get('/restaurants', getRestaurants);


app.listen(port,()=>{
  console.log('Bruh!');
});
