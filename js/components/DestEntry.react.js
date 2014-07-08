/** @jsx React.DOM */

var React = require('react');

var DestEntry = React.createClass({
  getInitialState: function () {
    return {moved: false};
  },
  handleSetDest: function(e) {
    console.log('touchEnd:');
    if(this.state.moved === false) {
      console.log("No move so firing!");
      this.props.onSetDest(this.props.dest);
    }



  },

  onTouchMove: function(e) {
    console.log('touchMove:');
    this.setState({moved: true});

  },

  onTouchStart: function(e) {
    console.log('touchStart:');
    this.setState({moved: false});
  },

  render: function() {

    return (

      <div 
        className={"dest-entry dest" + this.props.key}
        onTouchEnd={this.handleSetDest} 
        onTouchStart={this.onTouchStart} 
        onClick={this.handleSetDest}
        onTouchMove={this.onTouchMove}
        >
        <p> {this.props.dest.name} </p>
      </div>

    )
  }
});


module.exports = DestEntry;


       // 
//        