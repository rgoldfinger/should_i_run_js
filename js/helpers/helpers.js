var bartLookup = require('./bartLookup.js');
var parseString = require('xml2js').parseString;


var directionsService = new google.maps.DirectionsService();

var helpers = {


  determineLocation: function(callback) {
    navigator.geolocation.getCurrentPosition(function(loc) {
      callback(loc);
    });
  },

  askGoogle: function(start, end, callback) {
    var startlatlon = new google.maps.LatLng(start.coords.latitude, start.coords.longitude);
    var endlatlon = new google.maps.LatLng(end.lat, end.lon);

    var now = Date.now();

    var request = {
        origin: startlatlon,
        destination: endlatlon,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true

    };

    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        callback(null, response);
      } else {
        callback('error with google');
      }
    });

  },



  //takes what google gives back, returns an array of distance to stn, start and end of line stations
  convertGoogleToBart: function(goog) {
    var result = [];


    var foundWalking = false;
    var i = 0;
    var name1;
    var name2;
    var stn1;
    var stn2;

    var steps = goog.routes[0].legs[0].steps;

    while(!foundWalking) {
      if (steps[i].travel_mode === 'WALKING') {
        foundWalking = true;
        name1 = steps[i].instructions;
        name1 = name1.slice(7).trim();
        stn1 = bartLookup[name1];
        result[0] = steps[i].distance.value;//this is distance in meters
        result[1] = stn1.toUpperCase(); //our data is in lowercase but bart requires upper




      } else if (i === steps.length) {
        console.error("no valid transit directions");
        foundWalking = true; //prevent infinate loop
      } else {
        i ++;
      }

    }
      
    //We are assuming that the next item in the array 
    //will be the "Metro rail towards Pittsburg/Bay Point" step
    i++;
    name2 = steps[i].instructions;
    name2 = name2.slice(19).trim();
    stn2 = bartLookup[name2];
    result[2] = []; //an array so that we can look for other possible trains
    result[2].push(stn2.toUpperCase()); //our data is in lowercase but bart requires upper

    result[3] = name1; //Name of the station walking to

    //now go look for other termininus' in the remaining routes
    i = 0;
    for (var k = 1; k < goog.routes.length; k ++) {
      steps = goog.routes[k].legs[0].steps;

      foundWalking = false;

      while(!foundWalking) {
        if (steps[i] && steps[i].travel_mode && steps[i].travel_mode === 'WALKING') {
          foundWalking = true;
        } else if (i >= steps.length - 1) {
          foundWalking = true; //prevent infinate loop
        } else {
          i ++;
        }
      }

      i++;
      if (i < steps.length) {
        name2 = steps[i].instructions;
        name2 = name2.slice(19).trim();
      }
      
      if (bartLookup.hasOwnProperty(name2)) {
        stn2 = bartLookup[name2];
        result[2].push(stn2.toUpperCase()); //our data is in lowercase bu
      }

    }

    return result; //[distance to start station, start station, end of line station]

  },

  getNextTrains: function(startStn, endStnArr, callback) {
    var query = 'http://api.bart.gov/api/etd.aspx?cmd=etd' +
                '&orig=' + startStn +
                '&key=' + 'ZELI-U2UY-IBKQ-DT35';

    request = new XMLHttpRequest();
    request.open('GET', query, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400){
        
        parseString(this.response, function (err, data) {
          data = data.root.station[0].etd

          //iterate through the departures and get the next two
          var temp;
          var departureTimes = [];
          for (var i = 0; i < data.length; i ++) {

            //check against all possible end stations
            for (var j = 0; j < endStnArr.length; j ++) {

              if (data[i].abbreviation[0] === endStnArr[j]) {
                temp = data[i].estimate;
                for (var k = 0; k <temp.length; k++) {
                  if (temp[k].minutes[0] !== 'Leaving') { //sometimes the number of minutes is "Leaving"
                    departureTimes.push(temp[k].minutes[0]);
                  }
                }
              }
            }


          }
          callback(null, departureTimes);


        });
      } else {
        callback("error getting data from BART");

      }
    };

    request.onerror = function() {
        callback("error getting data from BART");
    };

    request.send();


  }


};





module.exports = helpers;

