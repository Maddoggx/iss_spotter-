//const request = require("request");
const { fetchMyIP } = require('./iss')
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
// callbacks are functions that you passs into other functions.
/*
fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work", error);
      return;
    }
    console.log("It worked! Returned IP:", ip)
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      
      console.log('It worked! Returned coords:' , coords);
      fetchISSFlyOverTimes(ip, (error, flyover) => {
         if (error) {
           console.log("It didn't work!", error);
           return;
         }
        
         console.log('It worked! Flyby times as follows:', flyover);
       });
    });
      
});

const coords = { latitude: 13.0961, longitude: -59.616 };
*/
 const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
 nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
  for (let i = 0; i < passTimes.length; i++) {
    let date = new Date(passTimes[i].risetime * 1000);
    console.log(`Next pass at ${date} for ${passTimes[i].duration} seconds!`);
  }
});
