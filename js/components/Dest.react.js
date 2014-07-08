/** @jsx React.DOM */

var React = require('react');
var DestEntry = require('./DestEntry.react');
var _ = require('underscore');

var Dest = React.createClass({

  handleSetDest: function(dest) {
    this.props.onDestSelect(dest);
  },

  handlePicking: function() {
    console.log("going to picking");
    this.props.onPicking();
  },


  render: function() {
    var dests = _.map(this.props.dests, function(dest, i) {
      return (<DestEntry dest={dest} onSetDest={this.handleSetDest} key={i} />);
    }.bind(this));

    return (
      <div>
        <div className="dest-question"
            >
          <h2> Where are you going? </h2>
        </div>
        <div>
          {dests}
        </div>
        <div className="dest-entry pick"
             onTouchEnd={this.handlePicking} 
             onClick={this.handlePicking}>
          <p>add destination</p>
        </div>
      </div>
    );
  }
});


module.exports = Dest;