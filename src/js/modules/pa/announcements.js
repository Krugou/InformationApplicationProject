// import { doFetch } from '../network-proxy';
// mockdata for announcements
// const announcements = [{ title: 'Mr. Anderson', date: 'future', content: 'Welcome to the real world' }];
import announcements from '../../../../json/announcements.json';
console.log('🚀 ~ file: Announcements.js:5 ~ announcements:', announcements);


// // get announcements from API
const getAnnouncements = async (target) => {
  try {
    // const announcementsUrl = 'https://www.compass-group.fi/menuapi/announcements?language=fi';
    // const announcements = await doFetch(announcementsUrl, true);

    renderAnnouncements(target, announcements);
  } catch (error) {
    console.error('getAnnouncements', error);
  }
};

const renderAnnouncements = (target, announcements) => {
  // loop through announcements and render them

  const allAnnouncements = () => {
    for (let i = 0; i < announcements.length; i++) {
      renderAnnouncementsContainer(target, announcements, i);
    }
  };
  const randomAnnouncements = () => {
    const i = Math.floor(Math.random() * announcements.length);
    renderAnnouncementsContainer(target, announcements, i);

  };
  randomAnnouncements();

};
const renderAnnouncementsContainer = (target, announcements, i) => {
  const announcementsContainer = document.createElement('div');
  announcementsContainer.classList.add('announcements-container');
  target.append(announcementsContainer);
  // create container element for header
  const announcementsContainerHeader = document.createElement('div');
  announcementsContainerHeader.classList.add('announcements-container-header');
  announcementsContainer.append(announcementsContainerHeader);
  // create title element for header
  const announcementsContainerHeaderTitle = document.createElement('h2');
  announcementsContainerHeaderTitle.classList.add('announcements-container-header-title');
  announcementsContainerHeaderTitle.textContent = announcements[i].title;
  announcementsContainerHeader.append(announcementsContainerHeaderTitle);
  // create date element for header
  const announcementsContainerHeaderDate = document.createElement('p');
  announcementsContainerHeaderDate.classList.add('announcements-container-header-date');
  announcementsContainerHeaderDate.textContent = 'Date: ' + announcements[i].date;
  announcementsContainerHeader.append(announcementsContainerHeaderDate);
  // create container element for content
  const announcementsContainerContent = document.createElement('div');
  announcementsContainerContent.classList.add('announcements-container-content');
  announcementsContainer.append(announcementsContainerContent);
  // create paragraph element for content
  const announcementsContainerContentText = document.createElement('p');
  announcementsContainerContentText.classList.add('announcements-container-content-text');
  announcementsContainerContentText.textContent = announcements[i].content;
  announcementsContainerContent.append(announcementsContainerContentText);
};
const paSystem = { getAnnouncements };
export default paSystem;
