"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
var _ZIMKitEventHandler = _interopRequireDefault(require("./ZIMKitEventHandler"));
var _ZIMKitUserCore = _interopRequireDefault(require("./ZIMKitUserCore"));
var _ZIMKitConversationCore = _interopRequireDefault(require("./ZIMKitConversationCore"));
var _ZIMKitMessageCore = _interopRequireDefault(require("./ZIMKitMessageCore"));
var _ZIMKitGroupCore = _interopRequireDefault(require("./ZIMKitGroupCore"));
var _ZIMKitPlugins = _interopRequireDefault(require("./ZIMKitPlugins"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitCore {
  constructor() {}
  appInfo = {};
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitCore());
  }
  init(appID, appSign, plugins) {
    this.appInfo = {
      appID,
      appSign
    };
    _zegoZimReactNative.default.create({
      appID,
      appSign
    });
    _zegoZimReactNative.default.getVersion().then(data => {
      console.log('zim version:', data);
    });
    _ZIMKitEventHandler.default.getInstance().initEventHandler();
    _ZIMKitPlugins.default.getInstance().installPlugins(plugins);
  }
  unInit() {
    _zegoZimReactNative.default.getInstance().destroy();
    _ZIMKitEventHandler.default.getInstance().unInitEventHandler();
  }

  // user
  connectUser(userInfo, token) {
    return _ZIMKitUserCore.default.getInstance().connectUser(userInfo, token).then(zimResult => {
      // try {
      //   ZIMKitPlugins.getInstance().initPlugins(this.appInfo, userInfo, token);
      // } catch (error) {
      //   console.error('initPlugins failed', error);
      // }
      return zimResult;
    });
  }
  disconnectUser() {
    return _ZIMKitUserCore.default.getInstance().disconnectUser();
  }
  queryUser(userID) {
    return _ZIMKitUserCore.default.getInstance().queryUser(userID);
  }
  currentUser() {
    return _ZIMKitUserCore.default.getInstance().userInfo;
  }

  // conversation
  getConversationList() {
    return _ZIMKitConversationCore.default.getInstance().getConversationList();
  }
  onConversationListChanged(callback) {
    return _ZIMKitConversationCore.default.getInstance().onConversationListChanged(callback);
  }
  getConversation(conversationID, conversationType) {
    return _ZIMKitConversationCore.default.getInstance().getConversation(conversationID, conversationType);
  }
  deleteConversation(conversationID, conversationType) {
    return _ZIMKitConversationCore.default.getInstance().deleteConversation(conversationID, conversationType);
  }
  clearUnreadCount(conversationID, conversationType) {
    return _ZIMKitConversationCore.default.getInstance().clearUnreadCount(conversationID, conversationType);
  }
  loadMoreConversation() {
    return _ZIMKitConversationCore.default.getInstance().loadMoreConversation();
  }

  // message
  getMessageList(conversationID, conversationType) {
    return _ZIMKitMessageCore.default.getInstance().getMessageList(conversationID, conversationType);
  }
  onMessageListChanged(callback) {
    return _ZIMKitMessageCore.default.getInstance().onMessageListChanged(callback);
  }
  offMessageListChanged() {
    return _ZIMKitMessageCore.default.getInstance().offMessageListChanged();
  }
  onPreMessageSending(callback) {
    return _ZIMKitMessageCore.default.getInstance().onPreMessageSending(callback);
  }
  loadMoreMessage(conversationID, conversationType) {
    return _ZIMKitMessageCore.default.getInstance().loadMoreMessage(conversationID, conversationType);
  }
  sendTextMessage(conversationID, conversationType, text, onMessageSent) {
    return _ZIMKitMessageCore.default.getInstance().sendTextMessage(conversationID, conversationType, text, onMessageSent);
  }

  // group
  createGroup(name, userIDs, optional) {
    return _ZIMKitGroupCore.default.getInstance().createGroup(name, userIDs, optional);
  }
  joinGroup(conversationID) {
    return _ZIMKitGroupCore.default.getInstance().joinGroup(conversationID);
  }
  leaveGroup(conversationID) {
    return _ZIMKitGroupCore.default.getInstance().leaveGroup(conversationID);
  }
  queryGroupMemberInfo(userID, conversationID) {
    return _ZIMKitGroupCore.default.getInstance().queryGroupMemberInfo(userID, conversationID);
  }
}
exports.default = ZIMKitCore;
//# sourceMappingURL=ZIMKitCore.js.map