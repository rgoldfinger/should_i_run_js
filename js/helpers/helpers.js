

var helpers = {
  getInfoForStation: function(stn) {

  },

  determineLocation: function(callback) {
    navigator.geolocation.getCurrentPosition(function(loc) {
      console.log(loc);
      callback(loc);
    });
  },

  askGoogle: function(start, end) {
    console.log('start', start);
    console.log('end', end);
    var startlatlon = start.lat + start.lon;
    var endlatlon = end.lat + end.lon;
    var query = 'http://maps.googleapis.com/maps/api/directions/json?origin=' + 
          startlatlon + 
          '&destination=' + endlatlon + 'Montreal&key=' + 'AIzaSyBnKY7DHsBXsUSFd0imeI526cNE9h5IpUY'



  },

  determineStation: function(callback) {

  }

};





module.exports = helpers;

