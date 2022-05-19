import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import {FoodTruck, NearbyTrucksRequest, NearbyTrucksResponse, Location} from '../../../../shared/src'

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {
  // https://us-central1-althill.cloudfunctions.net/app/api/nearby
  getNearbyFoodTucks = this.functions.httpsCallable<NearbyTrucksRequest, NearbyTrucksResponse>('api/nearby');

  constructor(public functions: AngularFireFunctions) {
  }

  async getNearbyFoodTrucks(loc: Location, limit: number) : Promise<FoodTruck[]> {
    var response : NearbyTrucksResponse = await lastValueFrom(
      this.getNearbyFoodTucks({loc, limit} as NearbyTrucksRequest));
    return response.results;
  }

}
