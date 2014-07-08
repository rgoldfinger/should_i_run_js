/** @jsx React.DOM */

var React = require('react');

var DestEntry = React.createClass({
  getInitialState: function () {
    return {moved: false};
  },

  handleSetDest: function(e) {
    if(this.state.moved === false) {
      this.props.onSetDest(this.props.dest);
    }
  },

  onTouchMove: function(e) {
    this.setState({moved: true});

  },

  onTouchStart: function(e) {
    this.setState({moved: false});
  },

  render: function() {

    return (

      <div 
        className={"dest-entry dest" + this.props.key}
        onTouchEnd={this.handleSetDest} 
        onTouchStart={this.onTouchStart} 
        onTouchMove={this.onTouchMove}
        onClick={this.handleSetDest}
        >
        <p> {this.props.dest.name} </p>
      </div>

    )
  }
});


module.exports = DestEntry;


       // 
//        