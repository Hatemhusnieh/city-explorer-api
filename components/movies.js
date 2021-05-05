const superagent = require('superagent');
require('dotenv').config();
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;



const getMoviesData = (req, res) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${req.query.query}`;
  superagent.get(movieUrl).then(movieRes => {
    const moviesList = movieRes.body.results.map(data => new Movie(data));
    res.send(moviesList)
  }).catch(error => { console.error });
};


class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.poster = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
    this.rating = data.vote_average
  }
}

module.exports = getMoviesData;
