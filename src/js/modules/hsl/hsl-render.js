import HSL from './hsl-data';

const renderHSLData = async (target, stop) => {
  const routes = await HSL.getRoutesByStopId(stop);
  console.log('🚀 ~ file: hsl-render.js:5 ~ renderHSLData ~ routes:', routes);

  const ul = document.createElement('ul');
  for (const route of routes) {
    const li = document.createElement('li');
    li.textContent = `${route.name} saapuu ${route.realtimeArrival}`;
    ul.append(li);
  }
  target.append(ul);
};
const hslRender = { renderHSLData };

export default hslRender;
