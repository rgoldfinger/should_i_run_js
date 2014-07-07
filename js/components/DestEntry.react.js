/** @jsx React.DOM */

var React = require('react');

var DestEntry = React.createClass({

  render: function() {

    return (

      <div className={"dest" + this.props.key} >
        <p> {this.props.dest.name} </p>
      </div>

    )
  }
});


module.exports = DestEntry;