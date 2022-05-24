// console.log("HEYYYYYYYYYYYY SHQIPE");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   }); //se o json response
// });

// fetch("http://localhost:3000/weather?adress=%22prishtin%22").then(
//   (response) => {
//     response.json().then((data) => {
//       if (data.error) {
//         console.log("error");
//       }
//       console.log(data.location);
//       console.log(data.forecast);
//     });
//   }
// );

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
