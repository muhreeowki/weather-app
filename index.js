const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

searchBtn.onclick = () => {
  const apiKey = "c91e79f9dda03ca11468d601fd16b7bd";
  const city = document.querySelector(".search-box input").value;

  // check if the city is empyt
  if (city === "") return;

  // fetch data from open weather api
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      //   hide the error div
      error404.style.display = "none";
      error404.classList.remove = "fadeIn";

      //   Declare DOM elements
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      //   Check the weather and set the image src acordingly
      switch (data.weather[0].main) {
        case "Clear":
          image.src = "./images/clear.png";
          break;
        case "Clouds":
          image.src = "./images/cloud.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;
        case "Snow":
          image.src = "./images/snow.png";
          break;
        case "Haze":
          image.src = "./images/mist.png";
          break;
        default:
          image.src = "";
      }

      // Collect Information
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "600px";
    });
};
