const superagent = require('superagent');
require('dotenv').config();
const jsonData = require('../data/weather.json');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;



const getWeatherData = (req, res) => {
  const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
  superagent.get(forecastUrl).then(weatherRes => {
    const forecast = weatherRes.body.data.map(data => new Forecast(data));
    res.send(forecast)
  }).catch(error => {
    const forecast = jsonData.data.map(data => new Forecast(data));
    res.send(forecast)
  });
};

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
    this.high = data.app_max_temp;
    this.low = data.app_min_temp;
  }
}



module.exports = getWeatherData;
