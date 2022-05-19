export type Location = {
  lat: number;
  long: number;
}

export type FoodTruck = {
  loc: Location
}

export type NearbyTrucksRequest = {
  loc: Location,
  limit: number
}

export type NearbyTrucksResponse = {
  results: FoodTruck[]
}