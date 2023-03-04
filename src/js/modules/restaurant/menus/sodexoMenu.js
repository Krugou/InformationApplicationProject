'use strict';
/**
 * Module for Sodexo menu data parsing
 * @module sodexoMenu
 */

import { doFetch, getWeekdayIndex, getNextMonday } from '../../network-proxy';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/';


const getMenuFromNextMonday = async (restaurantId) => {
  try {
    const monday = getNextMonday();
    const menuUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/${restaurantId}/${monday}`;
    console.log(menuUrl);
    const menu = await doFetch(menuUrl, true);
    const date = new Date(monday);
    console.log(menu);
    return { menu, date }; // Return monday's menu
  }
  catch (error) {
    console.error('getMenuFromNextMonday', error);
  }

};

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
      if (getWeekdayIndex() === 1 || getWeekdayIndex() === 5) { // IF it's the weekend, fetch next mondays menu
        return await getMenuFromNextMonday(restaurantId); // NEXT MONDAY
      }
    }
    const date = new Date(); // return today's date
    return { menu, date };
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
const parseMenu = (menuObject, lang) => {
  const menu = menuObject.menu;
  const date = menuObject.date;
  const menuDate = date.getDate() + '.' + (date.getMonth() + 1);
  if (menu === undefined) {
    return { menuDate };
  }
  let mealNames = [];

  if (lang === 'en') {
    mealNames = Object.values(menu.courses).map((course) => {
      // console.log('🚀 ~ file: sodexoMenu.js:48 ~ coursesEn ~ course:', course);
      return course.title_en;
    });
  }
  else if (lang === 'fi') {
    mealNames = Object.values(menu.courses).map((course) => {
      // console.log('🚀 ~ file: sodexoMenu.js:49 ~ coursesFi ~ course:', course);
      return course.title_fi;
    });
  }
  const mealDiets = Object.values(menu.courses).map((course) => {
    // console.log('🚀 ~ file: sodexoMenu.js:49 ~ coursesFi ~ course:', course);
    return course.dietcodes;
  });
  const mealPrices = Object.values(menu.courses).map((course) => {
    // console.log('🚀 ~ file: sodexoMenu.js:49 ~ coursesFi ~ course:', course);
    return course.price;
  });
  return { mealNames, mealDiets, mealPrices, menuDate };
};

const sodexoMenu = { getDailyMenu, parseMenu };
export default sodexoMenu;
