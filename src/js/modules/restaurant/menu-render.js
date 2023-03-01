import getCampusInfo from '../utils/campusinfo';
import dietPreferences from '../utils/diet-choices.js';
import foodcoData from './menus/foodcoMenu';
import sodexoMenu from './menus/sodexomenu';
/** Function for getting the selected menu
 *
 * @returns array containing meal menu
 */
const getCurrentMenu = async (lang, selectedCampus) => {
  try {
    let currentMenu = [];
    // Find the selectedmenus info from the allCampuses array
    const currentMenuInfo = getCampusInfo(selectedCampus);
    console.log('🚀 ~ file: index.js:91 ~ getCurrentMenu ~ currentMenuInfo:', currentMenuInfo);
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
  const menuInfo = await getCurrentMenu(lang, selectedCampus);

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
      if (item.match(/[a-zA-ZäöåÄÖÅ]/)) {

        if (item.match(/(\([A-Z]\))|([GMLAV][,)])|(Veg|ILM|VS|VL|\*)([,)])/gu)) {

          const nameItems = item.split();
          const dietContainer = document.createElement('div');
          dietContainer.classList.add('diet-container');
          nameItems.forEach((item) => {
            if (item.match(/[,]/) || item.match(/\((G|L|VL|M|\*|Veg|ILM|VS|A)\)/g)) {
              if (restaurantType === 'Food & Co') {

                const dietItems = item.split(',');
                dietItems.forEach((dietItem) => {
                  const p = document.createElement('p');
                  p.classList.add('diet-item');
                  const results = dietPreferences(dietItem);
                  dietContainer.append(results);
                  li.append(dietContainer);
                });


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
        if (item.match(/(\([A-Z]\))|([GMLAV][,)])|(Veg|ILM|VS|VL|\*)([,)])/gu)) {
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
            dietContainer.append(results);
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

    student.textContent = 'Opiskelija';
    normal.textContent = 'Normaali';
    big.textContent = 'Iso';

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
  const container = document.querySelector('.diet-container');
  const images = container.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    if (!images[i].hasAttribute('src')) {
      images[i].remove();
    }
  }
  // Get all the menu item titles
  const menuTitleElements = document.querySelectorAll('.menu-item-title');

  // Loop through all the menu item titles
  menuTitleElements.forEach((item) => {
    // If the text content of the menu item title is an empty string
    if (item.textContent === '') {
      // Remove the menu item title
      item.remove();
    }
    if (item.textContent === '(VL)' || item.textContent === '(VS)' || item.textContent === '(ILM)' || item.textContent === '(Veg)' || item.textContent === '(*)' || item.textContent === '(G)' || item.textContent === '(M)' || item.textContent === '(L)' || item.textContent === '(A)' || item.textContent === '(V)' || item.textContent === '(undefined)') {
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
export default renderMenu;
