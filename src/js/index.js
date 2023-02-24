import '../styles/main.scss';
import hslRender from './modules/hsl/hsl-render';
// import karamalmiData from './modules/karamalmiMenu';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
const allRestaurants = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo' },
  { name: 'Karamalmi', id: 3208, type: 'Fazer' },
  { name: 'Myllypuro', id: 158, type: 'Sodexo' },
  { name: 'Arabia', id: 1251, type: 'Fazer' },
];
console.log('🚀 ~ file: index.js:11 ~ allRestaurants:', allRestaurants);


// const MassTransitStops = [
// ];


// temp campus is myllypuro
const campus = 'myllypuro';

const renderEnv = async () => {
  const hsl = document.querySelector('.hsl-list');
  // const menu = await karamalmiData.getDailyMenu('3208', 'fi');
  // const rightside = document.querySelector('.rightside');
  // const leftside = document.querySelector('.leftside');
  // leftside.innerHTML = '';
  // rightside.innerHTML = '';
  // const menuDiv = document.createElement('div');
  // const menuDiv2 = document.createElement('div');
  // menuDiv.classList.add('menu');
  // menuDiv2.classList.add('menu');

  // menuDiv.innerHTML = menu.join('<br>');
  // rightside.appendChild(menuDiv);

  // menu.reverse();
  // menuDiv2.innerHTML = menu.join('<br>');

  // leftside.appendChild(menuDiv2);
  if (campus === 'karamalmi') {
    // pysäkki lähellä 2132207,2132208 , 2132225, 2132226, 2133224,2133225

    hslRender.renderHSLData(hsl, 2132208);
    hslRender.renderHSLData(hsl, 2132207);
    hslRender.renderHSLData(hsl, 2132225);
    hslRender.renderHSLData(hsl, 2132226);
    hslRender.renderHSLData(hsl, 2133224);
    hslRender.renderHSLData(hsl, 2133225);
  } else if (campus === 'myyrmaki') {
    // pysäkki lähellä 4150269,4150268 , 4150228, 4150296, 4150201

    hslRender.renderHSLData(hsl, 4150269);
    hslRender.renderHSLData(hsl, 4150268);
    hslRender.renderHSLData(hsl, 4150228);
    hslRender.renderHSLData(hsl, 4150296);
    hslRender.renderHSLData(hsl, 4150201);
  } else if (campus === 'myllypuro') {
    // pysäkki lähellä 1454601,1454602 , 1454140, 1454141
    hslRender.renderHSLData(hsl, 1454601);
    hslRender.renderHSLData(hsl, 1454602);
    hslRender.renderHSLData(hsl, 1454140);
    hslRender.renderHSLData(hsl, 1454141);
  } else if (campus === 'arabia') {
    // pysäkki lähellä 1230201,1230101
    hslRender.renderHSLData(hsl, 1230201);
    hslRender.renderHSLData(hsl, 1230101);
  }


};
const initiate = async () => {
  fetchWeatherLocalorDefault(1);
  renderEnv();


};
initiate();
