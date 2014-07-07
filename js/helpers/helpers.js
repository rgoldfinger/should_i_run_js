

var helpers = {
  getInfoForStation: function(stn) {

  },

  determineLocation: function(callback) {
    navigator.geolocation.getCurrentPosition(function(loc) {
      console.log(loc);
      callback(loc);
    });
  },

  askGoogle: function(loc) {


  },

  determineStation: function(callback) {

  }

};





module.exports = helpers;

