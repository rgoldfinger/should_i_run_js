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
  getInitialState: function() {
    return {loc: null, name: null};
  },
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

  handlePick: function(e) {
    this.setState({loc: e.latlng});
  },

  handleChange: function() {
    this.setState({name: this.refs.nameArea.getDOMNode().value.trim()});
  },

  handleSubmit: function() {

    var place = { name: this.state.name, lat: this.state.loc.lat, lon: this.state.loc.lng };
    this.props.onSubmitPlace(place);

  },

  render: function() {
    if (this.state.loc === null) {
      return (
        <div className="question">
          <div id="map" className="picker-map"></div>
        </div>
      )
    } else {
      return (
        <div className="enter-name" >
          <p>Location Name:</p>
          <form >
            <input 
              ref="nameArea"
              value={this.state.name} 
              onChange={this.handleChange} />
            <button 
              onTouchEnd={this.handleSubmit}
              onClick={this.handleSubmit}>
              Save
            </button>
          </form>
        </div>
      )
    }
  }
});


module.exports = Pick;