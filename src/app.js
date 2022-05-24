const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { addAbortSignal } = require("stream");
const log = console.log;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express(); // pi thojm app o e barabart me qit server tani i shtojm metodd
// e konfigurojm serverin sipas qefi

//DEFINING PATHS FOR THE EXPRESS CONFIG

// ku i kem html edhe kto. dirname dmth o emri i follderit.
const publicDirectoryPath = path.join(__dirname, "../public"); // pi thojm me na qu te fajlli
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// express.static o funksion i cili merr si argument
// vendin se ku ndodhet qajo fajlll
//app.use me ba ndryshe nserver ton diqka. e pi thojm use that fajll qe na ka qu express.static
// Setup static directory to serve
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Auron bajskolli",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    //dmth na i jepum partials vlerat ktu qe tani me perdor ata naper
    //faqe tona psh headerin e perdorum ntri faqe ndryshme masi i kem jep vlera qe merr
    // psh me shfaq emrin name qe e kem jep ose title
    title: "About Me",
    name: "Auron bajskolli",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Auron bajskolli",
  });
});
//get dmth kur shkon nqit url qa me ba kit rast i kem than
//kur shkon te base url print Hello si pergjigje.
// app.com;
// app.com / help;
// app.com / about;

app.get("/products", (req, res) => {
  if (!req.query.search) {
    //query o objekti qe bahet request te url psh /products/search="kikirika"&rating="5"
    //query o i ndertum prej key=value;
    return res.send({
      error: "Ske kerku produktin",
    });
  }

  res.send({
    products: [], // dmth kurr sbon me harru qe veq ni response kthehet jo dy mas ni requesti
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Error,not found in the help section!",
    title: "404",
    name: "Auron Bajskolli",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "Error,not found!",
    title: "404",
    name: "Auron Bajskolli",
  });
});

app.listen(3000, () => {
  log("Server is running on port 3000");
});
