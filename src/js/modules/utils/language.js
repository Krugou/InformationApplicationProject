
let currentLanguage = 'fi';
/**
 *  Changes element languages
 * @returns {void}
 *
 */
const changeElementLanguages = () => {
if (document.title === 'PWA'){
  const saveButton = document.querySelector('#save-button');
  currentLanguage === 'fi'? saveButton.textContent = 'Tallenna' : saveButton.textContent ='Save view';
}
};
/**
 *
 * @param {*} lang
 */
const changeCurrentLanguage = (lang) => {
  console.log(lang, 'jepjep');
  currentLanguage = lang;
  changeElementLanguages();
};
/**
 *
 * @returns {string} current language
 */
const getCurrentLanguage = () => {
  return currentLanguage;

};

changeElementLanguages();
const languageSettings = {changeCurrentLanguage, getCurrentLanguage};
export default languageSettings;
