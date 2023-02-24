'use strict';
/**
 * Module for Sodexo menu data parsing
 * @module sodexoMenu
 */

import { doFetch, getWeekdayIndex } from '../network-proxy';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/';

/** Get daily menu from Sodexo API
 *
 * @param {*} lang - menu language 'fi'/'en'
 * @returns Menu array
 */
const getDailyMenu = async (restaurantId) => {
  try {
  //using dailyUrl
  // const menu = await doFetch(dailyUrl);
  // using weeklyUrl
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

const sodexoMenu = {getDailyMenu};
export default sodexoMenu;
