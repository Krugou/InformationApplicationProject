import '../styles/main.scss';
import hslRender from './modules/hsl/hsl-render';
import paSystem from './modules/pa/Announcements';
import foodcoData from './modules/restaurant/foodcoMenu';
import sodexoMenu from './modules/restaurant/sodexomenu';
import dietPreferences from './modules/utils/diet-choices';
// import serviceWorkerFunction from './modules/utils/sw';
import fetchWeatherLocalorDefault from './modules/weather/weather-data';
const allRestaurants = [
  { name: 'Myyrmäki', id: 152, type: 'Sodexo', stops: [4150269, 4150268, 4150228, 4150296, 4150201] },
  { name: 'Karamalmi', id: 3208, type: 'Food & Co', stops: [2132207, 2132208, 2132225, 2132226, 2133224, 2133225] },
  { name: 'Myllypuro', id: 158, type: 'Sodexo', stops: [1454601, 1454602, 1454140, 1454141] },
  { name: 'Arabia', id: 1251, type: 'Food & Co', stops: [1230201, 1230101] },
];

// DOM Elements
const campusSelector = document.querySelector('#domain-select');
const languageButton = document.querySelector('#language-button');
let selectedCampus = document.querySelector('#domain-select').value;

//default language
let lang = 'fi';

// Event listener for changing the selected language
languageButton.addEventListener('click', () => {
  if (lang === 'fi') lang = 'en';
  else if (lang === 'en') lang = 'fi';
  renderMenu();
});

// Event listener for changing the selected campus
campusSelector.addEventListener('change', () => {
  selectedCampus = document.querySelector('#domain-select').value;
  renderMenu();
  getStopsNearbyHsl();
});


/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
const getCurrentMenu = async () => {
  try {
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
  } catch (err) {
    console.error(err);
    return { currentMenu: [], currentMenuInfo: [] };
  }
};

/** Function for rendering a menu
 *
 */
const renderMenu = async () => {
  // Create the restaurant name element
  const restaurantNameElement = document.querySelector('.restaurant-name');

  // Create the menu list element
  const menuListElement = document.querySelector('#menu');

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
        if (item.match(/[GMLAV]([,)])|(Veg|ILM|VS|VL|\*)([,)])/)) {

          const nameItems = item.split('(');
          const dietContainer = document.createElement('div');
          dietContainer.classList.add('diet-container');
          nameItems.forEach((item) => {
            if (item.match(/[,]/)) {
              if (restaurantType === 'Food & Co') {

                const dietItems = item.split(',');
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
        if (item.match(/[GMLAV]([,)])|(Veg|ILM|VS|VL|\*)([,)])/)) {
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
      priceContainerRender(item, li);

      // if (restaurantType === 'Sodexo') {

      //   //create an array from the list of li  children
      //   const liArray = Array.from(li.children);
      //   // if liArray contains to div.diet-containers remove second;
      //   if (liArray.length > 1) {
      //     liArray.forEach((item) => {
      //       if (item.classList.contains('diet-container')) {

      //         item.remove();
      //       }
      //     });
      //   }

      //   //create a new array with only unique items
      //   const uniqueLiArray = [...new Set(liArray.map((item) => item.textContent))].map((item) => {
      //     //return the first instance of the unique item
      //     return liArray.find((element) => element.textContent === item);
      //   });
      //   //remove all li items from the list
      //   li.innerHTML = '';

      //   //add the unique li items to the list
      //   uniqueLiArray.forEach((item) => {
      //     li.append(item);
      //   });
      // }
      // li.append(underline);
      menuListElement.append(li);

    });
    regexErrorCleaner();

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
    changeRestaurantLogo(restaurantType);
  });
};
const regexErrorCleaner = () => {
  // Select all menu items that have the class of 'menu-item-diet'
  const menuItemDiet = document.querySelectorAll('.menu-item-diet');

  // Loop over each of the menu items
  menuItemDiet.forEach((item) => {
    // If the text content of the menu item is blank
    if (item.textContent === '') {
      // Remove the menu item from the DOM
      item.remove();
    }
  });
  // Get all the menu item titles
  const menuTitleElements = document.querySelectorAll('.menu-item-title');

  // Loop through all the menu item titles
  menuTitleElements.forEach((item) => {
    // If the text content of the menu item title is an empty string
    if (item.textContent === '') {
      // Remove the menu item title
      item.remove();
    }
  });
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
const priceContainerRender = (item, li) => {
  if (item.match(/\d,\d\d/)) {
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    // split the string into an array at the '/' character
    const priceItems = item.split('/');
    priceItems.forEach((priceItem) => {
      // if euro sign is missing from priceItem add it
      if (!priceItem.includes('€')) {
        priceItem = priceItem + '€';
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
};
const getStopsNearbyHsl = async () => {
  const hsl = document.querySelector('.hsl-list');
  hsl.innerHTML = '';
  const selectedRestaurant = allRestaurants.find((restaurant) => restaurant.name === selectedCampus);

  if (selectedRestaurant) {
    selectedRestaurant.stops.forEach((stop) => {
      hslRender.HSLContainerRender(hsl, stop);
    });
  } else {
    hsl.innerHTML = 'No restaurant found';
  }
};
const renderVideo = (target) => {
  //  <video autoplay muted controls loop class="video" src='./assets/videos/infodisplay10sec.mp4'></video>
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.controls = true;
  video.loop = true;
  video.classList.add('video');
  video.src = './assets/videos/infodisplay10sec.mp4';
  target.append(video);
};
const hslContainer = (target) => {
  // <section class="hsl"> <h2>HSL</h2> <div class="hsl-list"></div></section >;

  const hsl = document.createElement('section');
  hsl.classList.add('hsl');
  const h2 = document.createElement('h2');
  h2.textContent = 'HSL';
  const hslList = document.createElement('div');
  hslList.classList.add('hsl-list');
  hsl.append(h2);
  hsl.append(hslList);
  target.append(hsl);
};
const leftside = document.querySelector('.leftside');
const initiate = async () => {
  // serviceWorkerFunction();
  fetchWeatherLocalorDefault(1);
  paSystem.getAnnouncements(leftside);
  renderVideo(leftside);
  hslContainer(leftside);
  getStopsNearbyHsl();
  renderMenu();

};
initiate();
