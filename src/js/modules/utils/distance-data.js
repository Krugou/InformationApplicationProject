const geoLocationDistanceBirdsEye = (lat1, lon1, lat2, lon2) => {
  // If the coordinates are identical, the distance is zero
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  }
  // Radius of the earth in meters
  const R = 6371000;
  // Calculate the change in latitude and longitude
  let dLat = deg2rad(lat2 - lat1);
  let dLon = deg2rad(lon2 - lon1);
  // Calculate the haversine of the distance
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  // Calculate the angular distance in radians
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Calculate the distance in meters
  let d = R * c;
  return d;
};

const deg2rad = (deg) => {
  // Check if deg is a number
  if (typeof deg !== 'number') {
    throw new TypeError('deg must be a number');
  }
  // Check if deg is within range
  if (deg < -360 || deg > 360) {
    throw new RangeError('deg must be between -360 and 360');
  }
  // Check if deg is NaN
  if (isNaN(deg)) {
    throw new ReferenceError('deg must not be NaN');
  }
  // Convert degrees to radians
  return deg * (Math.PI / 180);
};



export default geoLocationDistanceBirdsEye;