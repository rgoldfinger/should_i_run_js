/** @jsx React.DOM */

var React = require('react');
var DestEntry = require('./DestEntry.react');
var _ = require('underscore');

var Dest = React.createClass({


  render: function() {
    var dests = this.props.dests;

    for (var i = 0; i < dests.length; i ++)
    return (
      <div>
        <div>
          <h2> Where are you going? </h2>
        </div>
        <div>
          <p> Home</p>
        </div>
        <div>
          <p> Work </p>
        </div>
        <div>
          <p> Other...</p>
        </div>
      </div>
    )
  }
});


module.exports = Dest;