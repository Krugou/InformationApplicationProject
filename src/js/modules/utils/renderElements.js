const renderVideo = (target) => {
  //  <video autoplay muted controls loop class="video" src='./assets/videos/infodisplay10sec.mp4'></video>
  // Create a new video element
 const video = document.createElement('video');
 // Set the autoplay attribute to true
 video.autoplay = true;
 // Set the muted attribute to true
 video.muted = true;
 // Set the controls attribute to true
 video.controls = true;
 // Set the loop attribute to true
 video.loop = true;
 // Add the class 'video' to the video element
 video.classList.add('video');
 // Set the video source
 video.src = './assets/videos/mediavideota.mp4';
 // Append the video element to the target element
 target.append(video);
};
const hslContainer = (target) => {
  // <section class="hsl"> <h2>HSL</h2> <div class="hsl-list"></div></section >;

  // Create a new <section> element
  const hsl = document.createElement('section');
  // Add the "hsl" class to the new element
  hsl.classList.add('hsl');
  // Create a new <h2> element
  const h2 = document.createElement('h2');
  // Set the text of the <h2> element
  h2.textContent = 'HSL';
  // Create a new <div> element
  const hslList = document.createElement('div');
  // Add the "hsl-list" class to the new element
  hslList.classList.add('hsl-list');
  // Add the <h2> element to the <section> element
  hsl.append(h2);
  // Add the <div> element to the <section> element
  hsl.append(hslList);
  // Add the <section> element to the target element
  target.append(hsl);
};

export default { renderVideo, hslContainer };
