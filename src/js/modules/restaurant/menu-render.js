import getCampusInfo from '../utils/campusinfo';
import dietPreferences from '../utils/diet-choices';
import getUserlocation from '../utils/distance-data';
import foodcoData from './menus/foodcoMenu';
import sodexoMenu from './menus/sodexomenu';
/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
let menuTimer;
const getCurrentMenu = async (lang, campus) => {
  try {
    if (menuTimer) {
      clearTimeout(menuTimer);
    }

    let currentMenu = [];
    // Find the selectedmenus info from the allCampuses array
    const currentMenuInfo = getCampusInfo(campus);
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
const renderMenu = async (lang, campus) => {
  // Create the restaurant name element
  const restaurantNameElement = document.querySelector('.restaurant-name');

  // Create the menu list element
  const menuListElement = document.querySelector('#menu');

  // Get the current menu from the server
  const menuObject = await getCurrentMenu(lang, campus);

  // if html title is pwa
  if (document.title === 'PWA') {
    const selectedCampus = document.querySelector('#domain-select').value;

    // If the selected campus has changed since fetching, don't render the menu
    if (selectedCampus !== menuObject.currentMenuInfo.name) {
      return;
    }
  }

  // Get the current menu from the menuInfo object
  const menu = menuObject.currentMenu;

  // Create variable for the restaurant's name

  let restaurantName;

  // Get the restaurant type from the menuInfo object
  const restaurantType = menuObject.currentMenuInfo.type;

  menuListElement.innerHTML = '';
  try {
    for (let i = 0; i < menu.mealNames.length; i++) {
      // create list item for each meal
      const li = document.createElement('li');
      li.classList.add('menu-item');
      menuListElement.append(li);
      // get meal name from array
      const mealname = menu.mealNames[i];
      // create paragraph element for meal name
      const p = document.createElement('p');
      p.classList.add('menu-item-title');
      p.textContent = mealname;
      // add meal name paragraph to list item
      li.append(p);
      // create div to hold diet icons
      const dietContainer = document.createElement('div');
      dietContainer.classList.add('diet-container');
      // get meal diet from array
      const mealDiets = menu.mealDiets[i];
      // split meal diet string into array of diets
      const dietItems = mealDiets.split(',');
      dietItems.forEach((dietItem) => {
        // Create a new paragraph element.
        const p = document.createElement('p');
        // Add a class to the new element.
        p.classList.add('diet-item');
        // Call the dietPreferences function and store the return value.
        const results = dietPreferences(dietItem);
        // Append the results to the dietContainer.
        dietContainer.append(results);
        // Append the dietContainer to the li.
        li.append(dietContainer);
      });

      const mealPrices = menu.mealPrices[i];
      priceContainerRender(mealPrices, li);
      restaurantName = menuObject.currentMenuInfo.name + ' ' + menuObject.currentMenu.menuDate;

    }
  } catch (err) {

    restaurantName = menuObject.currentMenuInfo.name + ' ' + menuObject.currentMenu.menuDate;
    // Create a new list item element
    const li = document.createElement('li');
    // Add a class to the new element
    li.classList.add('menu-item');
    // Create a new paragraph element
    const p = document.createElement('p');
    // Add a class to the new element
    p.classList.add('menu-item-title');
    // Add text to the element
    p.textContent = 'Ei dataa';
    // Append the paragraph element to the list item element
    li.append(p);
    // Append the list item element to the menu list element
    menuListElement.append(li);
    // Start a timer to call the renderMenu function
    menuTimer = setTimeout(() => {
      renderMenu(lang, campus);
    }, 60000);
  }
  finally {
    if (document.title === 'PWA') {

      getUserlocation(getCampusInfo(campus));
    }
    // Set the restaurant name text content
    restaurantNameElement.textContent = restaurantName;

    // Change the restaurant logo image source
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
      restaurantImgElement.src = './assets/logos/sodexo.png';
      restaurantImgElement.alt = 'Sodexo logo';
      break;
    case 'Food & Co':
      restaurantImgElement.src = './assets/logos/foodco.png';
      restaurantImgElement.alt = 'Food & Co logo';
      break;
    default:
      restaurantImgElement.src = './assets/logos/restaurant.png';
      restaurantImgElement.alt = 'Restaurant logo';
  }
};
export default renderMenu;
