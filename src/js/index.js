import '../styles/main.scss';
import hslInit from './modules/hsl/hsl-init';
import { hslTimer } from './modules/hsl/hsl-render';
import { doFetch } from './modules/network-proxy';
import paSystem from './modules/pa/Announcements';
import renderMenu, { menuTimer } from './modules/restaurant/menu-render';
import getCampusInfo from './modules/utils/campusinfo';
import languageSettings from './modules/utils/language';
import renderElements from './modules/utils/renderElements';
// import serviceWorkerFunction from './modules/utils/sw';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
// default campus
let selectedCampus = 'Karamalmi';
const campusInfoUrl = 'https://krugou.github.io/InformationApplicationProject/json/campuses.json';
const campusInfo = doFetch(campusInfoUrl, true);
//default language
let lang = 'fi';

const changeLanguage = (selectedCampus) => {
  try {
    if (lang === 'fi') lang = 'en';
    else if (lang === 'en') lang = 'fi';
    languageSettings.changeCurrentLanguage(lang);
    renderMenu(lang, selectedCampus);
    hslInit.getStopsNearbyHsl();
  }
  catch (error) {
    console.log(error);
  }
};
if (document.title === 'DS') {
  // url params for language
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('lang')) {
    lang = urlParams.get('lang');
  }

  if (urlParams.has('campus')) {

    selectedCampus = urlParams.get('campus');
    console.log('🚀 ~ file: index.js:26 ~ selectedCampus:', selectedCampus);
  }
  setInterval(() => {
    changeLanguage(selectedCampus);
  }, 120000);

}
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
const loadSettings = () => {
  if (document.title === 'PWA') {
    try {
      selectedCampus = (JSON.parse(localStorage.campus));
      document.querySelector('#domain-select').value = selectedCampus;
    } catch (error) {
      selectedCampus = document.querySelector('#domain-select').value;
    }
  }
};
const saveSettings = () => {
  if (document.title === 'PWA') {
    const settings = {};
    settings.campus = selectedCampus;
    localStorage.setItem('campus', JSON.stringify(settings.campus));
  }
};
if (document.title === 'PWA') {
  // DOM Elements
  const campusSelector = document.querySelector('#domain-select');
  const languageButton = document.querySelector('#language-button');
  const saveButton = document.querySelector('#save-button');

  selectedCampus = document.querySelector('#domain-select').value;

  /**
   * Saves settings to localstorage
  */

  saveButton.addEventListener('click', () => {
    saveSettings();
  });


  // Event listener for changing the selected language
  languageButton.addEventListener('click', () => {
    changeLanguage(selectedCampus);
  });

  // Event listener for changing the selected campus
  campusSelector.addEventListener('change', () => {
    selectedCampus = document.querySelector('#domain-select').value;
    clearTimeout(menuTimer);
    clearTimeout(hslTimer);

    fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
    hslInit.getStopsNearbyHsl(lang);
    renderMenu(lang, selectedCampus);
  });

}

const leftside = document.querySelector('.leftside');
const initiate = async () => {
  // serviceWorkerFunction();
  loadSettings();
  fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
  paSystem.getAnnouncements(leftside, 1);
  renderElements.renderVideo();
  renderElements.hslContainer(leftside);
  renderMenu(lang, selectedCampus);

  hslInit.getStopsNearbyHsl(lang);
};
initiate();

