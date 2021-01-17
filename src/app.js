const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.use('*/css', express.static(`${publicPath}/css`));
app.use('*/img', express.static(`${publicPath}/img`));

app.get('', (req, res) => {
  res.render('weather', {
    title: 'Weather',
  });
});

app.get('/home', (req, res) => {
  res.render('index', {
    fullName: 'Aashaya Aryal',
    title: 'Portfolio',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About mE',
    fullName: 'Aashaya Aryal',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message:
      "Don't worry, sweetheart! You're in the right place! Go get that thing!!",
    title: 'Help Page',
    fullName: 'Aashaya Aryal',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(404).send({
      data: null,
      error: 'You need to provide an address.',
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        data: null,
        error,
      });
    }

    forecast(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({
          data: null,
          error,
        });
      }

      res.send({
        location,
        forecast: weatherData,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('lost', {
    message: 'It seems we cannot find that article. :(',
  });
});

app.get('*', (req, res) => {
  res.render('lost', {
    message: 'Page does not exist! Go to Home page for directions!',
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
