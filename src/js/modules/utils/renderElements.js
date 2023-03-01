const renderVideo = (target) => {
  //  <video autoplay muted controls loop class="video" src='./assets/videos/infodisplay10sec.mp4'></video>
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.controls = true;
  video.loop = true;
  video.classList.add('video');
  video.src = './assets/videos/mediavideota.mp4';
  target.append(video);
};
const hslContainer = (target) => {
  // <section class="hsl"> <h2>HSL</h2> <div class="hsl-list"></div></section >;

  const hsl = document.createElement('section');
  hsl.classList.add('hsl');
  const h2 = document.createElement('h2');
  h2.textContent = 'HSL';
  const hslList = document.createElement('div');
  hslList.classList.add('hsl-list');
  hsl.append(h2);
  hsl.append(hslList);
  target.append(hsl);
};

export default { renderVideo, hslContainer };
