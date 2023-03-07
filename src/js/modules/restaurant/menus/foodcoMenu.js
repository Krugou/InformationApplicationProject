'use strict';
/**
 * @module foodcoMenu
 */

import {
  doFetch, getWeekdayIndex, getNextMonday
} from '../../network-proxy';


/** Returns Fazer/Foodco menu from next monday
 * @param {number} restaurantId id of restaurant
 * @param {string} lang selected UI language
 * @returns object containing daily menu array and date of the menu
 */
const getMenuFromNextMonday = async (restaurantId, lang) => {
  try {

    const monday = getNextMonday();

    const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=' + restaurantId + '&language=' + lang + '&date=' + monday;
    console.log(menuUrl);
    const weeklyMenu = await doFetch(menuUrl, true);
    const menu = weeklyMenu.menus[0];
    const date = new Date(monday);
    return {menu, date}; // Return monday's menu
  }
  catch (error){
    console.error('getMenuFromNextMonday', error);
  }
};

/** Returns daily Fazer/Foodco menu
 *
 * @param {number} restaurantId id of restaurant
 * @param {string} lang selected UI language
 * @returns object containing daily menu array and date of the menu
 */
const getDailyMenu = async (restaurantId, lang) => {

  try {
    const weekday = getWeekdayIndex();
    const today = new Date().toISOString().split('T').shift();
    const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=' + restaurantId + '&language=' + lang + '&date=' + today;
    console.log(menuUrl);
    const weeklyMenu = await doFetch(menuUrl, true);
    const menu = weeklyMenu.menus[weekday];
    if (menu === undefined) {
      if (weekday === 6 || weekday === 5) { // IF it's the weekend, fetch next mondays menu
        return await getMenuFromNextMonday(restaurantId, lang); // NEXT MONDAY
      }
    }
    const date = new Date(); // return today's date
    return {menu, date};
  } catch (error) {
    console.error('getDailyMenu', error);
  }
};


/** Function for getting diets from Fazer/Foodco menu
 *
 * @param {Array} dailyMenu array containing daily Fazer/Foodco menu
 * @returns diets by meal from menu
 */
const getDietsFromMenu = (dailyMenu) => {

  let mealDiets = [];
  try {
    const mealComponentDiets = dailyMenu.menuPackages.map((menuPackage) => {
      return menuPackage.meals.map((mealItem) => {
        return mealItem.diets;
      }).join();
    });

    const mealComponentCount = dailyMenu.menuPackages.map((menuPackage) => {
      return menuPackage.meals.map((mealItem) => {
        return mealItem.diets;
      });
    });

    for (let i = 0; i < mealComponentDiets.length; i++) {
      let thisMealsDiets = [];
      mealComponentDiets[i].split(',').forEach(element => {
        // if the diet is present in all the elements of the mealarray, push it to an array
        if (mealComponentDiets[i].split(',').filter(x => x === element).length === mealComponentCount[i].length && thisMealsDiets.includes(element) === false) {
          thisMealsDiets.push(element);
          mealDiets[i] = [...thisMealsDiets].join();
        }
      });
    }
    return mealDiets;
  } catch (error) {
    console.error(error, 'getDietsFromComponents error');
  }
};


/** Function for parsing fazer menu
 * @param {object} dailyMenuObject Object containing daily menu and the menu's date
 * @returns Object containing arrays of the menu's meals' names, diets, prices and the menu's date
 */
const parseMenu = (dailyMenuObject) => {
  try {
    const dailyMenu = dailyMenuObject.menu;
    const date = dailyMenuObject.date;
    const menuDate = date.getDate() + '.' + (date.getMonth()+1);

    if (dailyMenu === undefined) {
      return {menuDate};
    }
    const mealNames = dailyMenu.menuPackages.map((menuPackage) => {
      return menuPackage.meals.map((mealItem) => {
        return mealItem.name;
      }).join(', ');
    });
    const mealPrices = dailyMenu.menuPackages.map((menuPackage) => {
      return menuPackage.price;
    });

    const mealDiets = getDietsFromMenu(dailyMenu);

    for (let i = 0; i < mealPrices.length; i++) {
      if (mealPrices[i] === '') {
        mealPrices[i] = 'Ei hintaa';
      }
    }
    return {mealNames, mealDiets, mealPrices, menuDate};
  }
  catch (error) {
    console.error(error, 'parseMenu Error food co');
  }
};


const foodcoData = { getDailyMenu, parseMenu };

export default foodcoData;
