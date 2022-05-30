// console.log("HEYYYYYYYYYYYY SHQIPE");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   }); //se o json response
// });

const weatherForm = document.querySelector("form");
const searchbox = document.querySelector(".search-box");

const city = document.querySelector(".location .city");
const temp = document.querySelector(".current .temp");
const weather_el = document.querySelector(".current .weather");
const date = document.querySelector(".location .date");
const hilow = document.querySelector(".hi-low");
let now = new Date();

date.innerText = dateBuilder(now);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchbox.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        city.innerText = data.error;
      } else {
        city.innerText = data.location;
        temp.innerText = data.temperature + "°c";
        weather_el.innerText = data.description;
        hilow.innerText =
          data.temperature + "°c feels like " + data.feels + "°c";
      }
    });
  });
});

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
