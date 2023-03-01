// (G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton, (*) Suomalaisten ravitsemussuositusten mukainen, (Veg) Soveltuu vegaaniruokavalioon, (ILM) Ilmastoystävällinen, (VS) Sis. tuoretta valkosipulia, (A) Sis. Allergeeneja


const dietPreferences = (dietInfo) => {

  // let diet = '';
  const logo = document.createElement('img');
  logo.classList.add('diet-logo');

  if (dietInfo.includes('G')) {
    // diet += 'Gluteeniton';
    logo.src = './assets/logos/diets/gluten-free.jpg';

    logo.alt = 'Gluteeniton';

    return logo;


  } if (dietInfo.includes('M') && dietInfo.includes('L')) { // if  M and L and VL are included
    // do nothing }
  } else if (dietInfo.match(/\bL\b/)) {
    logo.src = './assets/logos/diets/lactose-free.png';
    logo.alt = 'Laktoositon';
    return logo;


    // diet += ' Laktoositon';
  }

  if (dietInfo.includes('VL')) {
    logo.src = './assets/logos/diets/lactose-free.png';
    logo.alt = 'Vähälaktoosinen';
    return logo;

    // diet += ' Vähälaktoosinen';
  }
  if (dietInfo.includes('M') && dietInfo.includes('L')) { // if both M and L are included
    // do nothing
  } else if (dietInfo.includes('M')) {
    logo.src = './assets/logos/diets/no-milk.png';
    logo.alt = 'Maidoton';
    return logo;


    // diet += ' Maidoton';
  }
  if (dietInfo.includes('*')) {
    logo.src = './assets/logos/diets/finland.png';
    logo.alt = 'Suomalaisten ravitsemussuositusten mukainen';
    return logo;

  }
  if (dietInfo.includes('Veg')) {
    logo.src = './assets/logos/diets/vegan.png';
    logo.alt = 'Soveltuu vegaaniruokavalioon';
    return logo;


    // diet += ' Soveltuu vegaaniruokavalioon';
  }
  if (dietInfo.includes('ILM')) {
    logo.src = './assets/logos/diets/biodegradable.png';
    logo.alt = 'Ilmastoystävällinen';
    return logo;


    // diet += ' Ilmastoystävällinen';
  }
  if (dietInfo.includes('VS')) {
    logo.src = './assets/logos/diets/garlic.png';
    logo.alt = 'Sis. tuoretta valkosipulia';
    return logo;


    // diet += ' Sis. tuoretta valkosipulia';
  }
  if (dietInfo.includes('A')) {
    logo.src = './assets/logos/diets/allergen.png';
    logo.alt = 'Sis. Allergeeneja';
    return logo;

    // diet += ' Sis. Allergeeneja';
  }
};

export default dietPreferences;
