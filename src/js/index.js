import '../styles/main.scss';
import hslRender from './modules/hsl/hsl-render';
import foodcoData from './modules/restaurant/foodcoMenu';
import sodexoMenu from './modules/restaurant/sodexomenu';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
const allRestaurants = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo' },
  { name: 'Karamalmi', id: 3208, type: 'Food & Co' },
  { name: 'Myllypuro', id: 158, type: 'Sodexo' },
  { name: 'Arabia', id: 1251, type: 'Food & Co' },
];

// DOM Elements
const campusSelector = document.querySelector('#domain-select');
const languageButton = document.querySelector('#language-button');

let selectedCampus = document.querySelector('#domain-select').value;

//default language
let lang = 'fi';

// Event listener for changing the selected language
languageButton.addEventListener('click', () => {
  if (lang === 'fi') lang = 'en';
  else if (lang === 'en') lang = 'fi';
  renderMenu();
});

// Event listener for changing the selected campus
campusSelector.addEventListener('change', () => {
  selectedCampus = document.querySelector('#domain-select').value;
  renderMenu();
  //renderAll
});

console.log('🚀 ~ file: index.js:11 ~ allRestaurants:', allRestaurants);

/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
const getCurrentMenu = async () => {
  let currentMenu = [];
  // Find the selectedmenus info from the allrestaurants array
  const currentMenuInfo = allRestaurants.filter((restaurant) => {
    return restaurant.name === selectedCampus;
  })[0];
  // Get the correct menu and save it menu array
  if (currentMenuInfo.type === 'Food & Co') {
    currentMenu = foodcoData.parseMenu(await foodcoData.getDailyMenu(currentMenuInfo.id, lang));
  }
  if (currentMenuInfo.type === 'Sodexo') {
    currentMenu = sodexoMenu.parseMenu(await sodexoMenu.getDailyMenu(currentMenuInfo.id), lang);
  }
  return { currentMenu, currentMenuInfo };
};

/** Function for rendering a menu
 *
 */
const renderMenu = async () => {
  const restaurantNameElement = document.querySelector('.restaurant-name');
  const menuListElement = document.querySelector('#menu');
  const restaurantImgElement = document.querySelector('.restaurant-logo');

  const menuInfo = await getCurrentMenu();
  const menu = menuInfo.currentMenu;
  const restaurantName = menuInfo.currentMenuInfo.name;
  const restaurantType = menuInfo.currentMenuInfo.type;
  console.log(restaurantType);

  // Clear list
  menuListElement.innerHTML = '';
  menu.forEach((menuItem) => {
    const li = document.createElement('li');
    li.textContent = menuItem;
    menuListElement.append(li);

  });
  restaurantNameElement.textContent = restaurantName;

  // Change restaurant image
  if (restaurantType === 'Sodexo') {
    restaurantImgElement.src = '../assets/logos/sodexo.png';
    restaurantImgElement.alt = 'Sodexo logo';
  }
  if (restaurantType === 'Food & Co') {
    restaurantImgElement.src = '../assets/logos/foodco.png';
    restaurantImgElement.alt = 'Food & Co logo';
  }
};

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
  renderMenu();


};
initiate();
