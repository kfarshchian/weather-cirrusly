var button = document.querySelector("#button");
var inputValue = document.querySelector('#inputValue');
var nameEl = document.querySelector('#name');
var desc = document.querySelector('#currentImg');
var currentTemp = document.querySelector('#currentTemp');
var currentDay = document.querySelector('#currentDay');
var currentWind = document.querySelector('#currentWind');
var currentHumidity = document.querySelector('#currentHumidity');
var unhideDiv =  document.getElementById("icons");
var unhideDiv1 =  document.getElementById("icons1");
var unhideDiv2 =  document.getElementById("icons2");
var unhideDiv3 =  document.getElementById("icons3");
var unhideDiv4 =  document.getElementById("icons4");weatherImg
var hideDiv =  document.getElementById("weatherImg");

var timeDisplayEl = $('#time-display');

//pulling the time and date from dayjs
function displayTime() {
  var rightNow = dayjs().format('M/D/YYYY');
  timeDisplayEl.text(rightNow);
}

displayTime()

function getCurrentApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var tempValue = data['main']['temp'];
      var descImg = "<img src =http://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + ".png>"; 
      var humidityValue = data['main']['humidity'];
      var windValue = data['wind']['speed'];
      
      currentTemp.innerHTML = "temp: " + tempValue;
      currentDesc.innerHTML = descImg;
      currentHumidity.innerHTML = "Humidity: " + humidityValue + " %";
      currentWind.innerHTML = "Wind: " + windValue + " MPH";

      

    });
}
button.addEventListener('click', getCurrentApi);


function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for(i = 3; i < 30; i+=8){
          document.getElementById("temp" +(i+1)).innerHTML ="temp: " +data['list'][i]['main']['temp'];
         }
         for(i = 3; i < 30; i+=8){
          document.getElementById("day" +(i+1)).innerHTML ="Date: " +data['list'][i]['dt_txt'].split(' ')[0];
         }
         for(i = 3; i < 30; i+=8){
          document.getElementById("wind" +(i+1)).innerHTML ="wind: " +data['list'][i]['wind']['speed'] + " MPH";
         }
         for(i = 3; i < 30; i+=8){
          document.getElementById("humidity" +(i+1)).innerHTML ="Humidity: " +data['list'][i]['main']['humidity']+ " %";
         }
         for(i = 3; i < 30; i+=8){
          document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data['list'][i]['weather'][0]['icon']+".png";
         }
    
        var nameValue = data['city']['name'];
        nameEl.innerHTML = nameValue;


      });
  }
  button.addEventListener('click', getApi);

  function removeHide(){

    unhideDiv.classList.remove('hide');
    unhideDiv1.classList.remove('hide');
    unhideDiv2.classList.remove('hide');
    unhideDiv3.classList.remove('hide');
    unhideDiv4.classList.remove('hide');
    hideDiv.classList.add('hide');
  
  }
  
    button.addEventListener('click', removeHide);