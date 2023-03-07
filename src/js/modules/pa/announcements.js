import { doFetch } from '../network-proxy';
import languageSettings from '../utils/language';
// mockdata for announcements
// const announcements = [{ title: 'Mr. Anderson', date: 'future', content: 'Welcome to the real world' }];
// import announcements from '../../../../json/announcements.json';
// console.log('🚀 ~ file: Announcements.js:5 ~ announcements:', announcements);


/**
 * Fetches announcements from json file
 * @param {string} target - target element for announcements
 * @param {number} timeout - timeout for announcements
 * @returns {void}
 *
 */
const getAnnouncements = async (target, timeout) => {
  try {
    console.log(target);
    const announcementsUrl = 'https://krugou.github.io/InformationApplicationProject/json/announcements.json';
    const announcements = await doFetch(announcementsUrl);

    renderAnnouncements(target, announcements, timeout);
  } catch (error) {
    console.log('getAnnouncements', error);
    setTimeout(() => {
      getAnnouncements(target, timeout);
    }, 5000);
  }
};

const renderAnnouncements = (target, announcements, timeout) => {
  // loop through announcements and render them
  // slideshow for all announcements


  // const allAnnouncements = () => {
  //   for (let i = 0; i < announcements.length; i++) {
  //     renderAnnouncementsContainer(target, announcements, i);
  //   }
  // };
  const randomAnnouncements = () => {
    const i = Math.floor(Math.random() * announcements.length);
    // console.log('🚀 ~ file: Announcements.js:32 ~ randomAnnouncements ~ i:', i);
    renderAnnouncementsContainer(target, announcements, i);
    setTimeout(() => {
      clearAnnouncements();
      randomAnnouncements();
    }, timeout * 60000);
  };
  randomAnnouncements();

};
/**
 * Clears announcements from DOM
 * @returns {void}
 *
 */
const clearAnnouncements = () => {
  const announcementsContainer = document.querySelector('.announcements-container');
  announcementsContainer.remove();
};
/**
 *
 * @param {*} target - target element for announcements
 * @param {*} announcements - announcements array
 * @param {*} i - index of announcement
 */
const renderAnnouncementsContainer = (target, announcements, i) => {

  if (document.querySelector('.announcements-container')){
    clearAnnouncements();
  }

  const lang = languageSettings.getCurrentLanguage();
  const announcementsContainer = document.createElement('div');
  const announcementsContainerHeader = document.createElement('div');
  const announcementsContainerHeaderTitle = document.createElement('h2');
  const announcementsContainerHeaderDate = document.createElement('p');
  const announcementsContainerContent = document.createElement('div');
  const announcementsContainerContentText = document.createElement('p');
  announcementsContainer.classList.add('announcements-container');
  announcementsContainerHeader.classList.add('announcements-container-header');
  announcementsContainerHeaderTitle.classList.add('announcements-container-header-title');
  announcementsContainerHeaderDate.classList.add('announcements-container-header-date');
  announcementsContainerContent.classList.add('announcements-container-content');
  announcementsContainerContentText.classList.add('announcements-container-content-text');

  if (lang === 'fi'){
    announcementsContainerHeaderTitle.textContent = announcements[i].title_fi;
    announcementsContainerContentText.textContent = announcements[i].content_fi;
    announcementsContainerHeaderDate.textContent = 'Pvm: ' + announcements[i].date;

  } else if (lang === 'en') {
    announcementsContainerHeaderTitle.textContent = announcements[i].title_en;
    announcementsContainerContentText.textContent = announcements[i].content_en;
    announcementsContainerHeaderDate.textContent = 'Date: ' + announcements[i].date;

  }
  // create container element for header
  announcementsContainer.append(announcementsContainerHeader);
  // create title element for header
  announcementsContainerHeader.append(announcementsContainerHeaderTitle);
  // create date element for header
  announcementsContainerHeader.append(announcementsContainerHeaderDate);
  // create container element for content
  announcementsContainer.append(announcementsContainerContent);
  // create paragraph element for content
  announcementsContainerContent.append(announcementsContainerContentText);
  target.prepend(announcementsContainer);


};
const paSystem = { getAnnouncements };
export default paSystem;
