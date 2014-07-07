/** @jsx React.DOM */

var React = require('react');

var DestEntry = React.createClass({
  handleSetDest: function() {
    this.props.onSetDest(this.props.dest);
  },

  render: function() {

    return (

      <div 
        className={"dest" + this.props.key} 
        onClick={this.handleSetDest} >
        <p> {this.props.dest.name} </p>
      </div>

    )
  }
});


module.exports = DestEntry;