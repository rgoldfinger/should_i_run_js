/** @jsx React.DOM */

var React = require('react');

var DestEntry = React.createClass({
  handleSetDest: function(e) {
    console.dir(e);
    this.props.onSetDest(this.props.dest);
  },

  render: function() {

    return (

      <div 
        className={"dest-entry dest" + this.props.key} 
        onClick={this.handleSetDest} 

        >
        <p> {this.props.dest.name} </p>
      </div>

    )
  }
});


module.exports = DestEntry;


//        onTouchEnd={this.handleSetDest} 