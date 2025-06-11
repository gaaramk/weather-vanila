// select
const searchInp = document.querySelector(".mainInp");

// select today
const toDay = document.querySelector(".toDay");
const dateToDay = document.querySelector(".dateToDay");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const iconDay = document.querySelector(".iconDay");
const statusDay = document.querySelector(".statusDay");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const direct = document.querySelector(".direct");



// select nextday
const tomorDay = document.querySelector(".tomorDay");
const iconTomor = document.querySelector(".iconTomor");
const tomorTempe = document.querySelector(".tomorTemp");
const tomorLilTemp = document.querySelector(".tomorLilTemp");
const tomorStuts = document.querySelector(".tomorText");


// select nextday 2
const nextTomorDay = document.querySelector(".nextTomorDay");
const iconnextTomor = document.querySelector(".iconnextTomor");
const nextTomorTemp = document.querySelector(".nextTomorTemp");
const nextTomorLilTemp = document.querySelector(".nextTomorLilTemp");
const nextTomorostatus = document.querySelector(".nextTomorostatus");





// get user location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (location) {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;

    getWeatherData(`${lat},${long}`);
  });
}

// get weather Api
async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=48b1f4288fc6448d90311009243006`
  );
  let data = await res.json();
  // console.log(data);
  displayToDay(data);
  displayNextDays(data)
}





// search event
searchInp.addEventListener("input", function (e) {
  getWeatherData(e.target.value);
});

// function display data of today 
function displayToDay(data) {
  const todayDate = data.current.last_updated;
  const location = data.location.name;
  const temp = data.current.temp_c;
  const icons = data.current.condition.icon;
  const status = data.current.condition.text;
  const windDir = data.current.wind_dir;
  const windFast = data.current.wind_kph;
  const humid = data.current.humidity;
  const date = new Date(todayDate);
  const todayDay = date.toLocaleString("en-us", { weekday: "long" });
  const historyDay = date.getDate();
  const historyMonth = date.toLocaleString("en-us", { month: "long" });

  toDay.innerHTML = todayDay;
  dateToDay.innerHTML = `${historyDay} ${historyMonth}`;
  city.innerHTML = location;
  temperature.innerHTML = temp;
  iconDay.setAttribute("src", icons);
  statusDay.innerHTML = status;
  humidity.innerHTML = humid;
  wind.innerHTML = windFast;
  direct.innerHTML = windDir;
  // console.log(todayDay, historyDay, historyMonth, "to day");
}


// function display data of nextDay
function displayNextDays({forecast}){
  console.log(forecast)
  tomorDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString("en-us",{weekday:"long"})
  iconTomor.setAttribute("src",forecast.forecastday[1].day.condition.icon)
  tomorTempe.innerHTML = forecast.forecastday[1].day.maxtemp_c;
  tomorLilTemp.innerHTML = forecast.forecastday[1].day.mintemp_c;
  tomorStuts.innerHTML = forecast.forecastday[1].day.condition.text;


  nextTomorDay.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString("en-us",{weekday:"long"})
  iconnextTomor.setAttribute("src",forecast.forecastday[2].day.condition.icon)
  nextTomorTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c;
  nextTomorLilTemp.innerHTML = forecast.forecastday[2].day.mintemp_c;
  nextTomorostatus.innerHTML = forecast.forecastday[2].day.condition.text;
} 
