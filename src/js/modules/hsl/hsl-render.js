import HSL from './hsl-data';


const HSLContainerRender = async (target, stop, lengthofdata) => {
  try {
    // remove target children
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    // Get the routes for the stop
    const routes = await HSL.getRoutesByStopId(stop);

    while (routes.length > lengthofdata) {
      routes.pop();
    }

    // console.table('🚀 ~ file: hsl-render.js:5 ~ renderHSLData ~ routes:', routes);

    // Create the container and append it to the target
    const hslContainer = document.createElement('ul');
    hslContainer.classList.add('hsl-container');
    target.append(hslContainer);

    // Loop through the routes
    for (const route of routes) {
      // console.log('🚀 ~ file: hsl-render.js:17 ~ renderHSLData ~ route:', route);
      // Create a list element for the route
      const hslContainerList = document.createElement('li');
      hslContainerList.classList.add('hsl-container-list');


      // Create an element for the header-section of the list
      const hslcontainerListHeader = document.createElement('div');
      hslcontainerListHeader.classList.add('hsl-container-list-head');

      const hslcontainerListHeaderRight = document.createElement('div');
      hslcontainerListHeaderRight.classList.add('hsl-container-list-head-right');

      const hslcontainerListTime = document.createElement('div');
      hslcontainerListTime.classList.add('hsl-container-list-time');

      // Create the image element for the bus icon
      const transitImage = document.createElement('img');

      // Choose icon based on the type of transport
      if (route.name.split('')[0] === 'M') { // Check if transport is a subway
        transitImage.src = '../../assets/images/Metro.svg';
      } else {
        transitImage.src = '../../assets/images/Bussi.svg';
      }
      transitImage.alt = '';
      transitImage.classList.add('transit-svg');

      // Create an element for the address of the line
      const transitAddress = document.createElement('p');
      transitAddress.classList.add('transit-address');
      transitAddress.textContent = `Pysäkki:${route.stopname}`;

      // Create the transit line element and append it to the list
      const transitLine = document.createElement('p');


      transitLine.textContent = `${route.name}`;
      transitLine.classList.add('transit-line');
      //  hslContainerList.append(transitImage);
      // hslContainerList.append(transitLine);

      // Create the transit line direction element and append it to the list
      const transitLineDirection = document.createElement('p');
      transitLineDirection.textContent = `${route.headsign}`;
      transitLineDirection.classList.add('transit-line-direction');
      //hslContainerList.append(transitLineDirection);

      hslcontainerListHeader.append(transitImage);
      hslcontainerListHeaderRight.append(transitLine);
      hslcontainerListHeaderRight.append(transitLineDirection);
      hslcontainerListTime.append(transitAddress);


      hslcontainerListHeader.append(hslcontainerListHeaderRight);

      hslContainerList.append(hslcontainerListHeader);
      // Create the arrival time element and append it to the list
      const arrivalTime = document.createElement('p');
      arrivalTime.textContent = `${route.realtimeArrival}`;
      arrivalTime.classList.add('arrival-time');
      console.log('🚀 ~ file: hsl-render.js:84 ~ HSLContainerRender ~ `${route.realtimeArrival}`:', `${route.realtimeArrival}`);
      hslcontainerListTime.append(arrivalTime);
      hslContainerList.append(hslcontainerListTime);

      // Append the list to the container
      hslContainer.append(hslContainerList);

    }
  } catch (error) {
    console.error(error);
  }
  // get all arrival times
  const arrivalTimes = document.querySelectorAll('.arrival-time');
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
    if (arrivalHour > currentHour || (arrivalHour === currentHour && arrivalMinutes >= currentMinutes)) {
      if (!latestArrivalTime || (arrivalHour < latestArrivalTime.hour || (arrivalHour === latestArrivalTime.hour && arrivalMinutes < latestArrivalTime.minutes))) {
        latestArrivalTime = { hour: arrivalHour, minutes: arrivalMinutes };
        if (!firstArrivalTime) {
          firstArrivalTime = arrivalTimes[i];
        }
      }
    }
  }

  if (firstArrivalTime) {
    // Do something with the first arrival time
    const timeDifference = latestArrivalTime.minutes - currentMinutes;

    // convert the difference to milliseconds
    const timeDifferenceInMilliseconds = timeDifference * 60000;
    console.log('🚀 ~ file: hsl-render.js:113 ~ HSLContainerRender ~ timeDifferenceInMilliseconds:', timeDifferenceInMilliseconds);
    // set the timeout for the next update
    setTimeout(() => {
      HSLContainerRender(target, stop, lengthofdata);
    }
      , timeDifferenceInMilliseconds);
  } else {
    // Handle the case where there are no upcoming arrivals
    setTimeout(() => {
      HSLContainerRender(target, stop, lengthofdata);
    }
      , 60000);
  }


};
const hslRender = { HSLContainerRender };

export default hslRender;
