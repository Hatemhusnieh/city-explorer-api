'use strict';

const superagent = require('superagent');
require('dotenv').config();
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY;
// cache memory
const cache = require('../data/moviesCache');


const getMoviesData = (req, res) => {
  const movieUrl = `https://api.themoviedb.org/3/search/movie`;
  const country = req.query.query;
  const params = {
    api_key: MOVIE_DB_KEY,
    query: country
  };
  // console.log(cache);
  if(cache[country]){
    // console.log('getting movies from the cache');
    res.status(200).send(cache[country]);
  }else{
      superagent.get(movieUrl).query(params).then(movieRes => {
      // console.log('getting movies from the API');
      const moviesList = movieRes.body.results.map(data => new Movie(data));
      cache[country] = moviesList;
      res.send(moviesList);
    }
  ).catch(error => { console.error });
}
};


class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.poster = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
    this.rating = data.vote_average;
    this.releaseDate = data.release_date;
  }
}

module.exports = getMoviesData;
