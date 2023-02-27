// (G) Gluteeniton, (L) Laktoositon, (VL) Vähälaktoosinen, (M) Maidoton, (*) Suomalaisten ravitsemussuositusten mukainen, (Veg) Soveltuu vegaaniruokavalioon, (ILM) Ilmastoystävällinen, (VS) Sis. tuoretta valkosipulia, (A) Sis. Allergeeneja


const dietPreferences = (dietInfo) => {
  let diet = '';

  if (dietInfo.includes('G')) {
    diet += 'Gluteeniton';
  } if (dietInfo.includes('M') && dietInfo.includes('L')) { // if  M and L and VL are included
    // do nothing }
  } else if (dietInfo.match(/\bL\b/)) {
    diet += ' Laktoositon';
  }

  if (dietInfo.includes('VL')) {
    diet += ' Vähälaktoosinen';
  }
  if (dietInfo.includes('M') && dietInfo.includes('L')) { // if both M and L are included
    // do nothing
  } else if (dietInfo.includes('M')) {
    diet += ' Maidoton';
  }
  if (dietInfo.includes('*')) {
    diet += ' Suomalaisten ravitsemussuositusten mukainen';
  }
  if (dietInfo.includes('Veg')) {
    diet += ' Soveltuu vegaaniruokavalioon';
  }
  if (dietInfo.includes('ILM')) {
    diet += ' Ilmastoystävällinen';
  }
  if (dietInfo.includes('VS')) {
    diet += ' Sis. tuoretta valkosipulia';
  }
  if (dietInfo.includes('A')) {
    diet += ' Sis. Allergeeneja';
  }
  if (dietInfo === undefined || dietInfo === null || dietInfo === '' || dietInfo === ' ' || dietInfo === '  ') {
    diet += 'Ei tietoa';
  }

  return diet;
};

export default dietPreferences;
