'use strict';
/** Module that creates icons for diet info
 * @module diet-choices
 *
 */

/**
 * Creates an <img> element with a class of 'diet-logo' and a src and alt attribute based on the dietInfo parameter.
 * The dietInfo parameter is a string that contains information about the diet of the product.
 * The dietInfo parameter can contain any of the following values:
 * (G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton, (*) Suomalaisten ravitsemussuositusten mukainen, (Veg) Soveltuu vegaaniruokavalioon, (ILM) Ilmastoystävällinen, (VS) Sis. tuoretta valkosipulia, (A) Sis. Allergeeneja
 * The function returns the new <img> element.
 * @param {string} dietInfo
 * @returns {HTMLElement} <img> element
 *
 *
 */

const dietPreferences = (dietInfo) => {

  // Create an <img> element and store it in a variable
  const logo = document.createElement('img');
  // Add a class of 'diet-logo' to the <img> element
  logo.classList.add('diet-logo');

  if (dietInfo.includes('G')) {
    // Set the source and alt attributes of the img element

    logo.src = './assets/logos/diets/gluten-free.jpg';
    logo.alt = 'Gluteeniton';
    // Return the new img element
    return logo;


  }
  if (dietInfo.includes('M') && dietInfo.includes('L')) { // if  M and L and VL are included
    // do nothing }
  } else if (dietInfo.match(/\bL\b/)) {
    // Set the source and alt attributes of the img element

    logo.src = './assets/logos/diets/lactose-free.png';
    logo.alt = 'Laktoositon';
    return logo;
  }
  if (dietInfo.includes('VL')) {
    // Set the source and alt attributes of the img element

    logo.src = './assets/logos/diets/lactose-free.png';
    logo.alt = 'Vähälaktoosinen';
    // Return the new img element
    return logo;


  }
  if (dietInfo.includes('M') && dietInfo.includes('L')) { // if both M and L are included
    // do nothing
  } else if (dietInfo.includes('M')) {
    // Set the source and alt attributes of the img element

    logo.src = './assets/logos/diets/no-milk.png';
    logo.alt = 'Maidoton';
    // Return the new img element
    return logo;


  }
  if (dietInfo.includes('*')) {
    // Set the source and alt attributes of the img element

    logo.src = './assets/logos/diets/finland.png';
    logo.alt = 'Suomalaisten ravitsemussuositusten mukainen';
    // Return the new img element
    return logo;

  }
  if (dietInfo.includes('Veg')) {
    // Set the source and alt attributes of the img element


    logo.src = './assets/logos/diets/vegan.png';
    logo.alt = 'Soveltuu vegaaniruokavalioon';
    // Return the new img element
    return logo;


  }
  if (dietInfo.includes('ILM')) {
    // Set the source and alt attributes of the img element
    logo.src = './assets/logos/diets/biodegradable.png';
    logo.alt = 'Ilmastoystävällinen';
    // Return the new img element
    return logo;


  }
  if (dietInfo.includes('VS')) {
    // Set the source and alt attributes of the img element
    logo.src = './assets/logos/diets/garlic.png';
    logo.alt = 'Sis. tuoretta valkosipulia';
    // Return the new img element

    return logo;


  }
  if (dietInfo.includes('A')) {

    // Set the source and alt attributes of the img element
    logo.src = './assets/logos/diets/allergen.png';
    logo.alt = 'Sis. Allergeeneja';

    // Return the new img element
    return logo;

  }
};

export default dietPreferences;
