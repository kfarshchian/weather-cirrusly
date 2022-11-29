// var button = document.querySelector("#button");
// var inputValue = document.querySelector('#inputValue');
// var nameEl = document.querySelector('#name');
// var desc = document.querySelector('#desc');
// var temp = document.querySelector('#temp');
// var day = document.querySelector('#day');
// var wind = document.querySelector('#wind');
// var humidity = document.querySelector('#humidity');


function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
       for(i = 0; i < 5; i++){
        document.getElementById("temp" +(i+1)).innerHTML ="temp: " +data['list'][i]['main']['temp'];
       }
       
       
       
       
       
        // var nameValue = data['city']['name'];
        // var tempValue = data['list'][0]['main']['temp'];
        // var descValue = data['list'][0]['weather'][0]['description'];
        // var dayValue = data['list'][0]['dt_txt']
        // var humidityValue = data['list'][0]['main']['humidity'];
        // var windValue = data['list'][0]['wind']['speed'];
        
        // nameEl.innerHTML = nameValue;
        // temp.innerHTML = "temp: " + tempValue;
        // desc.innerHTML = descValue;
        // day.innerHTML = "Date: " + dayValue;
        // humidity.innerHTML = "Humidity: " + humidityValue + " %";
        // wind.innerHTML = "Wind: " + windValue + " MPH";
      });
  }
  button.addEventListener('click', getApi);

  