'use strict';
import weatherSymbol from './weather-symbol';
const fetchWeatherLocalorDefault = async (hoursfromnow, campus) => {
  // if lat and lon are not defined, use default values
  let lat = campus.lat;
  let lon = campus.lon;

  /*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

    }
    else {

      console.log('Geolocation is not supported by this browser.');
    }
  });
    */
  // if latitude and longitude are not inside finland use default values
  if (lat < 59.5 || lat > 70.5 || lon < 19.5 || lon > 31.5) {
    lat = 60.1699;
    lon = 24.9384;
    fetchWeather(lat, lon, hoursfromnow);
  }
  // if latitude and longitude are inside finland use them
  else if (lat > 59.5 && lat < 70.5 && lon > 19.5 && lon < 31.5) {
    fetchWeather(lat, lon, hoursfromnow);
  }
};


const fetchWeather = async (lat, lon, hoursfromnow) => {
  let weatherData = 'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::simple&latlon=' + lat + ',' + lon + '&parameters=temperature,WindSpeedMS,WeatherSymbol3';
  console.log('🚀 ~ file: weather-data.js:34 ~ fetchWeather ~ weatherData', weatherData);
  try {
    await fetch(weatherData).then(response => response.text()).then((xml) => {
      const parser = new DOMParser();
      const xmlDOM = parser.parseFromString(xml, 'application/xml');
      const tomorrowTempTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.1"]';
      const tomorrowWindTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.2"]';
      const tomorrowWeatherSymbolTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.3"]';
      let tomorrowTemp = parseFloat(xmlDOM.querySelector(tomorrowTempTarget).querySelector('ParameterValue').textContent);
      let tomorrowWind = parseFloat(xmlDOM.querySelector(tomorrowWindTarget).querySelector('ParameterValue').textContent);
      let tomorrowWeatherSymbol = parseFloat(xmlDOM.querySelector(tomorrowWeatherSymbolTarget).querySelector('ParameterValue').textContent);
      let saaTiedot = document.querySelector('.weather-report');

      try {
        const tomorrowWeatherInfo = document.createElement('div');
        tomorrowWeatherInfo.id = 'weather-info-div';
        // const welcomeWeather = document.createElement('h3');
        const tomorrowContainerParagraphs = document.createElement('div');
        const tomorrowTempWindInfo = document.createElement('p');
        // const tomorrowWindInfo = document.createElement('p');
        const tomorrowWeatherSymbolInfo = document.createElement('img');
        tomorrowWeatherSymbolInfo.id = 'weather-info-img';

        // tomorrowWeatherSymbolInfo.innerText = weatherSymbol(tomorrowWeatherSymbol);
        // tomorrowWindInfo.innerText = windDescription(tomorrowWind) + ' ' + tomorrowWind + ' m/s';
        // if (tomorrowWindInfo.innerText === 'Tyyntä NaN m/s') {
        //   tomorrowWindInfo.innerText = 'Tyyntä';
        // }
        // tomorrowTempWindInfo.innerText = `Lämmintä ${tomorrowTemp} °C`;
        // welcomeWeather.innerText = `Sää ${hoursfromnow}h päästä: `;
        if (tomorrowWind === 'NaN') {
          tomorrowTempWindInfo.innerText = `${tomorrowTemp}°C`;
        } else {
          tomorrowTempWindInfo.innerText = `${tomorrowTemp}°C ${tomorrowWind} m/s`;
        }
        // tomorrowWeatherInfo.appendChild(welcomeWeather);
        tomorrowContainerParagraphs.appendChild(tomorrowTempWindInfo);
        // tomorrowContainerParagraphs.appendChild(tomorrowWindInfo);
        tomorrowContainerParagraphs.appendChild(tomorrowWeatherSymbolInfo);
        tomorrowWeatherInfo.appendChild(tomorrowContainerParagraphs);

        saaTiedot.innerHTML = '';
        saaTiedot.appendChild(tomorrowWeatherInfo);
        weatherSymbol(tomorrowWeatherSymbol);

      } catch (error) {
        console.log(error);
      }
    }).catch((error) => {
      console.log(error);
    });
  } catch (e) {
    console.log(e);
  }
};

// const windDescription = windSpeed => {
//   if (windSpeed >= 1 && windSpeed <= 3) {
//     return 'Tyyntä';
//   } else if (windSpeed >= 4 && windSpeed <= 7) {
//     return 'Heikkoa tuulta';
//   } else if (windSpeed >= 8 && windSpeed <= 13) {
//     return 'Kohtalaista tuulta';
//   } else if (windSpeed >= 14 && windSpeed <= 20) {
//     return 'Navakkaa tuulta';
//   } else if (windSpeed >= 21 && windSpeed <= 32) {
//     return 'Myrskyä';
//   } else if (windSpeed >= 33) {
//     return 'Hirmumyrskyä';
//   } else {
//     return 'Tyyntä';
//   }
// };


export default fetchWeatherLocalorDefault;
