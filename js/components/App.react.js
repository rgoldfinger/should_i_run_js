/** @jsx React.DOM */

var React = require('react');
var Dest = require('./Dest.react');
var Result = require('./Result.react');
var Pick = require('./Pick.react');
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
  { name: 'berkeley', loc: '1', lat: '37.856808', lon: '-122.252941' },
  { name: 'hack reactor', loc: '2', lat: '37.783531', lon: '-122.40911' }
];


React.initializeTouchEvents(true);

var App = React.createClass({

  getInitialState: function() {

    //load data from local storage if it exists, otherwise use dummy data
    var data = localStorage.getItem('dests');  
    if (data) {
      data = JSON.parse(data);
    } else {
      data = dests;
    }

    return {
      noUser: true,
      picking: false,
      dest: null,
      loading: false,
      dests: data,
      location: null,
      distanceToStn: null, //right now this will be in meters
      stationName: null,
      departureTimes: null
    };
  },

  componentWillMount: function() {
    this.shouldRef = new Firebase('https://shouldirun.firebaseio.com');
    
    this.auth = new FirebaseSimpleLogin(this.shouldRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        this.setState({noUser: false});
        this.user = this.shouldRef.child('/users/' + user.id);
        this.user.child('username').set(user.username);

        this.user.on('child_added', function(data) {
          console.dir(data.val());
          console.log("^^^got data^^^");
          var d = data.val();
          var placesList = [];
          for (var k in d) {
            if (d[k].name) {
              placesList.push({name: d[k].name, lat: d[k].lat, lon: d[k].lon})
            }
          }
          if (placesList.length > 0) {
            this.setState({dests: placesList});
          }

          // this.setState({dests: data});
        }.bind(this));

      } else {
        // user is logged out
      }
    }.bind(this));



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
        this.setState({distanceToStn: steps[0], stationName: steps[3]});
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

  handleAddDest: function(place) {
    this.user.child('places').push(place);

    this.state.dests.push(place);
    this.setState({dests: this.state.dests, picking: false});
    // localStorage.setItem('places', JSON.stringify(this.state.dests));
    // this.shouldRef()
  },

  handlePicking: function() {
    this.setState({picking: true});
  },

  handleSubmitPlace: function(place) {
    console.log("submitting");
    console.log(place);
    this.setState({picking: false});
    this.handleAddDest(place);
  },

  handleLogin: function() {
    console.log("logging in");
    this.auth.login('facebook', {
      rememberMe: true, 
      preferRedirect: true
    });
    


  },



  render: function () {
    //destination picker
    if (this.state.noUser) {
      return (
      <div className="login" 
        onClick={this.handleLogin}
        onTouchEnd={this.handleLogin}>
        <h2>Login</h2>

      </div>
    );

    } else if (!this.state.dest && !this.state.picking) {
      return (
        <Dest
          onPicking={this.handlePicking}
          onDestSelect={this.onSetDest}
          dests={this.state.dests}
          loc={this.state.location}
        />
      );

    } else if (this.state.picking) {
      return (
        <Pick onAddDest={this.handleAddDest} 
          onSubmitPlace={this.handleSubmitPlace}
          loc={this.state.location} />
      );
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
          stationName={this.state.stationName}
          />
      );
    }



  }

});

module.exports = App;