//  ip = {"ip":"72.51.111.60"};
const request = require("request");

const fetchMyIP = function(callback) { 
   request('https://api.ipify.org/?format=json', function (error, response, body) {
    if (error) {
      return callback(error, null);
      
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const data = JSON.parse(body).ip;
    return callback(null, data);  //  return callback(null, data); TypeError: callback is not a function
  })
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`,  (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    };
// console.log(body);
    const { latitude, longitude } = JSON.parse(body);

    return callback(null, { latitude, longitude });
  });
};

 const fetchISSFlyOverTimes = function({ latitude, longitude }, callback) {
   // console.log(latitude, longitude);
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS Fly Over Times for IP. Response: ${body}`), null);

      return;
    }
    const flyover = JSON.parse(body).response;
    callback(null, flyover);
  })
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

/* 
{"ip":"72.51.111.60","country_code":"BB","country_name":"Barbados","region_code":"08","region_name":"Saint Michael","city":"Bridgetown","zip_code":"","time_zone":"America/Barbados","latitude":13.0961,"longitude":-59.616,"metro_code":0}
*/