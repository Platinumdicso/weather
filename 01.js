function getResults(query) {
  fetch(`${query}`)
    .then(function (weather) {
      return weather.json();
    }).then(displayResults);
}
