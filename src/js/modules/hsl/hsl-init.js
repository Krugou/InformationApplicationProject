import campusInfo from '../../../../json/campuses.json';
import hslRender from './hsl-render';


const getStopsNearbyHsl = async () => {
  const allCampuses = campusInfo.campuses;
  let selectedCampus;

  const dsElem = document.querySelector('#domain-select');
  if (dsElem) {
    selectedCampus = dsElem.value;
  } else {
    selectedCampus = '';
  }
  const hsl = document.querySelector('.hsl-list');
  if (hsl) {
    hsl.innerHTML = '';
  }
  const selectedRestaurant = allCampuses.find((restaurant) => restaurant.name === selectedCampus)
    || { name: 'Unknown campus' };

  if (selectedRestaurant) {
    if (selectedRestaurant.stops.length > 0) {
      selectedRestaurant.stops.forEach((stop) => {
        hslRender.HSLContainerRender(hsl, stop, 3);
      });
    } else {
      hsl.innerHTML = 'No public transport available';
    }
  } else {
    hsl.innerHTML = 'No target found';
  }
  getLatestArrivalTime();
};
const getLatestArrivalTime = async () => {


  let timeDifferenceInMilliseconds;
  const arrivalTimes = document.querySelectorAll('.arrival-time');
  // console.log('🚀 ~ file: index.js:95 ~ getLatestArrivalTime ~ arrivalTimes:', arrivalTimes);
  // if arrivaltimes is empty
  if (arrivalTimes.length === 0) {
    // wait 30 seconds and try again
    setTimeout(() => {
      getLatestArrivalTime();
    }, 30000);

  } else {
    // console.log('🚀 ~ file: index.js:97 ~ getLatestArrivalTime ~ arrivalTimes:', arrivalTimes);
    // get the current time
    const currentTime = new Date();
    // get the current hour
    const currentHour = currentTime.getHours();
    // get the current minutes
    const currentMinutes = currentTime.getMinutes();
    // check which arrival time is latest and get the first one
    let latestArrivalTime = null;
    let firstArrivalTime = null;


    for (let i = 0; i < arrivalTimes.length; i++) {

      const arrivalTime = arrivalTimes[i].textContent.split(':');
      const arrivalHour = parseInt(arrivalTime[0]);
      const arrivalMinutes = parseInt(arrivalTime[1]);

      // Compare the arrival time with the current time
      if (arrivalHour > currentHour || (arrivalHour === currentHour && arrivalMinutes >= currentMinutes) || arrivalHour >= currentHour && arrivalHour <= currentHour + 2) {
        if (!latestArrivalTime || (arrivalHour < latestArrivalTime.hour || (arrivalHour === latestArrivalTime.hour && arrivalMinutes < latestArrivalTime.minutes))) {
          latestArrivalTime = { hour: arrivalHour, minutes: arrivalMinutes };
          console.log('🚀 ~ file: hsl-render.js:127 ~ HSLContainerRender ~ latestArrivalTime:', latestArrivalTime);
          if (!firstArrivalTime) {
            firstArrivalTime = arrivalTimes[i];
          }
        }
      }
    }

    if (firstArrivalTime) {

      // get the time difference between the current time and the first arrival time
      let timeDifference = (latestArrivalTime.hour - currentHour) * 60 + (latestArrivalTime.minutes - currentMinutes);
      // console.log('🚀 ~ file: hsl-render.js:140 ~ HSLContainerRender ~ timeDifference:', timeDifference);

      // convert the difference to milliseconds
      timeDifferenceInMilliseconds = timeDifference * 60000;
      console.log('🚀 ~ file: index.js:137 ~ getLatestArrivalTime ~ timeDifferenceInMilliseconds:', timeDifferenceInMilliseconds);
      if (timeDifferenceInMilliseconds < 0) {
        timeDifferenceInMilliseconds = 60000;
      }
      setTimeout(() => {
        getStopsNearbyHsl();
      }, timeDifferenceInMilliseconds);

    }
  }

};

export default { getStopsNearbyHsl, getLatestArrivalTime };
