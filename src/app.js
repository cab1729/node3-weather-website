const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'cab1729'
    });
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me Bitches',
        name: 'cab1729'
    });

});

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Page bitches',
        name: 'cab1729',
        message: 'NO SOUP FOR YOU!! COME BACK ONE YEAR!!'
    });

});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.status(400).send({
            error: 'You must provide an address value'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, {summary, currentTemperature: temp, feelsLike, precipProbability: chanceRain} ={}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            return res.send({
                location,
                summary,
                temperature: temp,
                feelsLike,
                chanceRain
            })
        })
    })

    // res.send({
    //     location: req.query.address,
    //     temp: '-273.15 Celcius',
    //     summary: 'It\'s OK'
    // });

});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.status(400).send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {

    res.status(404).render('404', {
        title: 'Help Page bitches',
        name: 'cab1729',
        message: 'Help topic not found'
    })
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        name: 'cab1729',
        message: 'Oops! Page not found'
    });
});

app.listen(3000, () => {
    console.log('it\'s running on port 3000 pendejo!!!');
});