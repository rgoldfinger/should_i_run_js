var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var UserActions = {
  create: function(username) {

    AppDispatcher.handleViewAction({
      actiontype: ChatConstants.USER_CREATE,
      username: username
    });
  }
};

module.exports = UserActions;