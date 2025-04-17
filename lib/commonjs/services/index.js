"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ZIMKitCore = _interopRequireDefault(require("./internal/ZIMKitCore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKit {
  constructor() {
    if (!ZIMKit.instance) {
      ZIMKit.instance = this;
    }
    return ZIMKit.instance;
  }
  static getInstance() {
    if (!ZIMKit.instance) {
      ZIMKit.instance = new ZIMKit();
    }
    return ZIMKit.instance;
  }
  getModuleName() {
    return 'ZIMKit';
  }
  init(appID, appSign, plugins) {
    return _ZIMKitCore.default.getInstance().init(appID, appSign, plugins);
  }
  unInit() {
    _ZIMKitCore.default.getInstance().unInit();
  }

  // user
  connectUser(userInfo, token) {
    return _ZIMKitCore.default.getInstance().connectUser(userInfo, token);
  }
  disconnectUser() {
    return _ZIMKitCore.default.getInstance().disconnectUser();
  }
  currentUser() {
    return _ZIMKitCore.default.getInstance().currentUser();
  }
  queryUser(userID) {
    return _ZIMKitCore.default.getInstance().queryUser(userID);
  }

  // conversation
  getConversationList() {
    return _ZIMKitCore.default.getInstance().getConversationList();
  }
  onConversationListChanged(callback) {
    return _ZIMKitCore.default.getInstance().onConversationListChanged(callback);
  }
  deleteConversation(conversationID, conversationType) {
    return _ZIMKitCore.default.getInstance().deleteConversation(conversationID, conversationType);
  }
  clearUnreadCount(conversationID, conversationType) {
    return _ZIMKitCore.default.getInstance().clearUnreadCount(conversationID, conversationType);
  }
  loadMoreConversation() {
    return _ZIMKitCore.default.getInstance().loadMoreConversation();
  }

  // message
  getMessageList(conversationID, conversationType) {
    return _ZIMKitCore.default.getInstance().getMessageList(conversationID, conversationType);
  }
  onMessageListChanged(callback) {
    return _ZIMKitCore.default.getInstance().onMessageListChanged(callback);
  }
  offMessageListChanged() {
    return _ZIMKitCore.default.getInstance().offMessageListChanged();
  }
  onPreMessageSending(callback) {
    return _ZIMKitCore.default.getInstance().onPreMessageSending(callback);
  }
  loadMoreMessage(conversationID, conversationType) {
    return _ZIMKitCore.default.getInstance().loadMoreMessage(conversationID, conversationType);
  }
  sendTextMessage(conversationID, conversationType, text, onMessageSent) {
    return _ZIMKitCore.default.getInstance().sendTextMessage(conversationID, conversationType, text, onMessageSent);
  }

  // group
  createGroup(name, userIDs, optional) {
    return _ZIMKitCore.default.getInstance().createGroup(name, userIDs, optional);
  }
  joinGroup(conversationID) {
    return _ZIMKitCore.default.getInstance().joinGroup(conversationID);
  }
  leaveGroup(conversationID) {
    return _ZIMKitCore.default.getInstance().leaveGroup(conversationID);
  }
  queryGroupMemberInfo(userID, conversationID) {
    return _ZIMKitCore.default.getInstance().queryGroupMemberInfo(userID, conversationID);
  }
}
exports.default = ZIMKit;
//# sourceMappingURL=index.js.map