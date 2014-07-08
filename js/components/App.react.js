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
  { name: 'home', loc: '1', lat: '37.856808', lon: '-122.252941' },
  { name: 'hack reactor', loc: '2', lat: '37.783531', lon: '-122.40911' }
]


React.initializeTouchEvents(true);

var App = React.createClass({

  getInitialState: function() {
    return {
      dest: null,
      loadingResult: false,
      hasResult: false,
      viewResult: false,
      dests: dests, 
      location: null, 
      distanceToStn: null, //right now this will be in meters
      departureTimes: null
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
    Helpers.determineLocation(function(loc) {
      this.setState({
        location: loc
      });
      Helpers.askGoogle(loc, this.state.dest, function(err, stuff) {
        var steps = Helpers.convertGoogleToBart(stuff); //returns an array of start and end stations
        this.setState({distanceToStn: steps[0]});
        Helpers.getNextTrains(steps[1], steps[2], function(err, data) {
          console.log("departure times: ", data);
          this.setState({
            departureTimes: data, 
            hasResult: true
          });
        }.bind(this));

      }.bind(this));
    }.bind(this));
   
  },

  handleGo: function() {
    //for now setting has result to true, but will need to call helpers and things first
    this.setState({
      viewResult: true
    })

  },

  render: function () {
    //Question page
    if (this.state.dest !== null && (!this.state.viewResult || !this.state.hasResult)) {
      return ( <Question dest={this.state.dest}
                onGo={this.handleGo}
                />);

    //Results page!
    } else if (this.state.hasResult && this.state.viewResult) {
      return (
        <Result 
          distanceToStn={this.state.distanceToStn}
          departureTimes={this.state.departureTimes}
          />
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