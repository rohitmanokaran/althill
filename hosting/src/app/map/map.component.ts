import { Component, HostListener, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { MatDialog } from '@angular/material/dialog';
import { FoodTruckService } from '@services/foodtruck.service';
import {FoodTruck, Location} from '../../../../shared/src'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  centerPosition: google.maps.LatLng = new google.maps.LatLng(37.773972, -122.431297);
  options: google.maps.MapOptions = {
    center: this.centerPosition,
    zoom: 12, 
    disableDefaultUI: true
  };
  height = 100;
  width = 200;
  numTrucksToShow = 10;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  centerMarkerOptions: google.maps.MarkerOptions = {draggable: false, shape: {type: "circle"} as google.maps.MarkerShape};

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar, private router: Router,
    private functions: AngularFireFunctions, private messaging: AngularFireMessaging,
    private dialog: MatDialog, private foodTruckService: FoodTruckService) {

  }
  async ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.snackBar.open("Click a location to show to nearest " + this.numTrucksToShow + " food trucks.", "Dismiss", {duration: 10000});
  }

  async showNearbyTrucks(position: google.maps.LatLng) {
    var results: FoodTruck[] = await this.foodTruckService.getNearbyFoodTrucks({
      lat: this.centerPosition.lat(), 
      long: this.centerPosition.lng()} as Location, 10);
      this.markerPositions = [];
    for(var result of results) {
      this.markerPositions.push({lat: result.loc.lat, lng: result.loc.long});
    }
  }

  async moveLocationTo(event: google.maps.MapMouseEvent) {
    if (event && event.latLng) {
      this.centerPosition = event?.latLng!;
      this.options.center = this.centerPosition;
      await this.showNearbyTrucks(this.centerPosition);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
