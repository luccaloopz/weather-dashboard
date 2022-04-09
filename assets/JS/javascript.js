//api key: 684b85a12af0b7eb0522d2b94d7fdee3

// api call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} (getting the lat and long)
//second api call: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} (to get actual 5 day forcast)

const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", firstAPICALL);

function firstAPICALL() {
    const cityName = document.querySelector("#searchInput").value;
    const firstApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=684b85a12af0b7eb0522d2b94d7fdee3";
    
    fetch(firstApiUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        secondAPICALL(lat, lon);
    });
};

