const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 
        'https://api.darksky.net/forecast/70e0a096b75be3b1f80a5b8ac769ee21/' 
        + encodeURIComponent(latitude) 
        + ',' 
        + encodeURIComponent(longitude);

    request(url, {}, (error, response, body) => {

        const data = JSON.parse(body);

        if (error) {
            callback('Unable to access weather service', undefined);
        } else if (data.error) {
            callback(data.error, undefined);
        } else {
            callback(undefined, { 
                summary: data.daily.data[0].summary, 
                currentTemperature: data.currently.temperature,
                feelsLike: data.currently.apparentTemperature,
                precipProbability: data.currently.precipProbability 
            });
        }

    });
}

module.exports = forecast;