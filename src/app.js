function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let minElement = document.querySelector("#min");
  let maxElement = document.querySelector("#max");
  let feelslikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemp);

  if (Math.round(celsiusTemp) < 10 && Math.round(celsiusTemp) > 0) {
    tempElement.innerHTML = `0${Math.round(celsiusTemp)}`;
  }

  descriptionElement.innerHTML = response.data.weather[0].main;
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

  if (response.data.weather[0].main === "Clouds") {
    iconElement.setAttribute("class", "fa-solid fa-cloud");
  }

  if (response.data.weather[0].main === "Clear") {
    iconElement.setAttribute("class", "fa-solid fa-sun");
  }

  if (response.data.weather[0].main === "Drizzle") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-rain");
  }

  if (
    response.data.weather[0].main === "Mist" ||
    response.data.weather[0].main === "Fog"
  ) {
    iconElement.setAttribute("class", "fa-solid fa-smog");
  }

  if (response.data.weather[0].main === "Rain") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-showers-heavy");
  }

  if (response.data.weather[0].main === "Thunderstorm") {
    iconElement.setAttribute("class", "fa-solid fa-cloud-bolt");
  }

  if (response.data.weather[0].main === "Snow") {
    iconElement.setAttribute("class", "fa-solid fa-snowflake");
  }
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let tempElement = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
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

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

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

function getDubaiLocation(event) {
  event.preventDefault();
  searchCity("Dubai");
}

let dubaiCity = document.querySelector("#dubai");
dubaiCity.addEventListener("click", getDubaiLocation);

function getLondonLocation(event) {
  event.preventDefault();
  searchCity("London");
}

let londonCity = document.querySelector("#london");
londonCity.addEventListener("click", getLondonLocation);

function getSanFranciscoLocation(event) {
  event.preventDefault();
  searchCity("San Francisco");
}

let sanFranciscoCity = document.querySelector("#san-francisco");
sanFranciscoCity.addEventListener("click", getSanFranciscoLocation);

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
