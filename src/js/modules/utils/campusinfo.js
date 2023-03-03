import campusInfo from '../../../../json/campuses.json';

/** Function for getting info of the selected campus
 *
 * @returns object with campus info
 */
const allCampuses = campusInfo.campuses;

// Create a function that takes the selectedCampus as a parameter
const getCampusInfo = (selectedCampus) => {
  // Create a new variable that stores the filtered results of the allCampuses array
  const currentCampusInfo = allCampuses.filter((restaurant) => {
    // Loop through the allCampuses array and return only the campus that matches the selectedCampus
    return restaurant.name === selectedCampus;
  });
  // If the currentCampusInfo array has a length greater than 0, return the first item in the array
  if (currentCampusInfo.length > 0) {
    return currentCampusInfo[0];
  } else {
    // If the currentCampusInfo array has a length of 0, return false
    return false;
  }
};

export default getCampusInfo;
