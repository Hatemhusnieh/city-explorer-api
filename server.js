const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
const jsonData = require('./data/weather.json');
const superagent = require('superagent');
const port = process.env.PORT || 3666;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;

class Forecast {
  constructor(data){
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

class Movie{
  constructor(data){
    this.title = data.original_title;
    this.overview = data.overview;
    this.poster = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
    this.rating = data.vote_average
  }
}

app.get('/', function (req, res) {
  res.send('hello from Hatem <3');
});


app.get('/weather', (req, res) => {
  const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
  superagent.get(forecastUrl).then( weatherRes => {
    const forecast = weatherRes.body.data.map( data => new Forecast(data));
    res.send(forecast)
  }).catch(error => {
    const forecast = jsonData.data.map( data => new Forecast(data));
    res.send(forecast)
  });
});


app.get('/movies', (req, res) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${req.query.query}`;
  superagent.get(movieUrl).then( movieRes => {
    const moviesList = movieRes.body.results.map( data => new Movie(data));
    res.send(moviesList)
  }).catch(error => {console.error});
});


app.listen(port)