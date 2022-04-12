//api key: 684b85a12af0b7eb0522d2b94d7fdee3

// api call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} (getting the lat and long)
//second api call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} (to get actual 5 day forcast)

const searchBtn = document.querySelector("#searchBtn");
const cityButtonsContainer = document.querySelector("#city-buttons-container");

const currentContainer = document.querySelector("#current-conditions");
const currentDateEl = document.querySelector("#current-date");
const cityNameEl = document.querySelector("#current-cityname");
const currentIconEl = document.querySelector("#current-icon");
const currentTempEl = document.querySelector("#current-temp");
const currentHumidityEl = document.querySelector("#current-humidity");
const currentWindspeedEl = document.querySelector("#current-windspeed");
const currentUVIEl = document.querySelector("#current-UVI");

const fiveDayHeader = document.querySelector("#fiveday");

const day1Box = document.querySelector("#box1");
const day2Box = document.querySelector("#box2");
const day3Box = document.querySelector("#box3");
const day4Box = document.querySelector("#box4");
const day5Box = document.querySelector("#box5");

const futureDate1El = document.querySelector("#future-date1");
const futureIcon1El = document.querySelector("#furture-icon1");
const futureTemp1El = document.querySelector("#future-temp1");
const futureHum1El = document.querySelector("#future-humidity1");
const futureDate2El = document.querySelector("#future-date2");
const futureIcon2El = document.querySelector("#furture-icon2");
const futureTemp2El = document.querySelector("#future-temp2");
const futureHum2El = document.querySelector("#future-humidity2");
const futureDate3El = document.querySelector("#future-date3");
const futureIcon3El = document.querySelector("#furture-icon3");
const futureTemp3El = document.querySelector("#future-temp3");
const futureHum3El = document.querySelector("#future-humidity3");
const futureDate4El = document.querySelector("#future-date4");
const futureIcon4El = document.querySelector("#furture-icon4");
const futureTemp4El = document.querySelector("#future-temp4");
const futureHum4El = document.querySelector("#future-humidity4");
const futureDate5El = document.querySelector("#future-date5");
const futureIcon5El = document.querySelector("#furture-icon5");
const futureTemp5El = document.querySelector("#future-temp5");
const futureHum5El = document.querySelector("#future-humidity5");


let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

searchBtn.addEventListener("click", function() {
    let cityName = document.querySelector("#searchInput").value;

    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("search", JSON.stringify(searchHistory));
    }

    cityName = cityName.split(" ");
    for (let i = 0; i < cityName.length; i++) {
        cityName[i] = cityName[i][0].toUpperCase() + cityName[i].slice(1);
    };
    cityName = cityName.join(" ");

    firstAPICALL(cityName);
    createCityButton(cityName);
});

