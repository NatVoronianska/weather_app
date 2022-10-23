 
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
    
      function displayForecast() {
   let forecastElement = document.querySelector("#forecast");

   let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

   let forecastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

      function displayWeather(response) {
        let weatherDiv = document.querySelector("#weather");
        let temperature = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let humid = response.data.main.humidity;
        let wind = response.data.wind.speed;
        weatherDiv.innerHTML = `It is ${temperature} degrees, ${description}, humidity: ${humid}, wind:${wind} in ${response.data.name}`;
        let temperatureDiv = document.querySelector("#temperature");
        temperatureDiv.innerHTML = temperature;
        let iconElement = document.querySelector("#icon");
        iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
        console.log(temperature);
        displayForecast();
       

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

      function displayCurrentWeather(response) {
        let weatherDiv = document.querySelector("h1");
        let temperature = Math.round(response.data.main.temp);
        let here = response.data.name;
        weatherDiv.innerHTML = `It is ${temperature} degrees in ${here}`;
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = temperature;
        let town = document.querySelector(".city");
        town.innerHTML = `${here}`;
        displayForecast();
   
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