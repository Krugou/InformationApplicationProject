import karamalmiData from './modules/karamalmiMenu';
import './styles/styles.scss';


const initiate = async () => {
  const menu = await karamalmiData.getDailyMenu('3208', 'fi');
  const rightside = document.querySelector('.rightside');
  const leftside = document.querySelector('.leftside');
  leftside.innerHTML = '';
  rightside.innerHTML = '';
  const menuDiv = document.createElement('div');
  const menuDiv2 = document.createElement('div');
  menuDiv.classList.add('menu');
  menuDiv2.classList.add('menu');

  menuDiv.innerHTML = menu.join('<br>');
  rightside.appendChild(menuDiv);

  menu.reverse();
  menuDiv2.innerHTML = menu.join('<br>');

  leftside.appendChild(menuDiv2);

};

initiate();
