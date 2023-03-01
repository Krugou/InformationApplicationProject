'use strict';

const weatherSymbol = weatherSymbol => {

  let weathericon = document.querySelector('#weather-info-img');

  if (weatherSymbol === 1) {
    weathericon.setAttribute('src', './assets/logos/cloud.png');
    return 'Selkeää';
  } else if (weatherSymbol === 2) {
    weathericon.setAttribute('src', './assets/logos/cloud.png');
    return 'Puolipilvistä';
  } else if (weatherSymbol === 21) {
    weathericon.setAttribute('src', './assets/logos/drizzle.png');
    return 'Heikkoja sadekuuroja';
  } else if (weatherSymbol === 22) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Sadekuuroja';
  } else if (weatherSymbol === 23) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Voimakkaita sadekuuroja';
  } else if (weatherSymbol === 3) {
    weathericon.setAttribute('src', './assets/logos/cloud.png');
    return 'Pilvistä';
  } else if (weatherSymbol === 31) {
    weathericon.setAttribute('src', './assets/logos/drizzle.png');
    return 'Heikkoa vesisadetta';
  } else if (weatherSymbol === 32) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Vesisadetta';
  } else if (weatherSymbol === 33) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Voimakasta vesisadetta';
  } else if (weatherSymbol === 41) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Heikkoja lumikuuroja';
  } else if (weatherSymbol === 42) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Lumikuuroja';
  } else if (weatherSymbol === 43) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Voimakkaita lumikuuroja';
  } else if (weatherSymbol === 51) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Heikkoa lumisadetta';
  } else if (weatherSymbol === 52) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Lumisadetta';
  } else if (weatherSymbol === 53) {
    weathericon.setAttribute('src', './assets/logos/snow.png');
    return 'Voimakasta lumisadetta';
  } else if (weatherSymbol === 61) {
    weathericon.setAttribute('src', './assets/logos/thunder.png');
    return 'Ukkoskuuroja';
  } else if (weatherSymbol === 62) {
    weathericon.setAttribute('src', './assets/logos/thunder.png');
    return 'Voimakkaita ukkoskuuroja';
  } else if (weatherSymbol === 63) {
    weathericon.setAttribute('src', './assets/logos/thunder.png');
    return 'Ukkosta';
  } else if (weatherSymbol === 64) {
    weathericon.setAttribute('src', './assets/logos/thunder.png');
    return 'Voimakasta ukkosta';
  } else if (weatherSymbol === 71) {
    weathericon.setAttribute('src', './assets/logos/drizzle.png');
    return 'Heikkoja räntäkuuroja';
  } else if (weatherSymbol === 72) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Räntäkuuroja';
  } else if (weatherSymbol === 73) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Voimakkaita räntäkuuroja';
  } else if (weatherSymbol === 81) {
    weathericon.setAttribute('src', './assets/logos/drizzle.png');
    return 'Heikkoa räntäsadetta';
  } else if (weatherSymbol === 82) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Räntäsadetta';
  } else if (weatherSymbol === 83) {
    weathericon.setAttribute('src', './assets/logos/rainy.png');
    return 'Voimakasta räntäsadetta';
  } else if (weatherSymbol === 91) {
    weathericon.setAttribute('src', './assets/logos/fog.png');
    return 'Utua';
  } else if (weatherSymbol === 92) {
    weathericon.setAttribute('src', './assets/logos/fog.png');
    return 'Sumua';
  } else {
    return 'tuntematon';
  }
};
export default weatherSymbol;
