'use strict';

const superagent = require('superagent');
require('dotenv').config();
// cache memory
const cache = require('../data/restaurantCache');
const YELP_API_KEY = process.env.YELP_API_KEY

const getRestaurants = (req, res) => {
  const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
  const token = YELP_API_KEY;
  const city = req.query.location;
  const params = {
    term: 'restaurants',
    location: city
  };
  if(cache[city]){
    // console.log('getting restaurants from the cache');
    res.status(200).send(cache[city]);
  }else{
    superagent.get(yelpUrl).query(params).set({Authorization: `Bearer ${token}`}).then(restRes => {
      const restaurantsList = restRes.body.businesses.map((data, idx) =>{ 
      if(idx < 20){
        return new Restaurant(data)
      }
    });
    cache[city] = restaurantsList;
    res.send(restaurantsList);
    }).catch(error => { console.error });
  }
}

class Restaurant {
  constructor(data) {
    this.name = data.name;
    this.img = data.image_url;
    this.url = data.url;
    this.rating = data.rating;
    this.food = data.categories[0].title
  }
}

module.exports = getRestaurants;
