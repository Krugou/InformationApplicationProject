'use strict';
/** Module for global language control
 * @module language
 */
let currentLanguage = 'fi';
/**
 *  Changes element languages
 *
 */
const changeElementLanguages = () => {
if (document.title === 'PWA'){
  const saveButton = document.querySelector('#save-button');
  currentLanguage === 'fi'? saveButton.textContent = 'Tallenna' : saveButton.textContent ='Save view';
}
};
/** Changes the global language setting
 *
 * @param {string} lang language
 */
const changeCurrentLanguage = (lang) => {
  currentLanguage = lang;
  changeElementLanguages();
};
/** Gets the current global language
 *
 * @returns {string} current language
 */
const getCurrentLanguage = () => {
  return currentLanguage;

};

changeElementLanguages();
const languageSettings = {changeCurrentLanguage, getCurrentLanguage};
export default languageSettings;
