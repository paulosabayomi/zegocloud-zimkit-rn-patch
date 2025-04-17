"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitConversationCore {
  constructor() {
    this.conversationList = [];
    this.conversationListChangedCallback = null;
    this.conversationCount = 20;
  }
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitConversationCore());
  }
  getConversationList() {
    const config = {
      // Session anchor point, which indicates that the query starts from the latest
      nextConversation: null,
      count: this.conversationCount
    };
    return _zegoZimReactNative.default.getInstance().queryConversationList(config).then(({
      conversationList
    }) => {
      this.conversationList = conversationList;
      console.log('zim query conversation list success');
      return this.conversationList;
    }).catch(err => {
      console.log('zim query conversation list err', err);
      return err;
    });
  }
  onConversationListChanged(callback) {
    if (typeof callback !== 'function') {
      return;
    } else {
      this.conversationListChangedCallback = callback;
    }
  }
  getConversation(conversationID, conversationType) {
    return this.conversationList.filter(item => item.conversationID === conversationID && item.type === conversationType)[0];
  }
  deleteConversation(conversationID, conversationType) {
    var config = {
      isAlsoDeleteServerConversation: true
    };
    return _zegoZimReactNative.default.getInstance().deleteConversation(conversationID, conversationType, config).then(() => {
      console.log('delete cv success');
      const index = this.conversationList.findIndex(item => item.conversationID === conversationID && item.type === conversationType);
      let indexArr = [];
      indexArr.push(index);
      this.conversationList = this.conversationList.filter((item, index) => {
        return !indexArr.includes(index);
      });
      this.conversationListChangedCallback(this.conversationList);
    }).catch(err => {
      console.log('delete cv err', err);
      return err;
    });
  }
  clearUnreadCount(conversationID, conversationType) {
    return _zegoZimReactNative.default.getInstance().clearConversationUnreadMessageCount(conversationID, conversationType);
  }
  loadMoreConversation() {
    const config = {
      nextConversation: this.conversationList[this.conversationList.length - 1],
      count: this.conversationCount
    };
    return _zegoZimReactNative.default.getInstance().queryConversationList(config).then(({
      conversationList
    }) => {
      conversationList.forEach(item => {
        this.conversationList.push(item);
      });
      console.log('zim load more conversation list success', conversationList);
      return this.conversationList;
    }).catch(err => {
      console.log('zim query conversation list err', err);
      return err;
    });
  }
}
exports.default = ZIMKitConversationCore;
//# sourceMappingURL=ZIMKitConversationCore.js.map