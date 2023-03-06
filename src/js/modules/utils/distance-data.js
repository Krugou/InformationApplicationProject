const geoLocationDistanceBirdsEye = (lat1, lon1, lat2, lon2) => {
  // If the coordinates are identical, the distance is zero
  if (lat1 === lat2 && lon1 === lon2) {
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
  // Convert degrees to radians
  return deg * (Math.PI / 180);
};
const getUserlocation = (campus) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const campusLat = campus.lat;
      const campusLon = campus.lon;
      // console.log all

      const distance = geoLocationDistanceBirdsEye(userLat, userLon, campusLat, campusLon);
      // math floor distance to 0 decimals
      const distanceRounded = Math.floor(distance);
      // get class rightside
      const rightSide = document.querySelector('.rightside');
      // create  h2
      const h2 = document.createElement('h2');
      h2.classList.add('distance');
      // create textnode
      h2.innerHTML = ` ${distanceRounded} M <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">   <path fill="ff5000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
`;
      // append p to rightside
      rightSide.prepend(h2);


    }
    );
  }
};

export default getUserlocation;

