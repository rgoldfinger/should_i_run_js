/** @jsx React.DOM */

var React = require('react');

var Question = React.createClass({
  handleGo: function() {
    this.props.onGo();
  },

  render: function() {
    console.log(this.props);
    
    return (
      <div 
        onTouchEnd={this.handleGo}
        onClick={this.handleGo}>
        <h2> Should I run?</h2>
        <p>You're catching the train to {this.props.dest.name}</p>
      </div>
    )
  }
});

module.exports = Question;