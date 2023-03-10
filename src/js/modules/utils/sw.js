'use strict';
/** Service worker module
 *  @module sw
 */
/** Registers serviceworkers in production mode
 *
 */
const serviceWorkerFunction = () => {

  // eslint-disable-next-line no-undef
  if (APP_CONF.productionMode && 'serviceWorker' in navigator) {
    // If supported, add load event listener
    window.addEventListener('load', () => {
      // In event listener, register service worker
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        // If registration successful, log it to the console
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        // If there are any errors, log them to the console
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};

export default serviceWorkerFunction;
