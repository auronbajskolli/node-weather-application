const request = require("request");
const geoCode = (name, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(name) +
    ".json?access_token=pk.eyJ1IjoiYXVyb25iIiwiYSI6ImNsMzh6anBudjA0dnMzanFtYnF4bm1jNmUifQ.drUdYaahTjEIM4yJXO4hLg&limit=1";
  request({ url, json: true }, (rejected, { body }) => {
    //e kem ba body se kem ba
    //destructuring dmth mas ni kohe kur te lexoj nese e kom harru ka
    //me mu kujtu qe kit rast destructuring o me ju qas qasaj variable mrena qati
    // objekti dmth kit rast pi qasem variables body mrena objektit andaj kjo o
    //destructuring dmth destructuring o me ju qas variablav specific mrena objektit
    //e jo krejt objektitk
    if (rejected) {
      callback("Hey tka ra rrjeti ntok", undefined);
    } else if (body.features.length === 0) {
      callback("Hey nuk tka ra rrjeti ntok, po ske dit me shkru", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
// geoCode("Prishtin", (error, data) => {
//   console.log("Error" + error);
//   console.log("data " + data.latitude);
// });
