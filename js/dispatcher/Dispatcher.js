var promise = require('es6-promise').Promise;
var merge = require('react/lib/merge');

var _callbacks = [];
var _promises = [];

var _addPromise = function (callback, payload) {
  _promises.push(new Promise(function(resolve, reject) {
    if (callback(payload)) {
      resolve(payload);
    } else {
      reject(new Error('Dispatcher callback unsuccessful'));
    }

  }));
};

var _clearPromises = function() {
  _promises = [];
};



var Dispatcher = function() {};
Dispatcher.prototype = merge(Dispatcher.prototype, {


  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1;//return the index because??
  },



  //promisify all the callbacks, add them to a queue
  //blast through the queue and then clear it
  //In short: all stores that have a registered callback will be able to see
  //the action and decide if they want to act on it. 
  //the payload contains the data and the action type
  dispatch: function(payload) {

    _callbacks.forEach(function(callback) {
      _addPromise(callback, payload);
    });

    Promise.all(_promises).then(_clearPromises);
  }


});

module.exports = Dispatcher;