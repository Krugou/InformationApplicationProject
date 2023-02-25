import HSL from './hsl-data';


const renderHSLData = async (target, stop) => {
  try {
    // Get the routes for the stop
    const routes = await HSL.getRoutesByStopId(stop);
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

      // Create the image element for the bus icon
      const transitImage = document.createElement('img');
      transitImage.src = '../../assets/images/Bussi.svg';
      transitImage.alt = '';
      transitImage.classList.add('bus-svg');

      // Create an element for the address of the line
      const transitAddress = document.createElement('p');
      transitAddress.classList.add('transit-address');
      transitAddress.textContent = route.stopname;

      // Create the transit line element and append it to the list
      const transitLine = document.createElement('p');

      console.log('HEHEEE',route.stopname);


      transitLine.textContent = `${route.name}`;
      transitLine.classList.add('transit-line');
      hslContainerList.append(transitImage);
      hslContainerList.append(transitAddress);
      hslContainerList.append(transitLine);

      // Create the transit line direction element and append it to the list
      const transitLineDirection = document.createElement('p');
      transitLineDirection.textContent = `${route.headsign}`;
      transitLineDirection.classList.add('transit-line-direction');
      hslContainerList.append(transitLineDirection);

      // Create the arrival time element and append it to the list
      const arrivalTime = document.createElement('p');
      arrivalTime.textContent = `${route.realtimeArrival}`;
      arrivalTime.classList.add('arrival-time');
      hslContainerList.append(arrivalTime);

      // Append the list to the container
      hslContainer.append(hslContainerList);


    }
  } catch (error) {
    console.error(error);
  }
};
const hslRender = { renderHSLData };

export default hslRender;
