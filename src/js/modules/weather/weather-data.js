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
  console.log(campus);
};

/**
 *  Fetches weather data from FMI API
 * @param {*} lat
 * @param {*} lon
 * @param {*} hoursfromnow
 */
const fetchWeather = async (lat, lon, hoursfromnow) => {
  let weatherData = 'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::simple&latlon=' + lat + ',' + lon + '&parameters=temperature,windSpeedMS,WeatherSymbol3';
  console.log('🚀 ~ file: weather-data.js:34 ~ fetchWeather ~ weatherData', weatherData);
  try {
    await fetch(weatherData).then(response => response.text()).then((xml) => {
      const parser = new DOMParser();
      const xmlDOM = parser.parseFromString(xml, 'application/xml');
      const tempTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.1"]';
      const windTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.2"]';
      const WeatherSymbolTarget = '[*|id="BsWfsElement.1.' + hoursfromnow + '.3"]';
      let temp = parseFloat(xmlDOM.querySelector(tempTarget).querySelector('ParameterValue').textContent);
      let wind = parseFloat(xmlDOM.querySelector(windTarget).querySelector('ParameterValue').textContent);
      let WeatherSymbol = parseFloat(xmlDOM.querySelector(WeatherSymbolTarget).querySelector('ParameterValue').textContent);
      let weatherInfo = document.querySelector('.weather-report');
      weatherInfo.innerHTML = '';
      try {
        weatherInfo.id = 'weather-info-div';
        // const welcomeWeather = document.createElement('h3');
        const tempInfo = document.createElement('p');
        tempInfo.classList = 'temp-info';
        const windInfo = document.createElement('p');
        windInfo.classList = 'wind-info';
        // const windInfo = document.createElement('p');
        const weatherSymbolInfo = document.createElement('img');
        weatherSymbolInfo.id = 'weather-info-img';

        // weatherSymbolInfo.innerText = weatherSymbol(WeatherSymbol);
        // windInfo.innerText = windDescription(wind) + ' ' + wind + ' m/s';
        // if (windInfo.innerText === 'Tyyntä NaN m/s') {
        //   windInfo.innerText = 'Tyyntä';
        // }
        // tempwindInfo.innerText = `Lämmintä ${temp} °C`;
        // welcomeWeather.innerText = `Sää ${hoursfromnow}h päästä: `;
        if (wind === 'NaN') {
          tempInfo.innerText = `${temp}°C`;
          weatherInfo.appendChild(tempInfo);

        } else {
          tempInfo.innerText = `${temp}°C `;
          windInfo.innerText = ` ${wind} m/s`;
          weatherInfo.appendChild(tempInfo);
          weatherInfo.appendChild(windInfo);

        }
        weatherInfo.appendChild(weatherSymbolInfo);


        weatherSymbol(WeatherSymbol);

      } catch (error) {
        console.log(error);
      }
    }).catch((error) => {
      console.log(error);
    });
  } catch (e) {
    console.log(e);
  }
  console.log('weather added');
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
