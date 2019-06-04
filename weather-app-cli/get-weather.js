const request = require("request")


const getWeather = (coord, unit, callback) => {
    const lon = coord[0]
    const lat = coord[1]
    var weatherURL
    if (unit == "°C") {
        weatherURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_TOKEN}/${lat},${lon}?units=si`;
    }else {
        weatherURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_TOKEN}/${lat},${lon}`;
    }
    

    request({
        method: 'GET',
        uri: weatherURL,
        json: true
    },
        (error, response, body) => {
            if (error) {
                callback("Unable to connect to Weather services!", undefined)
            } else if (response.statusCode != 200) {
                callback(body.error, undefined)
            } else {
                report = {
                    temperature: body.currently.temperature,
                    summary: body.currently.summary,
                    icon: body.currently.icon,
                    precipProbability: body.currently.precipProbability
                }
                callback(undefined, report)
            }
        })
}

module.exports = getWeather
