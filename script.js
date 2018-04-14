(function() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        getWeather(lat, lon);
      });
    else document.write("geolocation not supported by this browser");
  })();
  
    
  async function getWeather(lat, lon) {
    try {
      var w =  await fetch(
        "https://fcc-weather-api.glitch.me/api/current?lat="+lat +"&lon=" +lon
      );
       displayWeather(await w.json());
    } catch (e) {
      console.log(e.message);
    }
  }  
       
  function displayWeather(w){
    var d = new Date();
    console.log(w)
    $("#name").text(w.name)
    $("#country").text(w.sys.country)
    $("#main").text(w.weather[0].main)
    $("#description").text(w.weather[0].description)
    $("#date").text(d.toLocaleDateString())
    $("#icon").attr("src", w.weather[0].icon);
    $("#temp").text(w.main.temp + " °C")
    $("#maxTemp").text(w.main.temp_max)
    $("#minTemp").text(w.main.temp_min)
  }