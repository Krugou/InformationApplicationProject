
let currentLanguage = 'fi';

const changeCurrentLanguage = (lang) => {
  console.log(lang, 'jepjep');
  currentLanguage = lang;
};

const getCurrentLanguage = () => {
  return currentLanguage;

};

const languageSettings = {changeCurrentLanguage, getCurrentLanguage};
export default languageSettings;