function firstAPICALL(cityName) {
    resetUVIColor();
    const firstApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=684b85a12af0b7eb0522d2b94d7fdee3`;

    cityNameEl.textContent = cityName + " - ";

    const currentDate = moment().format("dddd, MMMM Do YYYY");
    currentDateEl.textContent = currentDate + " - ";
    
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
        displayingFutureCityData(data);
    });
};

function displayingCurrentCityData(data) {
    currentContainer.setAttribute("style", "border-bottom: 4px solid black;")

    const currentIconCode = data.current.weather[0].icon;
    const currentIconURL = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    currentIconEl.setAttribute("src", currentIconURL);
    
    const currentTemp = data.current.temp;
    currentTempEl.textContent = "Temperature: " + currentTemp + "℉";

    const currentHumidity = data.current.humidity;
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";

    const currentWindspeed = data.current.wind_speed;
    currentWindspeedEl.textContent = "Wind Speed: " + currentWindspeed + "MPH";

    const currentUVI = data.current.uvi;
    if (currentUVI <= 2) {
        currentUVIEl.classList.add("bg-success", "bg-gradient");
    } else if (currentUVI >= 8) {
        currentUVIEl.classList.add("bg-danger", "bg-gradient");
    } else {
        currentUVIEl.classList.add("bg-warning", "bg-gradient");
    };
    currentUVIEl.textContent = "UV Index: " + currentUVI;
};

function displayingFutureCityData(data) {
    console.log(data);

    fiveDayHeader.textContent = "5-Day Forecast:";

    day1Box.classList.add("bg-info", "text-center", "border", "border-3", "border-dark", "rounded");
    const day1 = moment().add(1, 'days').format("ddd, MMMM Do YYYY");
    futureDate1El.textContent = day1;
    const futureIconCode1 = data.daily[1].weather[0].icon;
    const futureIconURL1 = `http://openweathermap.org/img/wn/${futureIconCode1}@2x.png`;
    futureIcon1El.setAttribute("src", futureIconURL1);
    const futureTemp1 = data.daily[1].temp.day;
    futureTemp1El.textContent = "Temperature: " + futureTemp1 + "℉";
    const futureHum1 = data.daily[1].humidity;
    futureHum1El.textContent = "Humidity: " + futureHum1 + "%";

    day2Box.classList.add("bg-info", "text-center", "border", "border-3", "border-dark", "rounded");
    const day2 = moment().add(2, 'days').format("ddd, MMMM Do YYYY");
    futureDate2El.textContent = day2;
    const futureIconCode2 = data.daily[2].weather[0].icon;
    const futureIconURL2 = `http://openweathermap.org/img/wn/${futureIconCode2}@2x.png`;
    futureIcon2El.setAttribute("src", futureIconURL2);
    const futureTemp2 = data.daily[2].temp.day;
    futureTemp2El.textContent = "Temperature: " + futureTemp2 + "℉";
    const futureHum2 = data.daily[2].humidity;
    futureHum2El.textContent = "Humidity: " + futureHum2 + "%";

    day3Box.classList.add("bg-info", "text-center", "border", "border-3", "border-dark", "rounded");
    const day3 = moment().add(3, 'days').format("ddd, MMMM Do YYYY");
    futureDate3El.textContent = day3;
    const futureIconCode3 = data.daily[3].weather[0].icon;
    const futureIconURL3 = `http://openweathermap.org/img/wn/${futureIconCode3}@2x.png`;
    futureIcon3El.setAttribute("src", futureIconURL3);
    const futureTemp3 = data.daily[3].temp.day;
    futureTemp3El.textContent = "Temperature: " + futureTemp3 + "℉";
    const futureHum3 = data.daily[3].humidity;
    futureHum3El.textContent = "Humidity: " + futureHum3 + "%";

    day4Box.classList.add("bg-info", "text-center", "border", "border-3", "border-dark", "rounded");
    const day4 = moment().add(4, 'days').format("ddd, MMMM Do YYYY");
    futureDate4El.textContent = day4;
    const futureIconCode4 = data.daily[4].weather[0].icon;
    const futureIconURL4 = `http://openweathermap.org/img/wn/${futureIconCode4}@2x.png`;
    futureIcon4El.setAttribute("src", futureIconURL4);
    const futureTemp4 = data.daily[4].temp.day;
    futureTemp4El.textContent = "Temperature: " + futureTemp4 + "℉";
    const futureHum4 = data.daily[4].humidity;
    futureHum4El.textContent = "Humidity: " + futureHum4 + "%";

    day5Box.classList.add("bg-info", "text-center", "border", "border-3", "border-dark", "rounded");
    const day5 = moment().add(5, 'days').format("ddd, MMMM Do YYYY");
    futureDate5El.textContent = day5;
    const futureIconCode5 = data.daily[5].weather[0].icon;
    const futureIconURL5 = `http://openweathermap.org/img/wn/${futureIconCode5}@2x.png`;
    futureIcon5El.setAttribute("src", futureIconURL5);
    const futureTemp5 = data.daily[5].temp.day;
    futureTemp5El.textContent = "Temperature: " + futureTemp5 + "℉";
    const futureHum5 = data.daily[5].humidity;
    futureHum5El.textContent = "Humidity: " + futureHum5 + "%";
}; 

function resetUVIColor() {
    currentUVIEl.classList.remove("bg-success", "bg-danger" , "bg-warning" , "bg-gradient");
};

function createCityButton(cityName) {
    let cityBtn = document.createElement("button");
    if (!cityButtonsContainer.textContent.includes(cityName)) {
        cityBtn.textContent = cityName;
        cityBtn.classList.add("row", "w-100", "list-group-item", "list-group-item-action");
        cityButtonsContainer.append(cityBtn);
        
    } else {
        return;
    };

    cityBtn.addEventListener("click", function() {
        firstAPICALL(cityName);
    });
};

function grabbingCitiesFromLocalStorage() {
    for (let i = 0; i < searchHistory.length; i++) {
        searchHistoryBtn = document.createElement("button");
        searchHistory[i] = searchHistory[i].split(" ");
        for (let j = 0; j < searchHistory[i].length; j++) {
            searchHistory[i][j] = searchHistory[i][j][0].toUpperCase() + searchHistory[i][j].slice(1);
        };
        searchHistory[i] = searchHistory[i].join(" ");
        searchHistoryBtn.textContent = searchHistory[i];
        searchHistoryBtn.classList.add("row", "w-100", "list-group-item", "list-group-item-action");
        if (!cityButtonsContainer.textContent.includes(searchHistory[i])) {
            cityButtonsContainer.append(searchHistoryBtn);
        }

        let searchHistoryCityName = searchHistory[i]
        searchHistoryBtn.addEventListener("click", function() {
            firstAPICALL(searchHistoryCityName);
        });
    };
};

grabbingCitiesFromLocalStorage();
