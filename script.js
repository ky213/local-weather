(function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeather(lat, lon);
    });
  else document.write("geolocation not supported by this browser");
})();


async function getWeather(lat, lon) {
  try {
    var w = await fetch(
      "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon
    );
    displayWeather(await w.json());
  } catch (e) {
    console.log(e.message);
  }
}

function displayWeather(w) {
  var d = new Date();

  console.log(w)
  changeImage(w);
  $("#name").text(w.name)
  $("#country").text(w.sys.country)
  $("#main").text(w.weather[0].main)
  $("#description").text(w.weather[0].description)
  $("#date").text(d.toLocaleDateString())
  $("#temp").text(Math.round(w.main.temp) + " °C")
  $("#maxTemp").text(w.main.temp_max)
  $("#minTemp").text(w.main.temp_min)
  $('#humidity').text(w.main.humidity + " %")
  $('#pressure').text(w.main.pressure + " Pa")
  $('#wind-speed').text(w.wind.speed + " km/s")
  $('#wind-degree').text(w.wind.deg + "°")
}

function changeImage(w) {
  var weather = w.weather[0].main

  if (weather.match(/rain/i)) {
    $("#icon").attr("src", 'img/umbrella.svg');
    $(".container-fluid").css("background-image", "url('/img/rain.jpg')")
  }
  if (weather.match(/cloud/i)) {
    $("#icon").attr("src", 'img/cloudy.svg');
    $(".container-fluid").css("background-image", "url('/img/cloudy-day.jpg')")
  }
  if (weather.match(/sun/i)) {
    $("#icon").attr("src", 'img/sun.svg');
    $(".container-fluid").css("background-image", "url('/img/sunny-day-wallpaper-1.jpg')")
  }
}