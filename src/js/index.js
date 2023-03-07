'use strict';
/** Main js file
 *  @summary Index js, initializes page logic by calling modules
 */
import '../styles/main.scss';
import hslInit from './modules/hsl/hsl-init';
import { doFetch } from './modules/network-proxy';
import paSystem from './modules/pa/Announcements';
import renderMenu, { menuTimer } from './modules/restaurant/menu-render';
import getCampusInfo from './modules/utils/campusinfo';
import languageSettings from './modules/utils/language';
import renderElements from './modules/utils/renderElements';
import serviceWorkerFunction from './modules/utils/sw';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
// default campus
let selectedCampus = 'Karamalmi';
const campusInfoUrl = 'https://krugou.github.io/InformationApplicationProject/json/campuses.json';
const campusInfo = doFetch(campusInfoUrl, true);
//default language
let lang = languageSettings.getCurrentLanguage();
const oneHour = 60 * 60 * 1000;
/** changes UI language
 *
 * @param {string} selectedCampus name of selected campus
 */
const changeLanguage = (selectedCampus) => {
  try {
    if (lang === 'fi') lang = 'en';
    else if (lang === 'en') lang = 'fi';
    languageSettings.changeCurrentLanguage(lang);
    hslInit.getStopsNearbyHsl();
    renderMenu(lang, selectedCampus);
    paSystem.getAnnouncements(leftside, 1);
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
    languageSettings.changeCurrentLanguage(lang);
  }
  if (urlParams.has('campus')) {
    selectedCampus = urlParams.get('campus');
    console.log('🚀 ~ file: index.js:26 ~ selectedCampus:', selectedCampus);
  }
  setInterval(() => {
    changeLanguage(selectedCampus);
  }, 120000);
  setInterval(() => {
    fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
  }, oneHour);
}

const allCampuses = campusInfo.campuses;
console.log('🚀 ~ file: index.js:20 ~ allCampuses:', allCampuses);
/** Function for loading settings from local storage
 *
 */
const loadSettings = () => {
  if (document.title === 'PWA') {
    try {
      selectedCampus = (JSON.parse(localStorage.campus));
      lang = (JSON.parse(localStorage.lang));
      languageSettings.changeCurrentLanguage(lang);
      document.querySelector('#domain-select').value = selectedCampus;
    } catch (error) {
      selectedCampus = document.querySelector('#domain-select').value;
    }
  }
};
/** Function for saving settings to localstorage
 *
 */
const saveSettings = () => {
  if (document.title === 'PWA') {
    const settings = {};
    settings.campus = selectedCampus;
    settings.lang = lang;
    localStorage.setItem('campus', JSON.stringify(settings.campus));
    localStorage.setItem('lang', JSON.stringify(settings.lang));

  }
};
if (document.title === 'PWA') {
  // DOM Elements
  const campusSelector = document.querySelector('#domain-select');
  const languageButton = document.querySelector('#language-button');
  const saveButton = document.querySelector('#save-button');
  selectedCampus = document.querySelector('#domain-select').value;

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

    fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
    hslInit.getStopsNearbyHsl();
    renderMenu(lang, selectedCampus);
  });
}

const leftside = document.querySelector('.leftside');
/**
 * Initiates the application
 */
const initiate = async () => {
  serviceWorkerFunction();
  loadSettings();
  fetchWeatherLocalorDefault(1, getCampusInfo(selectedCampus));
  paSystem.getAnnouncements(leftside, 1);
  renderElements.renderVideo();
  renderElements.hslContainer(leftside);
  renderMenu(lang, selectedCampus);
  hslInit.getStopsNearbyHsl();

};
initiate();
