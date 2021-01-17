const request = require('postman-request');

const key = '613ba3b982fb02a9acfc9f6024e8b38f';

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Connect to the internet and try again.', undefined);
    } else if (body.error) {
      callback('Unable to find the given location.', undefined);
    } else {
      const { name: city, localtime: time } = body.location;
      const {
        temperature: temp,
        humidity,
        precip,
        weather_descriptions: desc,
      } = body.current;

      const summary = `${desc[0]}. The temperature in ${city} is ${temp}C with humidity of ${humidity} and precipitation of ${precip}, as recorded at its local time of ${time}.`;
      callback(undefined, summary);
    }
  });
};

module.exports = forecast;
