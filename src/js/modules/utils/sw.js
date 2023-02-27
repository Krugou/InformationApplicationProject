const serviceWorkerFunction = () => {
  // eslint-disable-next-line no-undef
  if (APP_CONF.productionMode && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};

export default serviceWorkerFunction;
