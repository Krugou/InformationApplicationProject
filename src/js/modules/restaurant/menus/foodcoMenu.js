'use strict';
/**
 * @module foodcoMenu
 */
//const weeklyurlFoodco = 'https://www.compass-group.fi/menuapi/feed/json?costNumber=';


import {
  doFetch, getWeekdayIndex, getNextMonday
} from '../../network-proxy';
/**
 *
 * @param {*} restaurantId
 * @param {*} lang
 * @returns
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

/**
 *
 * @param {*} restaurantId
 * @param {*} lang
 * @returns
 */
const getDailyMenu = async (restaurantId, lang) => {

  try {
    const weekday = getWeekdayIndex();
    const today = new Date().toISOString().split('T').shift();
    // console.log('🚀 ~ file: foodcoMenu.js:31 ~ getDailyMenu ~ getNextMonday(new Date(\'2023-05-01\')):', getNextMonday(new Date('2023-05-01')));
    //const today = '2023-03-08'; //Kovakoodattuna testaamiseen
    const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter=' + restaurantId + '&language=' + lang + '&date=' + today;
    console.log(menuUrl);
    const weeklyMenu = await doFetch(menuUrl, true);
    // console.log('🚀 ~ file: foodcoMenu.js:35 ~ getDailyMenu ~ weeklyMenu:', weeklyMenu);
    // console.log('🚀 ~ file: foodcoMenu.js:37 ~ getDailyMenu ~ getWeekdayIndex:', getWeekdayIndex());
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


/**
 *
 * @param {*} dailyMenu Array containing daily Fazer menu
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
        //  console.log(element);
        // console.log(mealComponentDiets);
        // console.log((mealComponentDiets[i].split(',').filter(x => x===element).length));

        // if the diet is present in all the elements of the mealarray, push it to an array
        if (mealComponentDiets[i].split(',').filter(x => x === element).length === mealComponentCount[i].length && thisMealsDiets.includes(element) === false) {
          //  console.log(mealComponentCount[i].length);
          thisMealsDiets.push(element);
          mealDiets[i] = [...thisMealsDiets].join();
          // console.log([...thisMealsDiets]);
        }

        // if(mealComponentDiets[i].includes(element)) console.log('joo');
        //console.log(mealComponentDiets[i].count(element));
      });

    }
    // console.log('🚀 ~ file: foodcoMenu.js:94 ~ getDietsFromMenu ~ mealDiets:', mealDiets);
    // console.log('🚀 ~ file: foodcoMenu.js:96 ~ getDietsFromMenu ~ mealComponentCount:', mealComponentCount);
    // console.log('🚀 ~ file: foodcoMenu.js:98 ~ getDietsFromMenu ~ mealComponentDiets:', mealComponentDiets);
    return mealDiets;
  } catch (error) {
    console.error(error, 'getDietsFromComponents error');
  }
};

/** Function for parsing fazer menu
 * @param {*} dailyMenu Array containing daily Fazer menu
 * @returns meal names from array or a 'nodata' menu if data is undefined (this means API fetch failed)
 */
const parseMenu = (dailyMenuObject) => {
  try {
    const dailyMenu = dailyMenuObject.menu;
    const date = dailyMenuObject.date;
    const menuDate = date.getDate() + '.' + (date.getMonth()+1);
    //const diets = [];
    //const diets2 = [];
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
    // console.log('🚀 ~ file: foodcoMenu.js:136 ~ parseMenu ~ mealDiets:', mealDiets);
    // console.log('🚀 ~ file: foodcoMenu.js:138 ~ parseMenu ~ mealPrices:', mealPrices);
    // console.log('🚀 ~ file: foodcoMenu.js:140 ~ parseMenu ~ mealNames:', mealNames);
    return {mealNames, mealDiets, mealPrices, menuDate};
  }
  catch (error) {
    console.error(error, 'parseMenu Error food co');
  }
};


const foodcoData = { getDailyMenu, parseMenu };

export default foodcoData;
