"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
var _ZIMKitConversationCore = _interopRequireDefault(require("./ZIMKitConversationCore"));
var _ZIMKitMessageCore = _interopRequireDefault(require("./ZIMKitMessageCore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitEventHandler {
  constructor() {}
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitEventHandler());
  }
  initEventHandler() {
    this.onError();
    this.onConnectionStateChanged();
    this.onConversationChanged();
    this.onReceivePeerMessage();
    this.onReceiveGroupMessage();
  }
  unInitEventHandler() {
    this.offError();
    this.offConnectionStateChanged();
    this.offConversationChanged();
    this.offReceivePeerMessage();
    this.offReceiveGroupMessage();
  }
  onError(callback) {
    _zegoZimReactNative.default.getInstance().on('error', callback ? callback : (zim, errorInfo) => {
      console.log('error', errorInfo, zim);
    });
  }
  offError() {
    _zegoZimReactNative.default.getInstance().off('error');
  }
  onConnectionStateChanged() {
    _zegoZimReactNative.default.getInstance().on('connectionStateChanged', (zim, zimResult) => {
      console.log('zim connectionStateChanged', zimResult);
    });
  }
  offConnectionStateChanged() {
    _zegoZimReactNative.default.getInstance().off('connectionStateChanged');
  }
  onConversationChanged() {
    _zegoZimReactNative.default.getInstance().on('conversationChanged', (zim, zimResult) => {
      zimResult.infoList.forEach(info => {
        switch (info.event) {
          case 1:
            // update
            let conversation = _ZIMKitConversationCore.default.getInstance().getConversation(info.conversation.conversationID, info.conversation.type);
            if (conversation) {
              Object.assign(conversation, info.conversation);
            }
            break;
          case 0:
            // add
            _ZIMKitConversationCore.default.getInstance().conversationList.push(info.conversation);
            break;
          case 2:
            // disabled (leave group)
            break;
        }
      });
      _ZIMKitConversationCore.default.getInstance().conversationListChangedCallback(_ZIMKitConversationCore.default.getInstance().conversationList);
    });
  }
  offConversationChanged() {
    _zegoZimReactNative.default.getInstance().off('conversationChanged');
  }
  onReceivePeerMessage() {
    _zegoZimReactNative.default.getInstance().on('receivePeerMessage', (zim, zimResult) => {
      console.log('===messages', _ZIMKitMessageCore.default.getInstance().messages);
      if (_ZIMKitMessageCore.default.getInstance().messages) {
        var _ZIMKitMessageCore$ge;
        let messageList = (_ZIMKitMessageCore$ge = _ZIMKitMessageCore.default.getInstance().messages.get(0)) === null || _ZIMKitMessageCore$ge === void 0 ? void 0 : _ZIMKitMessageCore$ge.get(zimResult.fromConversationID);
        console.log('receivePeerMessage', zimResult.messageList, zimResult.fromConversationID);
        zimResult.messageList.forEach(message => {
          if (messageList && !messageList.some(item => item.messageID === message.messageID)) {
            messageList.push(message);
          }
        });
        _ZIMKitMessageCore.default.getInstance().messageListChangedCallback(zimResult.fromConversationID, 0, messageList);
      }
    });
  }
  offReceivePeerMessage() {
    _zegoZimReactNative.default.getInstance().off('receivePeerMessage');
  }
  onReceiveGroupMessage() {
    _zegoZimReactNative.default.getInstance().on('receiveGroupMessage', (zim, zimResult) => {
      if (_ZIMKitMessageCore.default.getInstance().messages) {
        var _ZIMKitMessageCore$ge2;
        let messageList = (_ZIMKitMessageCore$ge2 = _ZIMKitMessageCore.default.getInstance().messages.get(2)) === null || _ZIMKitMessageCore$ge2 === void 0 ? void 0 : _ZIMKitMessageCore$ge2.get(zimResult.fromConversationID);
        console.log('receiveGroupMessage', zimResult.messageList, zimResult.fromConversationID);
        zimResult.messageList.forEach(message => {
          if (messageList && !messageList.some(item => item.messageID === message.messageID)) {
            messageList.push(message);
          }
        });
        _ZIMKitMessageCore.default.getInstance().messageListChangedCallback(zimResult.fromConversationID, 2, messageList);
      }
    });
  }
  offReceiveGroupMessage() {
    _zegoZimReactNative.default.getInstance().off('receiveGroupMessage');
  }
}
exports.default = ZIMKitEventHandler;
//# sourceMappingURL=ZIMKitEventHandler.js.map