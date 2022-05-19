//var express = require('express'); // (npm install --save express)
var request = require('supertest');
import { NearbyTrucksRequest, NearbyTrucksResponse } from '../../shared/src';
import {app} from './app';

describe('Food Truck Service', function() {
  it('should list food trucks nearby', async() => {
    const res = await request(app)
      .post('/api/nearby')
      .set('Content-Type', 'application/json')
      .send({data: {loc: {lat: 0, long: 0}, limit: 5} as NearbyTrucksRequest});
    
    expect(res.statusCode).toEqual(200);
    var response = JSON.parse(res.text).data as NearbyTrucksResponse;
    expect(response.results.length).toEqual(5);
  });
});