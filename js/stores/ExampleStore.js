var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;


//what is this for??????
var ChatConstants = require('../constants/ChatConstants');

var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';


//storage for all of the chats
var _chats = {};


//-----------Helper functions for store actions


//will need to change this to use sockets. For now storing client side is fine. 
var create = function (text, username, roomname) {
  var id = Date.now();
  _chats[id] = {
    id: id,
    text: text,
    username: username,
    roomname: roomname
  };
};



var ChatStore = merge(EventEmitter.prototype, {

  getAll: function() {
    return _chats;
  },

/// what is this doing????
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
 
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }



});


AppDispatcher.register(function(payload) {
  var type = payload.action.actiontype;

  var text;

  if (type === ChatConstants.CHAT_CREATE) {
      text = payload.action.text.trim();
      if (text !== '') {

        create(text);
      } else {
        return true;
      }
    } else {
      // we don't want the emit change function to be run if there are no changes
      return true; //break out early

  }

    //add events for room create, user create
    // case ChatConstants.ROOM_CREATE: 
    //   text = action.roomname.trim();
    //   if (text)....

  ChatStore.emitChange();

  return true; //required by the promise in Dispatcher

});

module.exports = ChatStore;






//     default:
//       return true;
//   }

//   // This often goes in each case that should trigger a UI change. This store
//   // needs to trigger a UI change after every view action, so we can make the
//   // code less repetitive by putting it here.  We need the default case,
//   // however, to make sure this only gets called after one of the cases above.
//   TodoStore.emitChange();

//   return true; // No errors.  Needed by promise in Dispatcher.
// });

