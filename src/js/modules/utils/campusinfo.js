import campusInfo from '../../../../json/campuses.json';

/** Function for getting info of the selected campus
 *
 * @returns object with campus info
 */
const allCampuses = campusInfo.campuses;

const getCampusInfo = (selectedCampus) => {
  const currentCampusInfo = allCampuses.filter((restaurant) => {
    return restaurant.name === selectedCampus;
  })[0];
  return currentCampusInfo;
};

export default getCampusInfo;
