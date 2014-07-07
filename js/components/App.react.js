/** @jsx React.DOM */

var React = require('react');
var Dest = require('./Dest.react');
var Result = require('./Result.react');
var Question = require('./Question.react');
var Helpers = require('../helpers/helpers');

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


React.initializeTouchEvents(true);

var App = React.createClass({

  getInitialState: function() {
    return {
      dest: null,
      loadingResult: false,
      hasResult: false,
      dests: dests, 
      location: null
    };
  },

  componentDidMount: function() {
    Helpers.determineLocation(function(loc) {
      this.setState({
        location: loc
      });
    }.bind(this));
  },

  componentWillUnmount: function () {


  },


  onSetDest: function(dest) {
    this.setState({dest: dest});
  },

  handleGo: function() {
    //for now setting has result to true, but will need to call helpers and things first
    this.setState({
      hasResult: true
    })

  },

  render: function () {
    //Question page
    if (this.state.dest !== null && !this.state.hasResult) {
      return ( <Question dest={this.state.dest}
                onGo={this.handleGo}
                />);

    //Results page!
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
          loc={this.state.location}
        />
      );
    }


  }

});

module.exports = App;