import getCampusInfo from '../utils/campusinfo';
import dietPreferences from '../utils/diet-choices.js';
import foodcoData from './menus/foodcoMenu';
import sodexoMenu from './menus/sodexomenu';
/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
let menuTimer;
const getCurrentMenu = async (lang, selectedCampus) => {
  try {
    let currentMenu = [];
    // Find the selectedmenus info from the allCampuses array
    const currentMenuInfo = getCampusInfo(selectedCampus);
    // console.log('🚀 ~ file: index.js:91 ~ getCurrentMenu ~ currentMenuInfo:', currentMenuInfo);
    // Get the correct menu and save it menu array
    if (currentMenuInfo.type === 'Food & Co') {
      currentMenu = foodcoData.parseMenu(await foodcoData.getDailyMenu(currentMenuInfo.id, lang));
    }
    if (currentMenuInfo.type === 'Sodexo') {
      currentMenu = sodexoMenu.parseMenu(await sodexoMenu.getDailyMenu(currentMenuInfo.id), lang);
    }

    return { currentMenu, currentMenuInfo };
  } catch (err) {
    console.error(err);
    return { currentMenu: [], currentMenuInfo: [] };
  }
};
/** Function for rendering a menu
 *
*/
const renderMenu = async (lang, selectedCampus) => {
  // Create the restaurant name element
  const restaurantNameElement = document.querySelector('.restaurant-name');

  // Create the menu list element
  const menuListElement = document.querySelector('#menu');

  // Get the current menu from the server
  const menuObject = await getCurrentMenu(lang, selectedCampus);

  // Get the current menu from the menuInfo object
  const menu = menuObject.currentMenu;

  // Get the restaurant name from the menuInfo object
  const restaurantName = menuObject.currentMenuInfo.name;

  // Get the restaurant type from the menuInfo object
  const restaurantType = menuObject.currentMenuInfo.type;

  console.log(menuObject);
  menuListElement.innerHTML = '';
  try {
    for (let i = 0; i < menu.mealNames.length; i++) {
      const li = document.createElement('li');
      li.classList.add('menu-item');
      menuListElement.append(li);
      const mealname = menu.mealNames[i];
      const p = document.createElement('p');
      p.classList.add('menu-item-title');
      p.textContent = mealname;
      li.append(p);
      const dietContainer = document.createElement('div');
      dietContainer.classList.add('diet-container');
      const mealDiets = menu.mealDiets[i];

      const dietItems = mealDiets.split(',');
      dietItems.forEach((dietItem) => {
        const p = document.createElement('p');
        p.classList.add('diet-item');
        const results = dietPreferences(dietItem);
        dietContainer.append(results);
        li.append(dietContainer);
      });

      const mealPrices = menu.mealPrices[i];
      priceContainerRender(mealPrices, li);
    }
  } catch (err) {
    const li = document.createElement('li');
    li.classList.add('menu-item');
    const p = document.createElement('p');
    p.classList.add('menu-item-title');
    p.textContent = 'Ei dataa';
    li.append(p);
    menuListElement.append(li);
    menuTimer = setTimeout(() => {
      renderMenu(lang, selectedCampus);
    }, 120000);
  }
  finally {
    restaurantNameElement.textContent = restaurantName;
    changeRestaurantLogo(restaurantType);
  }
};
const priceContainerRender = (item, li) => {
  if (item.match(/\d,\d\d/)) {
    const priceNumbers = document.createElement('div');
    priceNumbers.classList.add('price-numbers');

    // split the string into an array at the '/' character
    const priceItems = item.split('/');
    priceItems.forEach((priceItem) => {

      // if euro sign is missing from priceItem add it
      if (!priceItem.includes('€')) {
        priceItem = priceItem + '€';
      }

      // console.log('🚀 ~ file: index.js:322 ~ priceItems.forEach ~ priceItem:', priceItem);


      // create a p element and add the priceItem to it
      const p = document.createElement('p');
      p.classList.add('menu-item-price');
      p.textContent = priceItem;
      // append the p element to the li element
      priceNumbers.append(p);

    });
    // create a container for priceNumbers and priceTypes
    const priceContainer = document.createElement('div');
    const priceType = document.createElement('div');
    priceType.classList.add('price-type');
    priceContainer.classList.add('price-container');

    // create a p element and add the priceType to it
    const student = document.createElement('p');
    const normal = document.createElement('p');
    const big = document.createElement('p');

    student.textContent = 'Opiskelijalounas';
    normal.textContent = 'Avoin AMK opiskelija';
    big.textContent = 'Henkilökunta/vieraat';

    // append priceNumbers and priceTypes to a container

    priceType.append(student);
    priceType.append(normal);
    priceType.append(big);

    priceContainer.append(priceNumbers);
    priceContainer.append(priceType);

    // append the priceContainer to the li element
    li.append(priceContainer);
  }
};

const changeRestaurantLogo = (restaurantType) => {
  // Get the restaurant logo element
  const restaurantImgElement = document.querySelector('.restaurant-logo');

  // Set the restaurant logo based on the type of restaurant
  switch (restaurantType) {
    case 'Sodexo':
      restaurantImgElement.src = '../assets/logos/sodexo.png';
      restaurantImgElement.alt = 'Sodexo logo';
      break;
    case 'Food & Co':
      restaurantImgElement.src = '../assets/logos/foodco.png';
      restaurantImgElement.alt = 'Food & Co logo';
      break;
    default:
      restaurantImgElement.src = '../assets/logos/restaurant.png';
      restaurantImgElement.alt = 'Restaurant logo';
  }
};
export default renderMenu;
export { menuTimer };
