'use strict';
/**
 * Module for Sodexo menu data parsing
 * @module sodexoMenu
 */

import { doFetch, getWeekdayIndex } from '../../network-proxy';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/';

/** Get daily menu from Sodexo API
 *
 * @param {number} restaurantid id of the restaurant
 * @returns Menu array
 */
const getDailyMenu = async (restaurantId) => {
  try {

    const weeklyMenu = await doFetch(weeklyUrl + restaurantId);
    const menu = weeklyMenu.mealdates[getWeekdayIndex()];
    // console.log('🚀 ~ file: sodexoMenu.js:21 ~ getDailyMenu ~ menu:', menu);
    if (menu === undefined) {
      alert('no Sodexo data for today, showing past fridays data');
      return weeklyMenu.mealdates[4];
    }
    return menu;
  } catch (error) {
    console.error('getDailyMenu error', error);
  }

};

/** Function for parsing Sodexo menu
 *
 * @param {*} menu object containing daily Sodexo menu
 * @param {*} lang selected language for meal titles
 * @returns meal names, price and allergies or a 'nodata' menu if data is undefined (this means API fetch failed)
 */
const parseMenu = (menu, lang) => {
  if (menu === undefined) {
    const failedFetch = [];
    return failedFetch[0] = ['no data'];
  }

  const coursesEn = Object.values(menu.courses).map((course) => {
    // console.log('🚀 ~ file: sodexoMenu.js:48 ~ coursesEn ~ course:', course);

    return course.title_en + '|(' + course.dietcodes + ')|' + course.price;
  }
  );
  const coursesFi = Object.values(menu.courses).map((course) => {
    // console.log('🚀 ~ file: sodexoMenu.js:49 ~ coursesFi ~ course:', course);
    return course.title_fi + '|(' + course.dietcodes + ')|' + course.price;
  });
  return lang === 'en' ? coursesEn : coursesFi;
};

const sodexoMenu = { getDailyMenu, parseMenu };
export default sodexoMenu;