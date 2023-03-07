'use strict';
/** Module for fetching data from HSL api
 *
 */
import { doFetch } from '../network-proxy';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/**
 *  Get next rides by stop id
 * @param {number} id id of HSL stop
 * @returns GraphQL query string
 */
const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
      lat
      lon
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
};

/**
 *  Convert seconds to hours and minutes
 * @param {number} seconds time in seconds
 * @returns time in hours and minutes
 */
const convertTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds % 3600 / 60);
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
};
/**
 *
 * @param {number} id id of HSL stop
 * @returns Object containing route data of a HSL stop
 */
const getRoutesByStopId = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNextRidesByStopId(id),
  };
  const routeData = await doFetch(apiUrl, false, options);
  // console.log('🚀 ~ file: hsl-data.js:49 ~ getRoutesByStopId ~ routeData:', routeData);

  return routeData.data.stop.stoptimesWithoutPatterns.map((route) => {
    return {
      stopname: routeData.data.stop.name,
      name: route.trip.routeShortName,
      headsign: route.trip.tripHeadsign,
      scheduledArrival: convertTime(route.scheduledArrival),
      realtimeArrival: convertTime(route.realtimeArrival),
    };
  });
};

const HSL = { getRoutesByStopId };
export default HSL;
