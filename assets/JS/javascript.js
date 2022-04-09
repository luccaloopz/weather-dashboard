//api key: 684b85a12af0b7eb0522d2b94d7fdee3

// api call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} (getting the lat and long)
//second api call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} (to get actual 5 day forcast)

const searchBtn = document.querySelector("#searchBtn");
const currentDateEl = document.querySelector("#current-date");
const cityNameEl = document.querySelector("#current-cityname");
const currentTempEl = document.querySelector("#current-temp");
const currentHumidityEl = document.querySelector("#current-humidity");
const currentWindspeedEl = document.querySelector("#current-windspeed");
const currentUVIEl = document.querySelector("#current-UVI");

searchBtn.addEventListener("click", firstAPICALL);

function firstAPICALL() {
    let cityName = document.querySelector("#searchInput").value;
    const firstApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=684b85a12af0b7eb0522d2b94d7fdee3`;
    cityName = cityName.split(" ");
    for (let i = 0; i < cityName.length; i++) {
        cityName[i] = cityName[i][0].toUpperCase() + cityName[i].slice(1);
    };
    cityName = cityName.join(" ");
    cityNameEl.textContent = cityName + " ";

    const currentDate = moment().format("dddd, MMMM Do YYYY");
    currentDateEl.textContent = currentDate
    
    fetch(firstApiUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        secondAPICALL(lat, lon);
    });
};

function secondAPICALL(lat, lon) {
    const secondApiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=684b85a12af0b7eb0522d2b94d7fdee3`;

    fetch(secondApiURL).then(function(response) {
        return response.json();
    }).then(function(data) {
        displayingCurrentCityData(data);
    });
};

function displayingCurrentCityData(data) {
    //this will take the "data" object, parse through it to get specific data and append them to the text content of the html elements
    const currentTemp = data.current.temp;
    currentTempEl.textContent = currentTemp + "℉";

    const currentHumidity = data.current.humidity;
    currentHumidityEl.textContent = currentHumidity + "%";

    const currentWindspeed = data.current.wind_speed;
    currentWindspeedEl.textContent = currentWindspeed + "MPH";

    const currentUVI = data.current.uvi;
    currentUVIEl.textContent = currentUVI;
};