const APi = {
  key: 'ba9e04ffbd579a25d34d292bba8a1f3c',
  url: 'https://api.openweathermap.org/data/2.5/'
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keycode == 13 || e.which == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${APi.url}weather?q=${query}&APPID=${APi.key}`)
    .then(function (weather) {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  if (weather.cod === '404') {
    alert('Invalide city name')
  }
  let city = document.querySelector('.location .city');
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = now.toLocaleDateString('en-US', options);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp - 273.15)}<span>℃</span>`

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min - 273.15)}℃ / ${Math.round(weather.main.temp_max - 273.15)}℃`;
}