import { TestBed } from '@angular/core/testing';
import { FoodTruckService } from './speech-sdk.service';

describe('FoodTruckService', () => {
  let service: FoodTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
