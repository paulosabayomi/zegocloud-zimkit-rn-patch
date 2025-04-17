"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitMessageCore {
  constructor() {
    this.peerMessages = new Map();
    this.groupMessages = new Map();
    this.messages = new Map();
    this.messageCount = 10;
    this.messageListChangedCallback = null;
    this.preMessageSendingCallback = null;
  }
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitMessageCore());
  }
  getMessageList(conversationID, conversationType) {
    const config = {
      nextMessage: undefined,
      count: this.messageCount,
      reverse: true
    };
    return _zegoZimReactNative.default.getInstance().queryHistoryMessage(conversationID, conversationType, config).then(({
      messageList
    }) => {
      console.log('query history message success');
      if (conversationType === 0) {
        this.peerMessages.set(conversationID, messageList);
        this.messages.set(0, this.peerMessages);
      } else if (conversationType === 2) {
        this.groupMessages.set(conversationID, messageList);
        this.messages.set(2, this.groupMessages);
      }
      return messageList;
    }).catch(err => {
      console.log('query history message err', err);
      return err;
    });
  }
  onMessageListChanged(callback) {
    console.log('on message list changed', callback);
    if (typeof callback !== 'function') {
      return;
    } else {
      this.messageListChangedCallback = callback;
    }
  }
  offMessageListChanged() {
    this.messageListChangedCallback = null;
  }
  onPreMessageSending(callback) {
    console.log('on pre message sending', callback);
    if (typeof callback !== 'function') {
      return;
    } else {
      this.preMessageSendingCallback = callback;
    }
  }
  loadMoreMessage(conversationID, conversationType) {
    var _this$messages$get;
    let currentMessageList = (_this$messages$get = this.messages.get(conversationType)) === null || _this$messages$get === void 0 ? void 0 : _this$messages$get.get(conversationID);
    const config = {
      nextMessage: currentMessageList ? currentMessageList[0] : undefined,
      count: this.messageCount,
      reverse: true
    };
    return _zegoZimReactNative.default.getInstance().queryHistoryMessage(conversationID, conversationType, config).then(({
      messageList
    }) => {
      console.log('load more history message success');
      if (messageList.length) {
        var _this$messages$get2;
        if (conversationType === 0) {
          this.peerMessages.set(conversationID, [...messageList, ...currentMessageList]);
          this.messages.set(conversationType, this.peerMessages);
        } else if (conversationType === 2) {
          this.groupMessages.set(conversationID, [...messageList, ...currentMessageList]);
          this.messages.set(conversationType, this.groupMessages);
        }
        currentMessageList = (_this$messages$get2 = this.messages.get(conversationType)) === null || _this$messages$get2 === void 0 ? void 0 : _this$messages$get2.get(conversationID);
      }
      return currentMessageList;
    }).catch(err => {
      console.log('load more history message err', err);
      return err;
    });
  }
  sendTextMessage(conversationID, conversationType, text, onMessageSent) {
    var _this$messages$get3;
    const message = {
      conversationID,
      conversationType,
      message: text,
      type: 1
    };
    const callbackMessage = this.preMessageSendingCallback ? this.preMessageSendingCallback(message) : null;
    const toConversationID = conversationID;
    const config = {
      priority: 1,
      pushConfig: {
        title: conversationID,
        content: callbackMessage ? callbackMessage.message : message.message,
        extendedData: '...'
      }
    };
    const messageTextObj = {
      type: 1,
      message: callbackMessage ? callbackMessage.message : message.message
    };
    let messageList = (_this$messages$get3 = this.messages.get(conversationType)) === null || _this$messages$get3 === void 0 ? void 0 : _this$messages$get3.get(conversationID);
    const _this = this;
    const notification = {
      onMessageAttached: function (message) {
        messageList && messageList.push(message);
        _this.messageListChangedCallback(conversationID, conversationType, messageList);
      }
    };
    return _zegoZimReactNative.default.getInstance().sendMessage(messageTextObj, toConversationID, conversationType, config, notification).then(({
      message
    }) => {
      console.log('send message success', message);
      // let msg = messageList.filter(
      //   (item) => item.messageID === message.messageID
      // )[0];
      // msg = message;
    }).catch(err => {
      console.log('send message err', err);
      messageList.forEach(message => {
        if (!message.sentStatus) {
          message.sentStatus = 2;
        }
      });
    }).finally(() => {
      this.messageListChangedCallback(conversationID, conversationType, messageList);
    });
  }
}
exports.default = ZIMKitMessageCore;
//# sourceMappingURL=ZIMKitMessageCore.js.map