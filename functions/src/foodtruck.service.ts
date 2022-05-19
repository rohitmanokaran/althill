import { FoodTruck, Location } from '../../shared/src';
import PriorityQueue from 'ts-priority-queue';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import * as util from 'util';

type FoodTruckCsvRecord = {
  Latitude: number;
  Longitude: number;
}

export class FoodTruckService {

  foodTruckCsvRecords: Promise<FoodTruckCsvRecord[]>;

  constructor() {
    const csvFilePath = path.resolve(__dirname, '../res/Mobile_Food_Facility_Permit.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    var parseCsvAsync = util.promisify<string, any, any>(parse);
    this.foodTruckCsvRecords = parseCsvAsync(fileContent, {
      delimiter: ',',
      columns: true,
      cast: true
    }).catch(error => { 
      throw new Error('Unable to read and parse csv, reason: ' + error);
    });
  }

  private distance = (loc1: Location, loc2: Location) : number => {
    return Math.sqrt(
        Math.pow(loc2.lat - loc1.lat, 2) + Math.pow(loc2.long - loc1.long, 2));
  }
  
  public getNearestFoodtucks = async (userLoc: Location, limit: number): Promise<FoodTruck[]> => {
    // Latitude,Longitude
    var queue = new PriorityQueue({ comparator: (a: FoodTruck, b: FoodTruck) => { 
      return this.distance(userLoc, b.loc) - this.distance(userLoc, a.loc); 
    }});
  
    for(var record of await this.foodTruckCsvRecords) {
      queue.queue({loc: {lat: record.Latitude, long: record.Longitude} } as FoodTruck);
      if (queue.length > limit) {
        queue.dequeue();
      }  
    }
  
    var list: FoodTruck[] = [];
    while(queue.length > 0) {
      list.push(queue.dequeue());
    }
    return list;
  } 
}

