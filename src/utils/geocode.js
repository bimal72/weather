
const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmltYWxzaGFoNzIiLCJhIjoiY2toa2Q1ODIwMDVpdzM0bG5raTk5ajZycSJ9.pD4bBCq2FkDlQi3HPKw__Q&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location serivce!', undefined);
    } else if (!body.features || body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const feature = body.features[0];
      const latitude = feature.center[1];
      const longitude = feature.center[0];
      const location = feature.place_name;
      callback(undefined, { latitude, longitude, location })
    }
  })

}

module.exports = geocode;