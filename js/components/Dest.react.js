/** @jsx React.DOM */

var React = require('react');
var DestEntry = require('./DestEntry.react');
var _ = require('underscore');

var Dest = React.createClass({
  getInitialState: function () {
    return {moved: false};
  },

  handleSetDest: function(dest) {
    this.props.onDestSelect(dest);
  },

  handlePicking: function(e) {
    if(this.state.moved === false) {
      this.props.onPicking();
    }
  },

  onTouchMove: function(e) {
    this.setState({moved: true});

  },

  onTouchStart: function(e) {
    this.setState({moved: false});
  },


  render: function() {
    var dests = _.map(this.props.dests, function(dest, i) {
      return (<DestEntry dest={dest} onSetDest={this.handleSetDest} key={i} />);
    }.bind(this));

    return (
      <div>
        <div className="dest-question"
            >
          <h2> Where are you going? </h2>
        </div>
        <div>
          {dests}
        </div>
        <div className="dest-entry pick"
          onTouchEnd={this.handlePicking}
          onTouchStart={this.onTouchStart} 
          onTouchMove={this.onTouchMove} 
          onClick={this.handlePicking}>
        <p>add destination</p>
        </div>
      </div>
    );
  }
});


module.exports = Dest;

            // 