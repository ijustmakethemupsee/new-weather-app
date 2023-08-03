function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function searchCity(cityName) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").value;
  searchCity(cityName);
}

let searchCityName = document.querySelector("#city-form");

searchCityName.addEventListener("submit", handleSubmit);

function searchHomeLocation(position) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getHomeLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchHomeLocation);
}

let homeCity = document.querySelector("#home");
homeCity.addEventListener("click", getHomeLocation);

function completeDate() {
  let now = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let date = now.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${date} ${month} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#day-date-time");
currentDate.innerHTML = completeDate();

searchCity("Tokyo");
