'use strict';
const fetchWeatherLocalorDefault = async (hoursfromnow) => {
  // if lat and lon are not defined, use default values
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
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
      else {

        console.log('Geolocation is not supported by this browser.');
      }
    });
  }
};


const fetchWeather = async (lat, lon, hoursfromnow) => {
  let weatherData = 'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=ecmwf::forecast::surface::point::simple&latlon=' + lat + ',' + lon + '&parameters=temperature,WindSpeedMS,WeatherSymbol3';
  console.log('🚀 ~ file: weather-data.js:34 ~ fetchWeather ~ weatherData', weatherData);
  try {
    await fetch(weatherData).then(response => response.text()).then((xml) => {
      const parser = new DOMParser();
      const xmlDOM = parser.parseFromString(xml, 'application/xml');
      const searchquery = '[*|id="BsWfsElement.1.' + hoursfromnow + '.1"]';
      const searchquery2 = '[*|id="BsWfsElement.1.' + hoursfromnow + '.2"]';
      let tomorrowTemp = parseFloat(xmlDOM.querySelector(searchquery).querySelector('ParameterValue').textContent);
      let tomorrowWind = parseFloat(xmlDOM.querySelector(searchquery2).querySelector('ParameterValue').textContent);
      let saaTiedot = document.querySelector('.extrainfotab');

      try {
        const tomorrowWeatherInfo = document.createElement('div');
        tomorrowWeatherInfo.id = 'weather-info';
        const welcomeWeather = document.createElement('h3');
        const tomorrowContainerParagraphs = document.createElement('div');
        const tomorrowTempInfo = document.createElement('p');
        const tomorrowWindInfo = document.createElement('p');
        tomorrowWindInfo.innerText = windDescription(tomorrowWind) + ' ' + tomorrowWind + ' m/s';
        if (tomorrowWindInfo.innerText === 'Tyyntä NaN m/s') {
          tomorrowWindInfo.innerText = 'Tyyntä';
        }
        tomorrowTempInfo.innerText = `Lämmintä ${tomorrowTemp} °C`;
        welcomeWeather.innerText = `Sää ${hoursfromnow}h päästä: `;
        tomorrowWeatherInfo.appendChild(welcomeWeather);
        tomorrowContainerParagraphs.appendChild(tomorrowTempInfo);
        tomorrowContainerParagraphs.appendChild(tomorrowWindInfo);
        tomorrowWeatherInfo.appendChild(tomorrowContainerParagraphs);

        saaTiedot.appendChild(tomorrowWeatherInfo);

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

const windDescription = windSpeed => {
  if (windSpeed >= 1 && windSpeed <= 3) {
    return 'Tyyntä';
  } else if (windSpeed >= 4 && windSpeed <= 7) {
    return 'Heikkoa tuulta';
  } else if (windSpeed >= 8 && windSpeed <= 13) {
    return 'Kohtalaista tuulta';
  } else if (windSpeed >= 14 && windSpeed <= 20) {
    return 'Navakkaa tuulta';
  } else if (windSpeed >= 21 && windSpeed <= 32) {
    return 'Myrskyä';
  } else if (windSpeed >= 33) {
    return 'Hirmumyrskyä';
  } else {
    return 'Tyyntä';
  }
};

export default fetchWeatherLocalorDefault;
