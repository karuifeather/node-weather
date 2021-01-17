const request = require('postman-request');

const token =
  'pk.eyJ1Ijoia2VtdW1ha2lpaSIsImEiOiJja2psMW5wdW8wMWVlMnVseTZsbHZpYzFiIn0.JwU5WzgEZm8Py3s1eeyBBQ';

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${token}&limit=1`;

  request({ url: geoUrl, json: true }, (error, res) => {
    if (error) {
      callback("Make sure you're connected to internet.", undefined);
    } else if (res.body.features.length === 0) {
      callback('Unable to find the coordinates. Try another search.');
    } else {
      const { place_name: location, center } = res.body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, {
        location,
        longitude,
        latitude,
      });
    }
  });
};

module.exports = geocode;
