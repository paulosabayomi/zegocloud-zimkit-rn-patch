"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitGroupCore {
  constructor() {}
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitGroupCore());
  }
  createGroup(name, userIDs, optional) {
    const groupInfo = {
      groupID: optional ? optional.groupID : '',
      groupName: name,
      groupAvatarUrl: ''
    };
    const config = {
      groupNotice: '',
      groupAttributes: {}
    };
    return _zegoZimReactNative.default.getInstance().createGroup(groupInfo, userIDs, config).then(({
      groupInfo,
      userList,
      errorUserList
    }) => {
      console.log('create group success', groupInfo, userList, errorUserList);
      return {
        groupInfo,
        userList,
        errorUserList
      };
    }).catch(err => {
      console.log('create group err', err);
      return err;
    });
  }
  joinGroup(conversationID) {
    const groupID = conversationID;
    return _zegoZimReactNative.default.getInstance().joinGroup(groupID).then(({
      groupInfo
    }) => {
      console.log('join group success', groupInfo);
      return {
        groupInfo
      };
    }).catch(err => {
      console.log('join group err', err);
      return err;
    });
  }
  leaveGroup(conversationID) {
    const groupID = conversationID;
    return _zegoZimReactNative.default.getInstance().leaveGroup(groupID).then(({
      groupID
    }) => {
      console.log('leave group success', groupID);
      return {
        groupID
      };
    }).catch(err => {
      console.log('leave group err', err);
      return err;
    });
  }
  async queryGroupMemberInfo(userID, conversationID) {
    return await _zegoZimReactNative.default.getInstance().queryGroupMemberInfo(userID, conversationID).then(({
      groupID,
      userInfo
    }) => {
      console.log('query group member info success', groupID, userInfo);
      return {
        groupID,
        userInfo
      };
    }).catch(err => {
      console.log('query group member info err', err);
      return err;
    });
  }
}
exports.default = ZIMKitGroupCore;
//# sourceMappingURL=ZIMKitGroupCore.js.map