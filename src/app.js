const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebar view engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bimal'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Bimal'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Bimal'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }


  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

    if (error) {
      return res.send({
        error: error
      })
    }

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        forcast: forcastData,
        location: location,
        address: req.query.address
      });
    })

  });



})

app.get('/products', (req, res) => {
  console.log(req.query.name);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Bimal',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Bimal'
  })
})


app.listen(3000, () => {
  console.log('Server is up on port 3000');
})