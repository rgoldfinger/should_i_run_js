/** @jsx React.DOM */

var React = require('react');
var Dest = require('./Dest.react');
var Result = require('./Result.react');
var Question = require('./Question.react');
// var MainSection = require('./MainSection.react');
// var ChatStore = require('../stores/ChatStore');
// var UserStore = require('../stores/UserStore');


//three pages: 
//Select destination
//should I run?
//result

//state list: 
// dest: Name or null
// loadingResult: Bool
// hasResult: Bool

var dests = [
  { name: 'home', loc: '1' },
  { name: 'work', loc: '2' }
]




var App = React.createClass({

  getInitialState: function() {
    return {
      dest: null,
      loadingResult: false,
      hasResult: false,
      dests: dests
    };
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function () {


  },
  onSetDest: function(dest) {
    this.setState({dest: dest});
  },

  render: function () {
    if (this.state.dest !== null && !this.state.hasResult) {
      return ( <Question />);


    } else if (this.state.hasResult) {
      return (
        <Result />
      );
    //The user hasn't done anything yet so show the destination picker
    } else {
      return (
        <Dest 
          onDestSelect={this.onSetDest}
          dests={this.state.dests}
        />
      );
    }


  }

});

module.exports = App;