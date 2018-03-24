var database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.find({ 'placeId': id })
    .then((result) => {
      return result[0];
    });
};
