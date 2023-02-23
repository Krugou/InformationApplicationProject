import '../styles/main.scss';
import hslRender from './modules/hsl-render';
// import karamalmiData from './modules/karamalmiMenu';
import fetchWeatherLocalorDefault from './modules/weather-data';
const allRestaurants = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo' },
  { name: 'Karamalmi', id: 3208, type: 'Fazer' },
  { name: 'Myllypuro', id: 158, type: 'Sodexo' },
  { name: 'Arabia', id: 1251, type: 'Fazer' },
];

// const MassTransitStops = [
// ];
console.log(allRestaurants);

const renderEnv = async () => {

  // const menu = await karamalmiData.getDailyMenu('3208', 'fi');
  // const rightside = document.querySelector('.rightside');
  const leftside = document.querySelector('.leftside');
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
  hslRender.renderHSLData(leftside,2132208);
};
const initiate = async () => {
  fetchWeatherLocalorDefault(1);
  renderEnv();


};
initiate();
