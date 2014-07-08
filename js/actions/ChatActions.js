var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ChatActions = {
  create: function(text) {
    AppDispatcher.handleViewAction({
      actiontype: ChatConstants.CHAT_CREATE,
      text: text
    });
  }
};

module.exports = ChatActions;