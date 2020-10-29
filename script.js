function scrollFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function alertBox(message) {
    alert(message);
}

// Llamada a una API que ya vimos para coger un poco de práctica
function getHora(){
    $.get("http://worldtimeapi.org/api/timezone/Europe/Madrid", (data, status) => {
        document.getElementById("Hora").innerHTML = data.utc_datetime;
    });
}

// Alternativa de código para obtener el código anterior
function getHoraAlternative() {
    fetch("http://worldtimeapi.org/api/timezone/Europe/Madrid")
        .then((response) => {
            console.log(response.json());
        })
        .then((data) => {
            console.log(data);
        })
}

// Código para obtener la localización del dispositivo que accede a nuestra web
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherLocation)
    } else console.log("No hay ubicación a la que acceder");
}

// Dar el tiempo de la zona
function getWeatherLocation(location) {
    if (navigator.geolocation) {
        var url = "http://api.openweathermap.org/data/2.5/weather?appid=d56e45732611bc3d01077f50bd607104&units=metric&lat=" +
        location.coords.latitude + "&lon="  + location.coords.longitude;

        $.get(url, (data, status) => {
            var basicData = "Ciudad: " + data.name +
            "<br>Temperatura: " + data.main.temp + "ºC" +
            "<br>Cielo: " + data.weather[0].main;
            document.getElementById("WeatherLocation").innerHTML = basicData;

            var temp = "Sensación térmica: " + data.main.feels_like +
            "<br>Temperatura mínima: " + data.main.temp_min +
            "<br>Temperatura máxima: " + data.main.temp_max;
            document.getElementById("WeatherTemp").innerHTML = temp;
        });
    }
}