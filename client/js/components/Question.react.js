/** @jsx React.DOM */

var React = require('react');

var Question = React.createClass({
  handleGo: function() {
    this.props.onGo();
  },

  render: function() {
    return (
      <div className="question"
        onTouchEnd={this.handleGo}
        onClick={this.handleGo}>
        <h2 > Should I run?</h2>
      </div>
    )
  }
});

module.exports = Question;