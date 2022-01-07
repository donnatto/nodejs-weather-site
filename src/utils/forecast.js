const request = require('request');
const forecastAPIKey = process.env.FORECAST_API_KEY

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=' + forecastAPIKey + '&query=' + lat + ',' + long + '&units=m'
  request(url, { json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const current = body.current
      callback(
        undefined,
        current.weather_descriptions[0] + '. It currently is ' + current.temperature + ' degrees out. It feels like ' +
        current.feelslike + ' degrees out. The humidity is ' + current.humidity + '%.')

    }
  })
}

module.exports = forecast