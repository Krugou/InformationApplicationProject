import HSL from './hsl-data';

const renderHSLData = async (target, stop) => {
  try {
  const routes = await HSL.getRoutesByStopId(stop);
  console.table('🚀 ~ file: hsl-render.js:5 ~ renderHSLData ~ routes:', routes);

  const ul = document.createElement('ul');
  for (const route of routes) {
    const li = document.createElement('li');
    const transitLine = document.createElement('p');
    transitLine.textContent = `linja: ${route.name}`;
    const arrivalTime = document.createElement('p');
    arrivalTime.textContent = `saapuu: ${route.realtimeArrival}`;
    const transitLineDirection = document.createElement('p');
    transitLineDirection.textContent = `suunta: ${route.headsign}`;

    li.append(transitLine,transitLineDirection,  arrivalTime);
    ul.append(li);
  }
  target.append(ul);
} catch (error) {
  console.error(error);
}
};
const hslRender = { renderHSLData };

export default hslRender;
