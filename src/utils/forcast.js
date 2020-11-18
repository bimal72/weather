
const request = require('request');

const forcast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3a82cc498174ed25bd09a0bcbbf5bd4f&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to a weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const current = body.current;
      callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The current humidity is ${current.humidity}%.`)
    }
  });
}

module.exports = forcast;