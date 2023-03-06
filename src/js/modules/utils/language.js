
let currentLanguage = 'fi';

const changeElementLanguages = () => {
if (document.title === 'PWA'){
  const saveButton = document.querySelector('#save-button');
  currentLanguage === 'fi'? saveButton.textContent = 'Tallenna' : saveButton.textContent ='Save view';
}
};
const changeCurrentLanguage = (lang) => {
  console.log(lang, 'jepjep');
  currentLanguage = lang;
  changeElementLanguages();
};

const getCurrentLanguage = () => {
  return currentLanguage;

};

changeElementLanguages();
const languageSettings = {changeCurrentLanguage, getCurrentLanguage};
export default languageSettings;
