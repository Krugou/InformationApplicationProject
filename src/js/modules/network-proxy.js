'use strict';


// This function will be used to fetch data from the API

const doFetch = async (url, useProxy = false, options) => {
  // If the useProxy parameter is true, the URL will be modified to include the allorigins proxy
  if (useProxy) {
    const mathrandom = Math.random();
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&rand=${mathrandom}`;
  }
  // This try/catch block will attempt to fetch the data and return it as JSON
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('http error, code: ' + response.status);
    }
    if (useProxy) {
      // If the URL was modified to include the allorigins proxy, the response will need to be modified to extract the data
      const responseJson = await response.json();
      return JSON.parse(responseJson.contents);
    }
    return await response.json();
  } catch (error) {
    // If the fetch fails, check if the error is an HTTP error, and if so, try again using the allorigins proxy
    if (error.message.includes('http error')) {
      try {
        return await doFetch(url, true, options);
      } catch (error) {
        throw new Error('doFetch failed: ' + error.message);
      }
    }
    throw new Error('doFetch failed: ' + error.message);
  }
};

/**
 *
 * @returns API compatible index number of weekday
 */
const getWeekdayIndex = () => {
  const index =  new Date().getDay()-1;
  return index === -1 ? 6 : index;
};

export { doFetch, getWeekdayIndex };

