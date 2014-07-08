/** @jsx React.DOM */

var React = require('react');

var Pick = React.createClass({
  componentDidMount: function() {
    if (!this.props.loc) { 
      console.log("no location data");

    } else {
      var lat = this.props.loc.coords.latitude;
      var lon = this.props.loc.coords.longitude;
      var map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('http://{s}.tiles.mapbox.com/v4/rgoldfinger.ind9i047/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmdvbGRmaW5nZXIiLCJhIjoiNmpLM1pGcyJ9.yEeB7kkHxdZ5tWwBEissBA', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }).addTo(map);
    }
    //https://a.tiles.mapbox.com/v4/rgoldfinger.ind9i047/page.html?access_token=pk.eyJ1IjoicmdvbGRmaW5nZXIiLCJhIjoiNmpLM1pGcyJ9.yEeB7kkHxdZ5tWwBEissBA
    //access_token=pk.eyJ1IjoicmdvbGRmaW5nZXIiLCJhIjoiNmpLM1pGcyJ9.yEeB7kkHxdZ5tWwBEissBA#4/37.77/-122.42

    <iframe width='100%' height='500px' frameBorder='0' src='https://a.tiles.mapbox.com/v4/rgoldfinger.ind9i047/attribution,zoompan.html?access_token=pk.eyJ1IjoicmdvbGRmaW5nZXIiLCJhIjoiNmpLM1pGcyJ9.yEeB7kkHxdZ5tWwBEissBA'></iframe>
  },

  handleGo: function() {
    //
  },

  render: function() {
    return (
      <div className="question"
        // onTouchEnd={this.handleGo}
        onClick={this.handleGo}>
        <h2>Where are you going?</h2>
        <div id="map" className="picker-map"></div>
      </div>
    )
  }
});

module.exports = Pick;