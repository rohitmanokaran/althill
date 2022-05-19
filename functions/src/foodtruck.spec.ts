import { FoodTruckService } from './foodtruck.service';
import { FoodTruck, Location } from '../../shared/src';

describe('FoodTruck data API', () => {
  it('should create', async () => {
    var userLoc: Location = {lat: 0, long: 0} as Location;
    var locs: FoodTruck[] = await new FoodTruckService().getNearestFoodtucks(userLoc, 5);
    expect(locs.length).toEqual(5);
    expect(locs[0]).toEqual(
      {loc: {lat: 0, long: 0} as Location} as FoodTruck);
    expect(locs[1]).toEqual(
      {loc: {lat: 0, long: 0} as Location} as FoodTruck);
    expect(locs[2]).toEqual(
      {loc: {lat: 0, long: 0} as Location} as FoodTruck);
    expect(locs[3]).toEqual(
      {loc: {lat: 0, long: 0} as Location} as FoodTruck);
    expect(locs[4]).toEqual(
      {loc: {lat: 0, long: 0} as Location} as FoodTruck);
  });
});
