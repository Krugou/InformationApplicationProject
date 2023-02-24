import HSL from './hsl-data';

const renderHSLData = async (target, stop) => {
  try {
    const routes = await HSL.getRoutesByStopId(stop);
    console.table('🚀 ~ file: hsl-render.js:5 ~ renderHSLData ~ routes:', routes);

    const hslContainer = document.createElement('ul');
    hslContainer.classList.add('hsl-container');
    for (const route of routes) {
      const hslContainerList = document.createElement('li');
      hslContainerList.classList.add('hsl-container-list');

      const transitLine = document.createElement('p');
      transitLine.textContent = `linja: ${route.name}`;
      transitLine.classList.add('transit-line');
      const arrivalTime = document.createElement('p');
      arrivalTime.textContent = `saapuu: ${route.realtimeArrival}`;
      arrivalTime.classList.add('arrival-time');
      const transitLineDirection = document.createElement('p');
      transitLineDirection.textContent = `suunta: ${route.headsign}`;
      transitLineDirection.classList.add('transit-line-direction');

      hslContainerList.append(transitLine, transitLineDirection, arrivalTime);
      hslContainer.append(hslContainerList);
    }
    target.append(hslContainer);
  } catch (error) {
    console.error(error);
  }
};
const hslRender = { renderHSLData };

export default hslRender;
