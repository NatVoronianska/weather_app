let now = new Date();
let today = document.querySelector("#today");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10){
      minutes = `0${minutes}`;
}

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
function formatForecastDay(timest) {
  let date = new Date(timest * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <= 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatForecastDay(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getApiForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  weatherDiv.innerHTML = `${description},<br> humidity: ${humid}%,<br> wind: ${wind}km/h`;
  let temperatureDiv = document.querySelector("#temperature");
  temperatureDiv.innerHTML = temperature;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getApiForecast(response.data.coord);
  let town = document.querySelector(".city");
  town.innerHTML = `${response.data.name}`;
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayCurrentWeather(response) {
  let weatherDiv = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let here = response.data.name;
  weatherDiv.innerHTML = `It is ${temperature} degrees in ${here}`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let town = document.querySelector(".city");
  town.innerHTML = `${here}`;

  getApiForecast(response.data.coord);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "3dce9b1c66837262a25b3f448d354a76";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayCurrentWeather);
}

function geo() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

//let currentWeather = document.querySelector("#current");
//currentWeather.addEventListener("click", geo);
geo();
