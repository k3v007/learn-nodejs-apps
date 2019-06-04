const request = require("request")

results = []

findCoordinates = (location, callback) => {
    location = location.split(' ').join('%20');
    const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAPBOX_TOEKN}`;

    request({
        method: 'GET',
        uri: locationURL,
        json: true
    },
        (error, response, body) => {
            if (error) {
                callback("Unable to connect to Weather services!", undefined)
            } else if (response.statusCode != 200) {
                callback(body.message, undefined)
            } else {
                cities = body.features;
                cities.forEach((city) => {
                    results.push(
                        {
                            place_name: city.place_name,
                            coordinates: city.geometry.coordinates
                        }
                    );
                });
            }
            callback(undefined, results)
        })
}

module.exports = findCoordinates