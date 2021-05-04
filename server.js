const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
const jsonData = require('./data/weather.json');

app.get('/', function (req, res) {
  res.send('hello from Hatem <3');
});

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.get('/weather', (req, res) => {
  const weatherForecast = jsonData.data.map(elm => {return new Forecast(elm)});
  res.send(weatherForecast);
});

const port = process.env.CLIENT_PORT || 3666;

app.listen(port)