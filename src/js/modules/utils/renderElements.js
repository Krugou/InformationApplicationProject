/**
 *  Render the video
 * @param {string} target
 * @returns {void}
 */
const renderVideo = () => {
  const videos = ['video1', 'video2', 'video3'];
  let currentVideo = 0;

  const playNextVideo = () => {
    const videoPlayer = document.getElementById(videos[currentVideo]);
    videoPlayer.style.display = 'block';
    videoPlayer.play();
    videoPlayer.addEventListener('ended', () => {
      // Pause the current video
      videoPlayer.pause();
      // Hide the current video and show the next video
      videoPlayer.style.display = 'none';
      currentVideo = (currentVideo + 1) % videos.length;
      playNextVideo();
    }, {once:true});
  };
  playNextVideo();
};
/**
 *  Render the HSL container
 * @param {*} target
 */
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
