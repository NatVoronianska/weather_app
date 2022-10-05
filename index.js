let now = new Date();
let today = document.querySelector("#today");
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

today.innerHTML = `${day}, ${hours}:${minutes}`;
//week 5
function displayWeather(response) {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  weatherDiv.innerHTML = `It is ${temperature} degrees, ${description}, humidity: ${humid}, wind:${wind} in ${response.data.name}`;
  let temperatureDiv = document.querySelector("#temperature");
  temperatureDiv.innerHTML = temperature;
  function FF(event) {
    event.preventDefault();
    let temperatureEl = document.querySelector("#temperature");
    temperatureEl.innerHTML = temperature * 1.8 + 32;
  }

  function celsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
  }
  let ffLink = document.querySelector("#fahrenheit-link");
  ffLink.addEventListener("click", FF);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", celsius);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let town = document.querySelector(".city");
  town.innerHTML = `${city}`;
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//bonus

function displayCurrentWeather(response) {
  let weatherDiv = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let here = response.data.name;
  weatherDiv.innerHTML = `It is ${temperature} degrees in ${here}`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  function FF(event) {
    event.preventDefault();
    let temperatureEl = document.querySelector("#temperature");
    temperatureEl.innerHTML = temperature * 1.8 + 32;
  }
  function celsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
  }
  let ffLink = document.querySelector("#fahrenheit-link");
  ffLink.addEventListener("click", FF);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", celsius);
}
function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  console.log(url);
  axios.get(url).then(displayCurrentWeather);
}
function geo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentWeather = document.querySelector("#current");
currentWeather.addEventListener("click", geo);
