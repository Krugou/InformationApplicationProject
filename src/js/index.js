import campusInfo from '../../json/campuses.json';
import '../styles/main.scss';
import hslRender from './modules/hsl/hsl-render';
import paSystem from './modules/pa/Announcements';
import renderMenu from './modules/restaurant/menu-render';
import getCampusInfo from './modules/utils/campusinfo';
import renderElements from './modules/utils/renderElements';
//default language
let lang = 'fi';

// import serviceWorkerFunction from './modules/utils/sw';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
/*
const allCampuses = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo', stops: [4150296, 4150201] },
  { name: 'Karamalmi', id: 3208, type: 'Food & Co', stops: [ 2132225, 2132226] },
  { name: 'Myllypuro', id: 158, type: 'Sodexo', stops: [1454140, 1454141] },
  { name: 'Arabia', id: 1251, type: 'Food & Co', stops: [1230102, 1230101] },
];

*/
const allCampuses = campusInfo.campuses;
console.log('🚀 ~ file: index.js:20 ~ allCampuses:', allCampuses);
// DOM Elements
const campusSelector = document.querySelector('#domain-select');
const languageButton = document.querySelector('#language-button');
const saveButton = document.querySelector('#save-button');
let selectedCampus;

// // get title of the html
// const title = document.querySelector('title');
// if (title.innerHTML === 'PWA') {
selectedCampus = document.querySelector('#domain-select').value;

/**
 * Saves settings to localstorage
*/
const saveSettings = () => {
  const settings = {};
  settings.campus = selectedCampus;
  localStorage.setItem('campus', JSON.stringify(settings.campus));
};

saveButton.addEventListener('click', () => {
  saveSettings();
});


// Event listener for changing the selected language
languageButton.addEventListener('click', () => {
  selectedCampus = document.querySelector('#domain-select').value;
  if (lang === 'fi') lang = 'en';
  else if (lang === 'en') lang = 'fi';
  renderMenu(lang, selectedCampus);
});

// Event listener for changing the selected campus
campusSelector.addEventListener('change', () => {
  selectedCampus = document.querySelector('#domain-select').value;
  fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
  getStopsNearbyHsl();
  renderMenu(lang, selectedCampus);
});

// }
/**
 * Loads settings from localstorage
 */
const loadSettings = () => {
  try {
    selectedCampus = (JSON.parse(localStorage.campus));
    document.querySelector('#domain-select').value = selectedCampus;
  } catch (error) {
    selectedCampus = document.querySelector('#domain-select').value;
  }

};
const getStopsNearbyHsl = async () => {
  const hsl = document.querySelector('.hsl-list');
  hsl.innerHTML = '';
  const selectedRestaurant = allCampuses.find((restaurant) => restaurant.name === selectedCampus);

  if (selectedRestaurant) {
    selectedRestaurant.stops.forEach((stop) => {
      hslRender.HSLContainerRender(hsl, stop, 3);
    });
  } else {
    hsl.innerHTML = 'No restaurant found';
  }
  setTimeout(() => {
    getStopsNearbyHsl();
  }, 60000);
};

const leftside = document.querySelector('.leftside');
const initiate = async () => {
  // serviceWorkerFunction();
  loadSettings();
  fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
  paSystem.getAnnouncements(leftside,5);
  renderElements.renderVideo(leftside);
  renderElements.hslContainer(leftside);
  getStopsNearbyHsl();
  renderMenu(lang, selectedCampus);

};
initiate();

