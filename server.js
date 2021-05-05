const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// Function
const getWeatherData = require('./components/weather');
const getMoviesData = require('./components/movies');
// port to up;oad on data
const port = process.env.PORT || 3666;


app.get('/', function (req, res) {
  res.send('This is a demo, and my start on the road od achieving my dreams <3');
});


app.get('/weather', getWeatherData)
app.get('/movies', getMoviesData)


app.listen(port)