import '../styles/main.scss';
import hslRender from './modules/hsl/hsl-render';
import foodcoData from './modules/restaurant/foodcoMenu';
import sodexoMenu from './modules/restaurant/sodexomenu';
import dietPreferences from './modules/utils/diet-choices';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
const allRestaurants = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo' },
  { name: 'Karamalmi', id: 3208, type: 'Food & Co' },
  { name: 'Myllypuro', id: 158, type: 'Sodexo' },
  { name: 'Arabia', id: 1251, type: 'Food & Co' },
];


//default language
let lang = 'fi';

// Event listener for changing the selected language
/*
languageButton.addEventListener('click', () => {
  if (lang === 'fi') lang = 'en';
  else if (lang === 'en') lang = 'fi';
  renderMenu();
});
*/

// Event listener for changing the selected campus
/*
campusSelector.addEventListener('change', () => {
  selectedCampus = document.querySelector('#domain-select').value;
  renderMenu();
  renderEnv();

  //renderAll
});
*/
const selectedCampus = 'Karamalmi';

/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
const getCurrentMenu = async () => {
  let currentMenu = [];
  // Find the selectedmenus info from the allrestaurants array
  const currentMenuInfo = allRestaurants.filter((restaurant) => {
    return restaurant.name === selectedCampus;
  })[0];
  // Get the correct menu and save it menu array
  if (currentMenuInfo.type === 'Food & Co') {
    currentMenu = foodcoData.parseMenu(await foodcoData.getDailyMenu(currentMenuInfo.id, lang));
  }
  if (currentMenuInfo.type === 'Sodexo') {
    currentMenu = sodexoMenu.parseMenu(await sodexoMenu.getDailyMenu(currentMenuInfo.id), lang);
  }
  return { currentMenu, currentMenuInfo };
};

/** Function for rendering a menu
 *
 */
const renderMenu = async () => {
  // Select the restaurant name element
  const restaurantNameElement = document.querySelector('.restaurant-name');

  // Select the menu list element
  const menuListElement = document.querySelector('#menu');

  // Select the restaurant image element
  const restaurantImgElement = document.querySelector('.restaurant-logo');

  // Get the current menu from the server
  const menuInfo = await getCurrentMenu();

  // Get the current menu from the menuInfo object
  const menu = menuInfo.currentMenu;

  // Get the restaurant name from the menuInfo object
  const restaurantName = menuInfo.currentMenuInfo.name;

  // Get the restaurant type from the menuInfo object
  const restaurantType = menuInfo.currentMenuInfo.type;

  menuListElement.innerHTML = '';
  menu.forEach((menuItem) => {
    // Create a new <div> element
    // const underline = document.createElement('div');
    // Create a new <li> element
    const li = document.createElement('li');
    // Split the 'menuItem' string into an array at the '|' character
    const menuItems = menuItem.split('|');
    // Iterate through the array
    menuItems.forEach((item) => {

      if (item.match(/([a-zA-ZäöåÄÖÅ]+(?:-[a-zA-ZäöåÄÖÅ]+)?)(?:,|$)/g)) {
        if (item.match(/[,]/)) {

          const nameItems = item.split('(');
          const dietContainer = document.createElement('div');
          dietContainer.classList.add('diet-container');
          nameItems.forEach((item) => {
            if (item.match(/[,]/)) {
              const dietItems = item.split(',');
              if (restaurantType === 'Food & Co') {
                dietItems.forEach((dietItem) => {

                  const p = document.createElement('p');
                  p.classList.add('menu-item-diet');
                  const results = dietPreferences(dietItem);

                  p.textContent = results;
                  dietContainer.append(p);
                  li.append(dietContainer);
                }
                );

              }
            } else {
              const p = document.createElement('p');
              p.classList.add('menu-item-title');
              p.textContent = item;
              li.append(p);
            }

          });

        } else {
          const p = document.createElement('p');
          p.classList.add('menu-item-title');
          p.textContent = item;
          li.append(p);
        }
      }
      // 1. Check if the restaurant type is Sodexo
      if (restaurantType === 'Sodexo') {

        // 2. If the restaurant type is Sodexo, check if the menu item matches the regex
        if (item.match(/G|L|VL|M|\*|Veg|ILM|VS/)) {
          const dietContainer = document.createElement('div');
          dietContainer.classList.add('diet-container');
          // 3. Split the item into an array of diet items
          const dietItems = item.split(',');
          // 4. Loop through each diet item
          dietItems.forEach((dietItem) => {

            // 5. Create a new paragraph element and add a class to it
            const p = document.createElement('p');
            p.classList.add('menu-item-diet');
            // 6. Get the diet information
            const results = dietPreferences(dietItem);

            // 7. Add the diet information to the paragraph element
            p.textContent = results;
            dietContainer.append(p);
            li.append(dietContainer);
          });
        }

      }

      if (item.match(/\d,\d\d/)) {
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('price-container');

        // split the string into an array at the '/' character
        const priceItems = item.split('/');
        priceItems.forEach((priceItem) => {
          // if the restaurant is Food & Co, add euro sign to each priceItem
          if (restaurantType === 'Food & Co') {
            priceItem = priceItem + ' €';
          }
          // create a p element and add the priceItem to it
          const p = document.createElement('p');
          p.classList.add('menu-item-price');
          p.textContent = priceItem;
          // append the p element to the li element
          priceContainer.append(p);
        });
        // append the priceContainer to the li element
        li.append(priceContainer);
      }
      if (restaurantType === 'Sodexo') {

        //create an array from the list of li  children
        const liArray = Array.from(li.children);
        // if liArray contains to div.diet-containers remove second;
        if (liArray.length > 1) {
          liArray.forEach((item) => {
            if (item.classList.contains('diet-container')) {

              item.remove();
            }
          });
        }

        //create a new array with only unique items
        const uniqueLiArray = [...new Set(liArray.map((item) => item.textContent))].map((item) => {
          //return the first instance of the unique item
          return liArray.find((element) => element.textContent === item);
        });
        //remove all li items from the list
        li.innerHTML = '';

        //add the unique li items to the list
        uniqueLiArray.forEach((item) => {
          li.append(item);
        });
      }
      // li.append(underline);
      menuListElement.append(li);

    });
    const menuItemDiet = document.querySelectorAll('.menu-item-diet');
    menuItemDiet.forEach((item) => {
      if (item.textContent === '') {
        item.remove();
      }
    });
    // get all p elements with the class menu-item-title
    const menuTitleElements = document.querySelectorAll('.menu-item-title');
    // if menuTitleElements items are empty, remove it
    menuTitleElements.forEach((item) => {
      if (item.textContent === '') {
        item.remove();
      }
    });
    if (restaurantType === 'Sodexo') {


      // get all li elements
      const liElements = document.querySelectorAll('li');
      // loop through each li element
      liElements.forEach((li) => {
        // get all div elements with the class diet-container
        const dietContainers = li.querySelectorAll('.diet-container');
        // if there is more than one diet-container, remove the second one
        if (dietContainers.length > 1) {
          dietContainers[1].remove();
        }
      }
      );


    }
    restaurantNameElement.textContent = restaurantName;

    // check which restaurant type is selected
    if (restaurantType === 'Sodexo') {
      // if the restaurant type is Sodexo, then set the image source to the
      // Sodexo logo
      restaurantImgElement.src = '../assets/logos/sodexo.png';
      // set the alternate text to be the name of the restaurant
      restaurantImgElement.alt = 'Sodexo logo';
    }
    // Check if the restaurantType variable is equal to 'Food & Co'
    if (restaurantType === 'Food & Co') {
      // If it is, change the src attribute of the restaurantImgElement to the foodco.png image
      restaurantImgElement.src = '../assets/logos/foodco.png';
      // Change the alt attribute of the restaurantImgElement to 'Food & Co logo'
      restaurantImgElement.alt = 'Food & Co logo';
    }
  });
};


