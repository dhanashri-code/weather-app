
// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherIcon = document.getElementById("weatherIcon");

// API Configuration
const API_KEY = "180337714bebd34adeea2d3b937841e4"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch Weather Data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update UI with Weather Data
    updateWeatherUI(data);
  } catch (error) {
    alert(error.message);
  }
}

// Update Weather Information in the UI
function updateWeatherUI(data) {
  const {
    name,
    main: { temp, feels_like, humidity },
    weather,
    wind: { speed },
    sys: { sunrise: sunriseTime, sunset: sunsetTime },
  } = data;

  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  cityName.textContent = `Weather in ${name}`;
  temperature.textContent = `Temperature: ${temp}°C`;
  weatherCondition.textContent = `Condition: ${weather[0].description}`;
  feelsLike.textContent = `Feels Like: ${feels_like}°C`;
  windSpeed.textContent = `Wind Speed: ${speed} m/s`;
  humidity.textContent = `Humidity: ${humidity}%`;
  sunrise.textContent = `Sunrise: ${formatTime(sunriseTime)}`;
  sunset.textContent = `Sunset: ${formatTime(sunsetTime)}`;
  weatherIcon.src = icon;

  weatherResult.classList.remove("hidden");
}

// Format Unix Timestamp to Readable Time
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }
  fetchWeather(city);
});
