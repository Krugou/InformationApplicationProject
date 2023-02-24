'use strict';
/**
 * @module foodcoMenu
 */
//const weeklyurlFoodco = 'https://www.compass-group.fi/menuapi/feed/json?costNumber=';


import { doFetch, getWeekdayIndex } from '../network-proxy';


const getDailyMenu = async (restaurantId, lang) => {

  try {
    //const today = new Date().toISOString().split('T').shift();
    const today = '2023-02-28'; //Kovakoodattuna koska ei oo viel dataa
    const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=' + restaurantId + '&language=' + lang + '&date=' + today;
    console.log(menuUrl);
    const weeklyMenu = await doFetch(menuUrl, true);
    console.log(weeklyMenu);
    const menu = weeklyMenu.menus[getWeekdayIndex()];

    if (menu === undefined) {
      alert('no Fazer data for today, trying to show past fridays data');
      return weeklyMenu.menus[4];
    }
    return weeklyMenu.menus[getWeekdayIndex()];
  } catch (error) {
    console.error('getFazerMenu', error);
  }
};
/** Function for parsing fazer menu
 * @param {*} weeklyMenu Array containing daily Fazer menu
 * @returns meal names from array or a 'nodata' menu if data is undefined (this means API fetch failed)
 */
const parseMenu = (dailyMenu) => {
  //const diets = [];
  //const diets2 = [];
  if (dailyMenu === undefined) {
    const failedFetch = [];
    return failedFetch[0] = ['no data'];
  }
  const mealNames = dailyMenu.menuPackages.map((menuPackage) => {
    return menuPackage.meals.map((mealItem) => {
      return mealItem.name + '|'+ mealItem.diets + '|';
    }).join('');
  });
  const mealPrices = dailyMenu.menuPackages.map((menuPackage) => {
    return menuPackage.price;
  });
  /*
  const mealDiets = dailyMenu.menuPackages.map((menuPackage) => {
    return menuPackage.meals.map((mealItem) => {
      return mealItem.diets;
    });
  });
*/
  for (let i = 0; i < mealNames.length; i++) {
    mealNames[i]+=mealPrices[i];
  }
 // console.log(mealDiets);
  console.log(mealPrices);
  console.log(mealNames);
  return mealNames;
};


const foodcoData = { getDailyMenu, parseMenu };

export default foodcoData;
