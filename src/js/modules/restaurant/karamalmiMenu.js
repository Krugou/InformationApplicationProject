'use strict';

const weeklyurlFoodco = 'https://www.compass-group.fi/menuapi/feed/json?costNumber=';


import { doFetch } from '../network-proxy';


const getDailyMenu = async (restaurantId, lang) => {
  try {
    const weeklyMenu = await doFetch(`${weeklyurlFoodco}${restaurantId}&language=${lang}`, true);
    let courses = weeklyMenu.MenusForDays[0].SetMenus.map(
      (menuItem) => {
        return menuItem.Components.join(', ');
      }
    );

    return courses;
  } catch (error) {
    throw new Error('getDailyMenu error: ' + error);
  }
};

const foodcoData = { getDailyMenu };

export default foodcoData;
