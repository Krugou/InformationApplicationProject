import { geoLocationDistanceBirdsEye } from '../src/js/modules/utils/distance-data';

describe('geoLocationDistanceBirdsEye function', () => {
  test('should return the correct distance between two points', () => {
    const lat1 = 60.17045;
    const lon1 = 24.93147;
    const lat2 = 60.17045;
    const lon2 = 24.93147;
    const distance = geoLocationDistanceBirdsEye(lat1, lon1, lat2, lon2);
    expect(distance).toBe(0);
  });
});





