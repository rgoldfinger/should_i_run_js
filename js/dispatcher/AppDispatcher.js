var Dispatcher = require ('./Dispatcher');

var merge = require('react/lib/merge');

var AppDispatcher = merge(Dispatcher.prototype, {

  //generic handler for an action in the view.
  //actions from the server should be similar
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
