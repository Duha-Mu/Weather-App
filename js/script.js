const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector(".search-btn")
const myKey = "38761b07ab1841dda6f124317242012"


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        getWeatherData(`${lat},${long}`)
    })
}
else {
    getWeatherData("cairo");
}


async function getWeatherData(query) {

    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${query}&days=3`)
    const data = await response.json()

    displayData(data)
    displayTomorrow(data)
    displayAfterTomorrow(data)
}


searchInput.addEventListener('input', function (e) {
    if (e.target.value.length < 3) return;
    getWeatherData(e.target.value)
})

searchBtn.addEventListener("click", function (e) {
    getWeatherData(searchInput.value);
});


// display today weather
function displayData(data) {
    console.log(data);

    let currentDayDate = data.current.last_updated;
    let date = new Date(currentDayDate);

    let dayDate = date.getDate();
    let monthName = date.toLocaleString('en-us', { month: 'long' });
    let degree = data.current.temp_c;
    let iconUrl = `https:${data.current.condition.icon}`;


    document.querySelector("#day").innerHTML = date.toLocaleString('en-us', { weekday: 'long' });
    document.querySelector("#todayDate").innerHTML = `${dayDate} ${monthName}`
    document.querySelector("#locationCity").innerHTML = data.location.name;
    document.querySelector("#tempToday").innerHTML = `${degree}<sub class="degree-symbol">°</sub>C`;
    document.querySelector("#dayImage").setAttribute('src', iconUrl);
    document.querySelector("#condition").innerHTML = data.current.condition.text;
    document.querySelector("#humidityDay").innerHTML = data.current.humidity;
    document.querySelector("#windSpeed").innerHTML = data.current.wind_kph;
    document.querySelector("#windDirection").innerHTML = data.current.wind_dir;

}


// Display tomorrow weather
function displayTomorrow({forecast}){
console.log(forecast);
let nextDay = forecast.forecastday[1];
let nextDayDegree = nextDay.day.maxtemp_c;
document.querySelector("#nextDay").innerHTML = new Date(nextDay.date).toLocaleString('en-us', { weekday: 'long' })
tomorrowIco.setAttribute('src',`https:${nextDay.day.condition.icon}`)
document.querySelector(".maxTemp").innerHTML = `${nextDayDegree}<sub class="degree-symbol">°</sub>C`;
document.querySelector(".minTimp").innerHTML = `${nextDay.day.mintemp_c}<sub class="degree-symbol">°</sub>C`;
document.querySelector(".condition").innerHTML = nextDay.day.condition.text;

}


// Display After tomorrow weather
function displayAfterTomorrow({forecast}){
    console.log(forecast);
    let thirdtDay = forecast.forecastday[2];
    let thirdDayDegree = thirdtDay.day.maxtemp_c;
    document.querySelector(".thirdDay").innerHTML = new Date(thirdtDay.date).toLocaleString('en-us', { weekday: 'long' })
    thirdIcon.setAttribute('src',`https:${thirdtDay.day.condition.icon}`)
    document.querySelector(".max-temp").innerHTML = `${thirdDayDegree}<sub class="degree-symbol">°</sub>C`;
    document.querySelector(".min-timp").innerHTML = `${thirdtDay.day.mintemp_c}<sub class="degree-symbol">°</sub>C`;
    document.querySelector(".condition3").innerHTML = thirdtDay.day.condition.text;
    
    }







