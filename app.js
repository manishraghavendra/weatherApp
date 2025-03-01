const temperature = document.querySelector(".city_temperature");
const description = document.querySelector(".city_weather_description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

var search_button = document.querySelector(".searchBtn");
var search_input = document.querySelector(".search-Input");

const takeUserInput = function () {
    var city = search_input.value;
        if (city.trim() === "") {
        alert("Error: City name cannot be empty!")
    }
    getCityCurrentWeather(city);
}

const getCityCurrentWeather = function (city) {

    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=25ba9b1776ffb6593c36f34fa561c2c2&units=metric';

    fetch(api_url)
        .then(response => {
            if(!response.ok) {
                alert("Error: No weather available, check your input!");
            }
            const responseFromApi = response.json();
            return responseFromApi;
        })

        .then(responseFromApi => {
            displayCurrentWeatherResults(responseFromApi);
        })

        .catch(err => {
            console.log(err);
        });

        
}

const displayCurrentWeatherResults = function(responseFromApi) {

    temperature.innerHTML = "Temp: " + Math.round(responseFromApi.main.temp) + " °C";
    description.innerText = responseFromApi.weather[0].description;
    humidity.innerText = "Humidity: " + responseFromApi.main.humidity + "%";
    wind.innerText = "Wind speed: " + responseFromApi.wind.speed + " km/h";
}
