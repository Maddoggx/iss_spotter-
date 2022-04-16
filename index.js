//const request = require("request");
const { fetchMyIP } = require('./iss')
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
// callbacks are functions that you passs into other functions.
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

 