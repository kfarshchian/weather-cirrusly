//html selectors and arrays
var button = document.querySelector("#button");
var inputValue = document.querySelector('#textboxSearch');
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
var unhideDiv4 =  document.getElementById("icons4");
var unhideDiv5 =  document.getElementById("icons5");
var hideDiv =  document.getElementById("weatherImg");
var theCity = [];
var timeDisplayEl = $('#time-display');

//pulling the time and date from dayjs
function displayTime() {
  var rightNow = dayjs().format('M/D/YYYY');
  timeDisplayEl.text(rightNow);
}
//calling date and time function
displayTime()

//function to call the current weather
function getCurrentApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
//grabbing data from api call
      var tempValue = data['main']['temp'];
      var descImg = "<img src =http://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + ".png>"; 
      var humidityValue = data['main']['humidity'];
      var windValue = data['wind']['speed'];
      //adding the info to html
      currentTemp.innerHTML = "temp: " + tempValue;
      currentDesc.innerHTML = descImg;
      currentHumidity.innerHTML = "Humidity: " + humidityValue + " %";
      currentWind.innerHTML = "Wind: " + windValue + " MPH";
    });
}
//onclick for the api to run
button.addEventListener('click', getCurrentApi);

//calling the 5 day weather api
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //adding the data to the HTML from the 5 day api
        for(i = 3; i < 36; i+=8){
          document.getElementById("temp" +(i+1)).innerHTML ="temp: " +data['list'][i]['main']['temp'];
         }
         for(i = 3; i < 36; i+=8){
          document.getElementById("day" +(i+1)).innerHTML ="Date: " +dayjs(data['list'][i]['dt_txt']).format('M/D/YYYY');
         }
         for(i = 3; i < 36; i+=8){
          document.getElementById("wind" +(i+1)).innerHTML ="wind: " +data['list'][i]['wind']['speed'] + " MPH";
         }
         for(i = 3; i < 36; i+=8){
          document.getElementById("humidity" +(i+1)).innerHTML ="Humidity: " +data['list'][i]['main']['humidity']+ " %";
         }
         for(i = 3; i < 36; i+=8){
          document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data['list'][i]['weather'][0]['icon']+".png";
         }
    //adding the info to local storage
        var nameValue = data['city']['name'];
        nameEl.innerHTML = nameValue;
        localStorage.setItem('theCity', theCity);
        console.log(theCity);
        //function call to add the history of searches to html
         searchFunction()
         
      });
  }
  //call button for the 5 day api
  button.addEventListener('click', getApi);

  //Hide and unhide the cover picture
  function removeHide(){

    unhideDiv.classList.remove('hide');
    unhideDiv1.classList.remove('hide');
    unhideDiv2.classList.remove('hide');
    unhideDiv3.classList.remove('hide');
    unhideDiv4.classList.remove('hide');
    unhideDiv5.classList.remove('hide');
    hideDiv.classList.add('hide');
  
  }
  //onclick run hide function
    button.addEventListener('click', removeHide);

  
// add the search to the history bar so it can be clicked and searched again
    function searchFunction(data) {

      theCity.push($('#textboxSearch').val()); // This line puts the value from the text box in an array
      $('#textboxSearch').val(""); //  clear the text box after search
      $('#searchHistory').text(""); //clear the seach history window then repopulate with the new array
    
      // the function below loops through the array and adds each item in the array
      // to the span element within the Search history arear
      $.each(theCity, function(index, value) {
        $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox(" + index + ")'>" + value + '</li>');
      });
    }
    
    function addtotextbox(id) {
      $('#textboxSearch').val(theCity[id]);
    }



