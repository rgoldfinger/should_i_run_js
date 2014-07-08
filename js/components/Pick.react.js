/** @jsx React.DOM */

var React = require('react');
var Helpers = require('../helpers/helpers');


var addMap = function(lat, lon) {
   var map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('http://{s}.tiles.mapbox.com/v4/rgoldfinger.ind9i047/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmdvbGRmaW5nZXIiLCJhIjoiNmpLM1pGcyJ9.yEeB7kkHxdZ5tWwBEissBA', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(map);

      map.on('click', function (e){
        this.handlePick(e);
      }.bind(this));

};


var Pick = React.createClass({
  componentDidMount: function() {
    if (!this.props.loc) {
      Helpers.determineLocation(function(loc) {
        var lat = loc.coords.latitude;
        var lon = loc.coords.longitude;
        addMap.call(this, lat, lon);
      }.bind(this));

    } else {
      var lat = this.props.loc.coords.latitude;
      var lon = this.props.loc.coords.longitude;
      addMap.call(this, lat, lon);
      
    }
  },

  componentWillUnmount: function() {
    document.getElementById('map')
      .removeEventListener('click', function (e){
        this.handlePick(e);
      }.bind(this), false);
  },

  handlePick: function(e) {
    console.log("handling pick");
    console.dir(e);
    var name = prompt("name:");
  },

  render: function() {
    return (
      <div className="question">
        <div id="map" className="picker-map"></div>
      </div>
    )
  }
});


module.exports = Pick;