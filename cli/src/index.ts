#!/usr/bin/env node
const program = require('commander');

program
  .version('0.0.1')
  .description("List food trucks near a lat and longitude")
  .option('-lat', 'Latitude')
  .option('-long', 'Longitude')
  .option('-limit', 'Number of trucks')
  .parse(process.argv);
