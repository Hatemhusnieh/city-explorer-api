const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
const jsonData = require('./data/weather.json');
const superagent = require('superagent');
// this is needed. 
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
//

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.get('/', function (req, res) {
  res.send('hello from Hatem <3');
});


app.get('/weather', (req, res) => {
  const weatherForecast = superagent(`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=38.123&lon=-78.543`);
  // console.log(weatherForecast);
  superagent.get(weatherForecast).then(data => {
    res.send(data.body);
  }).catch(console.error);
});


const port = process.env.PORT || 3666;
app.listen(port)