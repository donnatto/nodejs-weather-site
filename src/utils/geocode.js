const request = require('request')
const geocodeAPIKey = process.env.GEOCODE_API_KEY

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geocodeAPIKey + '&limit=1'
  request(url, {json: true}, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const feature = body.features[0];
      callback(undefined, {
        latitude: feature.center[1],
        longitude: feature.center[0],
        location: feature.place_name
      })
    }
  })
}

module.exports = geocode