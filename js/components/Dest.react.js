/** @jsx React.DOM */

var React = require('react');
var DestEntry = require('./DestEntry.react');
var _ = require('underscore');

var Dest = React.createClass({

  selectDest: function(dest) {
    this.props.onDestSelect(dest);
  },


  render: function() {
    var dests = _.map(this.props.dests, function(dest, i) {
      return (<DestEntry dest={dest} onClick={this.selectDest} key={i} />);
    });

    return (
      <div>
        <div>
          <h2> Where are you going? </h2>
        </div>
        <div>
          {dests}
        </div>
      </div>
    );
  }
});


module.exports = Dest;