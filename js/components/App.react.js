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
// loading: Bool

var dests = [
  { name: 'home', loc: '1', lat: '37.856808', lon: '-122.252941' },
  { name: 'hack reactor', loc: '2', lat: '37.783531', lon: '-122.40911' }
]


React.initializeTouchEvents(true);

var App = React.createClass({

  getInitialState: function() {
    return {
      dest: null,
      loading: false,
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
    this.setState({dest: dest, loading: true});
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
            loading: false
          });
        }.bind(this));

      }.bind(this));
    }.bind(this));
   
  },



  render: function () {
    //destination picker
    if (!this.state.dest) {
      return (
        <Dest 
          onDestSelect={this.onSetDest}
          dests={this.state.dests}
          loc={this.state.location}
        />
      );
    //loading page
    } else if (this.state.loading) {
      return ( 
        <div className="loading"> 
          <span className="csspinner shadow oval"></span>
          <p className="loading-text"><i>loading...</i></p>
        </div>
      );
    //result!!!
    } else {
      return (
        <Result 
          distanceToStn={this.state.distanceToStn}
          departureTimes={this.state.departureTimes}
          />
      );
    }



  }

});

module.exports = App;