const renderEnv = async () => {
  const hsl = document.querySelector('.hsl-list');
  hsl.innerHTML = '';
  if (selectedCampus === 'Karamalmi') {
    // pysäkki lähellä 2132207,2132208 , 2132225, 2132226, 2133224,2133225

    hslRender.renderHSLData(hsl, 2132208);
    hslRender.renderHSLData(hsl, 2132207);
    hslRender.renderHSLData(hsl, 2132225);
    hslRender.renderHSLData(hsl, 2132226);
    hslRender.renderHSLData(hsl, 2133224);
    hslRender.renderHSLData(hsl, 2133225);
  } else if (selectedCampus === 'Myyrmaki') {
    // pysäkki lähellä 4150269,4150268 , 4150228, 4150296, 4150201

    hslRender.renderHSLData(hsl, 4150269);
    hslRender.renderHSLData(hsl, 4150268);
    hslRender.renderHSLData(hsl, 4150228);
    hslRender.renderHSLData(hsl, 4150296);
    hslRender.renderHSLData(hsl, 4150201);
  } else if (selectedCampus === 'Myllypuro') {
    // pysäkki lähellä 1454601,1454602 , 1454140, 1454141
    hslRender.renderHSLData(hsl, 1454601);
    hslRender.renderHSLData(hsl, 1454602);
    hslRender.renderHSLData(hsl, 1454140);
    hslRender.renderHSLData(hsl, 1454141);
  } else if (selectedCampus === 'Arabia') {
    // pysäkki lähellä 1230201,1230101
    hslRender.renderHSLData(hsl, 1230201);
    hslRender.renderHSLData(hsl, 1230101);
  }


};
const initiate = async () => {
  fetchWeatherLocalorDefault(1);
  renderEnv();
  renderMenu();
 // changeLanguageInterval();

};
initiate();
/*
const changeLanguageInterval = setInterval(() => {
  if (lang === 'fi') lang = 'en';
  else if (lang === 'en') lang = 'fi';
  renderMenu();

}, 20000);
*/

