document.addEventListener('DOMContentLoaded', () => {



  let description = document.getElementById('description')
  let name = document.getElementById('city')
  let time = document.getElementById('time')
  let temp = document.getElementById('temp')
  let pressure = document.getElementById('pressure')
  let humidity = document.getElementById('humidity')
  let wind = document.getElementById('wind')

  function catchError(error) {
    console.log('Looks like there was a problem:', error);
  }



  function fetchWeather() {
    let apiKey = 'e3e851d69a118655e8057b2c74f91d7b'
    let city = document.getElementById('search').value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(displayWeatherData)
      .catch(catchError)
  }

  let button = document.getElementById('submit')
  button.addEventListener('click', fetchWeather)

  function displayWeatherData(data) {
    console.log(data)
    name.innerHTML = data.name
    time.innerHTML = convertTime(data.dt)
    temp.innerHTML = Math.round(parseFloat(data.main.temp) - 273.15) + '°C';
    description.innerHTML = data.weather[0].description
    pressure.innerHTML = data.main.pressure
    humidity.innerHTML = data.main.humidity
    wind.innerHTML = data.wind.speed
    let iconUrl = data.weather[0].icon
    icon.setAttribute('src', "http://openweathermap.org/img/wn/" + iconUrl + '@2x' + ".png")

  }

  function convertTime(d) {
    d = new Date(d * 1000)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    return `${day} ${date}  ${month} ${year} <br/> ${hour}:${min}:${sec} `;
  }

})