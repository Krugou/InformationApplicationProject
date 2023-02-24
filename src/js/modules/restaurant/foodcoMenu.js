'use strict';
/**
 * @module foodcoMenu
 */
//const weeklyurlFoodco = 'https://www.compass-group.fi/menuapi/feed/json?costNumber=';


import { doFetch, getWeekdayIndex } from '../network-proxy';


const getDailyMenu = async (lang, restaurantId) => {

  try {
  const today = new Date().toISOString().split('T').shift();
  const menuUrl = 'https://www.compass-group.fi/menuapi/week-menus?costCenter='+restaurantId+'&language='+lang+'&date='+today;
  const weeklyMenu = await doFetch(menuUrl, true);
  console.log(weeklyMenu);
  const menu = weeklyMenu.menus[getWeekdayIndex()];

  if (menu === undefined) {
   // alert('no Fazer data for today, trying to show past fridays data');
    return weeklyMenu.menus[4];
  }
  return weeklyMenu.menus[getWeekdayIndex()];
  } catch (error){
    console.error('getFazerMenu', error);
  }

};
const foodcoData = { getDailyMenu };

export default foodcoData;
