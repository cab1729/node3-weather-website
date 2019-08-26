const request = require('request');

const geocode = (address, callback) => {
    const access_token = 'pk.eyJ1IjoiY2FiMTcyOSIsImEiOiJjanpmbWtqZnAwOW00M2lzOW02OGFuYnZvIn0.Dqibpx6SORRRFNdJaCc4rA';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address)
        + '.json?access_token=' + access_token + '&limit=1';

    request(url, {}, (error, response, body) => {

        const data = JSON.parse(body);
        var latitude = 0;
        var longtiude = 0;

        if (error) {
            callback('Unable to access location service', undefined);
        } else if (data.message) {
            callback(data.message, undefined);
        } else if (data.features.length === 0) {
            callback('No location data returned', undefined);
        } else {
            latitude = data.features[0].center[1];
            longitude = data.features[0].center[0];
            callback(undefined, {
                latitude,
                longitude,
                location: data.features[0].place_name
            });
        }

    })
}

module.exports = geocode;