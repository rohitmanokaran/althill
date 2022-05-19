import { NearbyTrucksRequest, NearbyTrucksResponse } from '../../shared/src';

const functions = require('firebase-functions');

import * as cors from 'cors';
import { FoodTruckService } from './foodtruck.service';
const express = require('express');

var bodyParser = require('body-parser');

export const app = express();

app.use(cors({ origin: "*" }));

var jsonParser = bodyParser.json();

app.post('/api/nearby', jsonParser, async (req: any, res: any) => {
  
  var request = req.body.data as NearbyTrucksRequest;

  if (!request) {
    throw new functions.https.HttpsError('invalid-argument', 'Received empty request.');
  }

  var userLoc = request.loc;
  var limit = request.limit;
  if (!userLoc || !(typeof userLoc.lat === 'number') || !(typeof userLoc.lat === 'number')) {
    console.log(userLoc);
    throw new functions.https.HttpsError('invalid-argument', 'Location was invalid.');
  }

  if (userLoc.lat < -90 || userLoc.lat > 90) {
    throw new functions.https.HttpsError('invalid-argument', 'Latitude must be between -90 and 90.');
  }

  if (userLoc.long < -180 || userLoc.lat > 180) {
    throw new functions.https.HttpsError('invalid-argument', 'Longitude must be between -180 and 180.');
  }

  if (!(typeof limit === 'number') || limit <1 || limit > 100) {
    throw new functions.https.HttpsError('invalid-argument', 'Limit must be a number between 1 and 100.');
  }

  var results = await new FoodTruckService(). getNearestFoodtucks(request.loc, request.limit);

  return res.json({data: {results} as NearbyTrucksResponse});
});

exports.app = functions.https.onRequest(app);
