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
    var query = 'http://maps.googleapis.com/maps/api/directions/json?' +
          'origin=' + startlatlon +
          '&destination=' + endlatlon +
          '&mode=transit' +
          '&departure_time=' + Date.now() +
          '&key=' + 'AIzaSyBnKY7DHsBXsUSFd0imeI526cNE9h5IpUY';

    var now = Date.now();

    var request = {
        origin: startlatlon,
        destination: endlatlon,
        travelMode: google.maps.TravelMode.TRANSIT,

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
  convertGoogleToBart: function(g) {
    g = g.routes[0].legs[0].steps;
    console.dir(g);
    var steps = [];


    var foundWalking = false;
    var i = 0;


    while(!foundWalking) {
      if (g[i].travel_mode === 'WALKING') {
        foundWalking = true;
        var name1 = g[i].instructions;
        name1 = name1.slice(7).trim();
        console.log("name1: ", name1);
        var stn1 = bartLookup[name1];
        console.log("stn1", stn1);
        steps[0] = g[i].distance.value;//this is distance in meters
        steps[1] = stn1.toUpperCase(); //our data is in lowercase but bart requires upper



      } else if (i === g.length) {
        console.error("no valid transit directions");
        foundWalking = true; //prevent infinate loop
      } else {
        i ++;
      }

    }
      
    //We are assuming that the next item in the array 
    //will be the "Metro rail towards Pittsburg/Bay Point" step
    i++;
    var name2 = g[i].instructions;
    name2 = name2.slice(19).trim();
    console.log("name2: ", name2);
    var stn2 = bartLookup[name2];
    console.log("stn2", stn2);
    steps[2] = stn2.toUpperCase(); //our data is in lowercase but bart requires upper

    return steps; //[distance to start station, start station, end of line station]

  },

  getNextTrains: function(startStn, endStn, callback) {
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
            if (data[i].abbreviation[0] === endStn) {
              temp = data[i].estimate;
              for (var k = 0; k <temp.length; k++) {
                if (temp[k].minutes[0] !== 'Leaving') { //sometimes the number of minutes is "Leaving"
                  departureTimes.push(temp[k].minutes[0]);
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

