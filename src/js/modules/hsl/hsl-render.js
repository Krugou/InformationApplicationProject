import languageSettings from '../utils/language';
import HSL from './hsl-data';
let hslTimer;

const HSLContainerRender = async (target, stop, lengthofdata) => {
  // const timeoutTarget = target;
  // const timeoutStop = stop;
  // const timeoutLengthofdata = lengthofdata;


  // console.log('🚀 ~ file: hsl-render.js:5 ~ HSLContainerRender ~ lengthofdata:', lengthofdata);
  try {

    // Get the routes for the stop
    const routes = await HSL.getRoutesByStopId(stop);

    while (routes.length > lengthofdata) {
      routes.pop();
    }
    // target.innerHTML = '';

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
      const lang = languageSettings.getCurrentLanguage();
      lang === 'fi'? transitAddress.textContent = `Pysäkki:${route.stopname}` : transitAddress.textContent = `Stop:${route.stopname}`;

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
      hslcontainerListTime.append(arrivalTime);
      hslContainerList.append(hslcontainerListTime);

      // Append the list to the container
      hslContainer.append(hslContainerList);

    }
  } catch (error) {
    console.log(error, 'HSLContainerRender' );
  }
  // // get all arrival times


};

const hslRender = { HSLContainerRender };

export default hslRender;
export {hslTimer};
