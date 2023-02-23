import { doFetch } from './network-proxy';

const apiUrl =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';


const getQueryForNextRidesByStopId = (id) => {
  return `{
    stop(id: "HSL:${id}") {
      name
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


const convertTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds % 3600 / 60);
  return `${hours}:${mins < 10 ? '0' + mins : mins}`;
};

const getRoutesByStopId = async (id) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getQueryForNextRidesByStopId(id),
  };
  const routeData = await doFetch(apiUrl, false, options);
  console.log(routeData);
  return routeData.data.stop.stoptimesWithoutPatterns.map((route) => {
    return {
      name: route.trip.routeShortName,
      headsign: route.headsign,
      scheduledArrival: convertTime(route.scheduledArrival),
      realtimeArrival: convertTime(route.realtimeArrival),
    };
  });
};

const HSL = { getRoutesByStopId };
export default HSL;
