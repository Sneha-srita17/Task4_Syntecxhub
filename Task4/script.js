const API_KEY = "7cef8e8bb8af347b3657ea624eb665a3";

// INPUTS
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

// UI ELEMENTS
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition =
  document.getElementById("weatherCondition");

const humidity =
  document.getElementById("humidity");

const wind =
  document.getElementById("wind");

const pressure =
  document.getElementById("pressure");

const visibility =
  document.getElementById("visibility");

const sunrise =
  document.getElementById("sunrise");

const sunset =
  document.getElementById("sunset");

const todayCondition =
  document.getElementById("todayCondition");

const todayTemp =
  document.getElementById("todayTemp");

const todayDate =
  document.getElementById("todayDate");

// DATE
todayDate.innerHTML =
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

// FETCH WEATHER
async function getWeather(city) {

  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    // HANDLE ERROR
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    // UPDATE UI
    cityName.innerHTML =
      data.name;

    temperature.innerHTML =
      `${Math.round(data.main.temp)}°C`;

    weatherCondition.innerHTML =
      data.weather[0].main;

    humidity.innerHTML =
      `${data.main.humidity}%`;

    wind.innerHTML =
      `${data.wind.speed} m/s`;

    pressure.innerHTML =
      `${data.main.pressure} hPa`;

    visibility.innerHTML =
      `${data.visibility / 1000} km`;

    todayCondition.innerHTML =
      data.weather[0].main;

    todayTemp.innerHTML =
      `${Math.round(data.main.temp)}°C`;

    // SUNRISE / SUNSET
    const sunriseTime =
      new Date(data.sys.sunrise * 1000);

    const sunsetTime =
      new Date(data.sys.sunset * 1000);

    sunrise.innerHTML =
      sunriseTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

    sunset.innerHTML =
      sunsetTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

  } catch (error) {

    console.error(error);

    alert(
      "Something went wrong. Check internet or API."
    );
  }
}

// SEARCH BUTTON
searchBtn.addEventListener(
  "click",
  () => {

    const city =
      cityInput.value.trim();

    if (city !== "") {
      getWeather(city);
    }
  }
);

// ENTER KEY SEARCH
cityInput.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {

      const city =
        cityInput.value.trim();

      if (city !== "") {
        getWeather(city);
      }
    }
  }
);

// DEFAULT CITY
getWeather("Mumbai");