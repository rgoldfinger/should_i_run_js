/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var timeInStation = 2; //assuming it will always take two min in the station

var runningSpeed = 200; //assuming running speed of 200m / minute
var walkingSpeed = 80; //assuming walking speed of 80m / minute



var Result = React.createClass({
  // getInitialState: function() {
  //   minAway: 

  // },

  render: function() {

    console.log("dist: ",  parseInt(this.props.distanceToStn));
    console.log("time: ",  ( parseInt(this.props.departureTimes[0]) + timeInStation));

    //find the first departure time under running speed
    var times = _.map(this.props.departureTimes, function(time) {
      return parseInt(time);
    });
    times = _.uniq(times);
    times = times.sort(function(a, b) {
      return a > b;
    });
    console.dir(times);

    var distance = parseInt(this.props.distanceToStn);

    var speedNeeded;

    var nextTime, followingTime;

    //we start at the end so that we set the next makeable train and don't then overwrite it
    for (var i = times.length; i >= 0; i --) {
      if ( (times[i] - timeInStation) > 0) {
        speedNeeded = distance / (times[i] - timeInStation);
        if (speedNeeded < runningSpeed) {
          nextTime = times[i];
          followingTime = times[i+1];

        } else if (speedNeeded < walkingSpeed) {
          nextTime = times[i];
          followingTime = times[i+1];

        }
      }
    }


    speedNeeded = distance / (nextTime - timeInStation);

    var answer;

    if (speedNeeded < walkingSpeed) {
      answer = (
        <div className="answer take-it-easy">
          Nah, take it easy...
        </div> 

      );


    } else if (speedNeeded < runningSpeed) {

       answer = (
        <div className="answer run">
          Run!
        </div> 

      );
    } 


    //first find times within range of running or walking
    //if there is one, display running!
    //the why section will always be the same. 

    var why = (
      <div 
        className={'because'}>
        <p>Next train: <b>~{nextTime}</b> minutes</p>
        <p>{this.props.stationName} station:</p> 
        <p>{distance} meters</p>
        <p><b>{Math.ceil(distance/walkingSpeed) + timeInStation}</b> minutes walking</p>
        <p><b>{Math.ceil(distance/runningSpeed) + timeInStation}</b> minutes running</p>
      </div>

    );

    var following = (
      <div 
        className={'following dest-entry'}>
        <p>Following train in <b>~{followingTime}</b> minutes</p>
      </div>
    );


    return (
      <div>
          {answer}
          {why}
          {following}
      </div>
    );
  }
});


module.exports = Result;