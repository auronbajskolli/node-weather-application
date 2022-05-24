//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");
const log = console.log;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dc8f6d9de0b354441a1fdc3ef40ed7a5&query=${latitude}, ${longitude}}`;
  const json = true;
  request({ url, json }, (error, { body }) => {
    if (error) {
      callback("Shqipe tu ka shym rrjeti", undefined);
    } else if (body.error) {
      callback(undefined, "Gabim ne search");
    } else {
      callback(
        undefined, "Koha esht "+
        body.current.weather_descriptions[0] +
          " temperatura ne ket moment esht " +
          body.current.temperature + " Celsisus "+
          " ama doket si " +
          body.current.feelslike + " Celsisus"
      );
    }
  });
};

// forecast(21.166191, 42.667542, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forecast;
