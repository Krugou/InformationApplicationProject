'use strict';
/**
 * Module for Sodexo menu data parsing
 * @module sodexoMenu
 */

import { doFetch, getWeekdayIndex, getNextMonday } from '../../network-proxy';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/';

/** Function for getting Sodexo menu from next monday
 *
 * @param {number} restaurantId id of restaurant
 * @returns object containing daily menu array and date of the menu
 */
const getMenuFromNextMonday = async (restaurantId) => {
  try {
    const monday = getNextMonday();
    const menuUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/${restaurantId}/${monday}`;
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
 * @returns object containing daily menu array and date of the menu
 */
const getDailyMenu = async (restaurantId) => {
  try {
    const weekday = getWeekdayIndex();
    const weeklyMenu = await doFetch(weeklyUrl + restaurantId);
    const menu = weeklyMenu.mealdates[weekday];
    // console.log('🚀 ~ file: sodexoMenu.js:21 ~ getDailyMenu ~ menu:', menu);
    if (menu === undefined) {
      if (weekday === 6 || weekday === 5) { // IF it's the weekend, fetch next mondays menu
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
 * @param {*} menuObject object containing daily Sodexo menu
 * @param {*} lang selected language for meal titles
 * @returns Object containing arrays of the menu's meals' names, diets, prices and the menu's date, or object containing only date array
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
      return course.title_en;
    });
  }
  else if (lang === 'fi') {
    mealNames = Object.values(menu.courses).map((course) => {
      return course.title_fi;
    });
  }
  const mealDiets = Object.values(menu.courses).map((course) => {
    return course.dietcodes;
  });
  const mealPrices = Object.values(menu.courses).map((course) => {
    return course.price;
  });
  return { mealNames, mealDiets, mealPrices, menuDate };
};

const sodexoMenu = { getDailyMenu, parseMenu };
export default sodexoMenu;
