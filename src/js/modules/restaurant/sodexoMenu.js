'use strict';
/**
 * Module for Sodexo menu data parsing
 * @module sodexoMenu
 */

import { doFetch, getWeekdayIndex } from '../network-proxy';

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
 * @returns meal names or a 'nodata' menu if data is undefined (this means API fetch failed)
 */
const parseMenu = (menu, lang) =>  {
  if (menu === undefined){
    const failedFetch = [];
    return failedFetch[0] = ['no data'];
  }
  const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
  const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
  return lang === 'en' ? coursesEn : coursesFi;
};

const sodexoMenu = {getDailyMenu, parseMenu};
export default sodexoMenu;
