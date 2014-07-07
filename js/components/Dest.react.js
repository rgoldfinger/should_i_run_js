/** @jsx React.DOM */

var React = require('react');
var DestEntry = require('./DestEntry.react');
var _ = require('underscore');

var Dest = React.createClass({

  handleSetDest: function(dest) {
    this.props.onDestSelect(dest);
  },


  render: function() {
    var dests = _.map(this.props.dests, function(dest, i) {
      return (<DestEntry dest={dest} onSetDest={this.handleSetDest} key={i} />);
    }.bind(this));
    var locInfo;
    if (this.props.loc) {
      locInfo = (
        <div>
          <div>acc: {this.props.loc.coords.accuracy}</div>
          <div>lat: {this.props.loc.coords.latitude}</div>
          <div>lon: {this.props.loc.coords.longitude}</div>
          <div>heading: {this.props.loc.coords.heading}</div>
          <div>speed: {this.props.loc.coords.speed}</div> 
        </div>
        );
    }

    return (
      <div>
        <div>
          <h2> Where are you going? </h2>
        </div>
        <div>
          {dests}
        </div>
        <div>You are: {locInfo}</div>


      </div>
    );
  }
});


module.exports = Dest;