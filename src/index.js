
import '../css/styles.css';


// Business Logic

function getWeather (city) {

  //First, we use the constructor of the XMLHttpRequest object (XHR for short) to create a new instance of it; we save this instance in a variable called request:// 

  let request = new XMLHttpRequest ();

  //Next, we save the URL for our API call in a variable called url//


const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY}`;


  //Next, we set up an event listener that listens for when our API call is complete:// 
  
request.addEventListener ('loadend', function () {
  const response = JSON.parse (this.responseText);
  console.log (response);
  if (this.status === 200) {
    printElements (response, city);
  } else {
    // there's a new argument
    printError (this, response, city);
  }
});



  request.open ('GET', url, true);
  request.send ();
}

// UI Logic

function printError (request, city) {
  document.querySelector (
    '#showResponse'
  ).innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}


function printElements (apiResponse, city) {
  document.querySelector (
    '#showResponse'
  ).innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
}

function handleFormSubmission (event) {
  event.preventDefault ();
  const city = document.querySelector ('#location').value;
  document.querySelector ('#location').value = null;
  getWeather (city);
}

window.addEventListener ('load', function () {
  document
    .querySelector ('form')
    .addEventListener ('submit', handleFormSubmission);
});
