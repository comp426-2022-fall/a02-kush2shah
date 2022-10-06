#!/usr/bin/env node
//imports
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

// read cli args
const args = minimist(process.argv.slice(2));
console.log(args);
if(args.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
}

// read args
const lat = (args.n || args.s * -1);
const lon = (args.e || args.w * -1);

// timezone set
const timezone = moment.tz.guess();

// day to retrieve. default to tomorrow
const day = args.d || 1;

// request data
const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=` + lat + `&longitude=` + lon + `&daily=precipitation_sum&timezone=` + timezone);

// get data
const data = await response.json();

if(args.j){
    console.log(data);
    process.exit(0);
}
