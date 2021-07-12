'use strict';

const superagent = require('superagent');
require('dotenv').config();
const jsonData = require('../data/weather.json');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
// cache memory
const cache = require('../data/weatherCache');


const getWeatherData = (req, res) => {
  const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const params = {
    key: WEATHER_BIT_KEY,
    lat: lat,
    lon: lon
  };
  // console.log(cache);
    if(cache[[lat,lon]]){
      // console.log('getting weather from the cache');
      res.status(200).send(cache[[lat,lon]])
    }else{
      superagent.get(forecastUrl).query(params).then(weatherRes => {
      // console.log('getting weather from the API');
      const forecast = weatherRes.body.data.map(data => new Forecast(data));
      cache[[lat,lon]] = forecast;
      res.send(forecast)
  }).catch(error => {
    const forecast = jsonData.data.map(data => new Forecast(data));
    res.send(forecast)
  });
}
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
