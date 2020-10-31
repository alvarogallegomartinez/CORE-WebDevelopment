function scrollFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function alertBox(message) {
    alert(message);
}

// Llamada a una API que ya vimos para coger un poco de práctica
function getHora(){
    $.get("https://worldtimeapi.org/api/timezone/Europe/Madrid", (data, status) => {
        document.getElementById("Hora").innerHTML = data.utc_datetime;
    });
}

// Alternativa de código para obtener el código anterior
function getHoraAlternative() {
    fetch("https://worldtimeapi.org/api/timezone/Europe/Madrid")
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
        var url = "https://api.openweathermap.org/data/2.5/weather?appid=d56e45732611bc3d01077f50bd607104&units=metric&lat=" +
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

window.onload = getGitHubStars;

// Colocar todos nuestros repositorios con sus estrellas correspondientes en un tabla
function getGitHubStars() {
    var url = "https://api.github.com/users/Gallego32/repos";

    $.get(url, (data, status) => {
        // Creación de una tabla a la que se le añaden todos los repositorios que tengas junto con sus estrellas
        // En cada iteración del bucle for se crea una nueva fila
        for (i = 0; i < data.length; i++) {
            // Crear una nueva fila con su repositorio y sus estrellas correspondientes
            var node = document.createElement("tr");

            // Esta será la columna que llevará los nombres de los repositorios
            var repoNode = document.createElement("td");

            // Este es el link que hay que añadir a esta columna
            var repoLink = document.createElement("a");
            repoLink.innerText = data[i].name;
            repoLink.setAttribute("href", data[i].html_url);

            // Añadimos el link al elemento que define la columna
            repoNode.appendChild(repoLink);

            // Esta columna llevará las estrellas
            var starsNode = document.createElement("td");
            starsNode.innerText = data[i].stargazers_count;

            // Terminamos de unir todos los elementos al fichero html
            node.appendChild(repoNode);
            node.appendChild(starsNode);
            document.getElementById("RepoColumn").appendChild(node);
        }
    });
}