/** @jsx React.DOM */

var React = require('react');

var Result = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <h2>Yes! </h2>
        </div>
        <div>
          <p>Because: </p>
          <p>You're running late</p>
        </div>

      </div>
    );
  }
});


module.exports = Result;