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

const futureDate1El = document.querySelector("#future-date1");

const futureTemp1El = document.querySelector("#future-temp1");
const futureHum1El = document.querySelector("#future-humidity1");
const futureTemp2El = document.querySelector("#future-temp2");
const futureHum2El = document.querySelector("#future-humidity2");
const futureTemp3El = document.querySelector("#future-temp3");
const futureHum3El = document.querySelector("#future-humidity3");
const futureTemp4El = document.querySelector("#future-temp4");
const futureHum4El = document.querySelector("#future-humidity4");
const futureTemp5El = document.querySelector("#future-temp5");
const futureHum5El = document.querySelector("#future-humidity5");

searchBtn.addEventListener("click", firstAPICALL);

function firstAPICALL() {
    let cityName = document.querySelector("#searchInput").value;
    const firstApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=684b85a12af0b7eb0522d2b94d7fdee3`;
    cityName = cityName.split(" ");
    for (let i = 0; i < cityName.length; i++) {
        cityName[i] = cityName[i][0].toUpperCase() + cityName[i].slice(1);
    };
    cityName = cityName.join(" ");
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
    //this takes the "data" object, parses through it to get specific data and appends them to the text content of the html elements
    const currentTemp = data.current.temp;
    currentTempEl.textContent = currentTemp + "℉";

    const currentHumidity = data.current.humidity;
    currentHumidityEl.textContent = currentHumidity + "%";

    const currentWindspeed = data.current.wind_speed;
    currentWindspeedEl.textContent = currentWindspeed + "MPH";

    const currentUVI = data.current.uvi;
    currentUVIEl.textContent = currentUVI;
};

function displayingFutureCityData(data) {
    console.log(data);

    // const day1 = moment(moment().format("dddd, MMMM Do YYYY"), "DD-MM-YYYY").add(1, 'days'); //not sure how to do this yet
    // futureDate1El.textContent = day1

    //for the icons: you may have to use font awesome or some other 3rd party unless the api returns icons that you can use

    const futureTemp1 = data.daily[1].temp.day;
    futureTemp1El.textContent = futureTemp1 + "℉";
    const futureHum1 = data.daily[1].humidity;
    futureHum1El.textContent = futureHum1 + "%";

    const futureTemp2 = data.daily[2].temp.day;
    futureTemp2El.textContent = futureTemp2 + "℉";
    const futureHum2 = data.daily[2].humidity;
    futureHum2El.textContent = futureHum2 + "%";

    const futureTemp3 = data.daily[3].temp.day;
    futureTemp3El.textContent = futureTemp3 + "℉";
    const futureHum3 = data.daily[3].humidity;
    futureHum3El.textContent = futureHum3 + "%";

    const futureTemp4 = data.daily[4].temp.day;
    futureTemp4El.textContent = futureTemp4 + "℉";
    const futureHum4 = data.daily[4].humidity;
    futureHum4El.textContent = futureHum4 + "%";

    const futureTemp5 = data.daily[5].temp.day;
    futureTemp5El.textContent = futureTemp5 + "℉";
    const futureHum5 = data.daily[5].humidity;
    futureHum5El.textContent = futureHum5 + "%";
}; 

//for localStorage: I think ill have to get the data object that is returned, parse through it and identify only the things that I need, set it into local storage and simultaneouly append a new button to the left-hand side of the page which holds all the information of that particular city...
//...Once that button is then clicked on, there's an event listener that gets the item from local storage and repopulates the page with all of the necessary data

// for the UVI index change of color: I think this'll be some sort of conditional statements that set a specific class with a predetermined color to the textContent of the UVI index if the value from the data object is within certain ranges