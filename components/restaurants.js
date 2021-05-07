'use strict';

const superagent = require('superagent');
require('dotenv').config();
// cache memory
const cache = require('../data/restaurantCache');
const YELP_API_KEY = process.env.YELP_API_KEY

const getRestaurants = (req, res) => {
  const restUrl = 'https://api.yelp.com/v3/businesses/search';
  const token = YELP_API_KEY;
  const city = req.query.location;
  const params = {
    term : 'restaurants',
    location : city
  };
  superagent.get(restUrl).query(params).set({Authorization: `Bearer ${token}`}).then(restRes => {
    if (cache[city]){
      console.log('getting restaurants from the cache');
      res.status(200).send(cache[country]);
    } else {
      console.log('getting restaurants from the API');
      const restaurantsList = restRes.body.businesses.map(data => new Restaurant(data));
      console.log(restaurantsList);
      cache[city] = restaurantsList;
      res.send(restaurantsList);
    }
  }).catch(error => { 'No Information Found !' });
}

class Restaurant {
  constructor() {
    this.name = data.name;
    this.img = data.image_url;
    this.url = data.url;
    this.rating = data.rating;
    this.food = data.categories
  }
}

module.exports = getRestaurants;
