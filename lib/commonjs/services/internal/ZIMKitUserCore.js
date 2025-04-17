"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zegoZimReactNative = _interopRequireDefault(require("zego-zim-react-native"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ZIMKitUserCore {
  constructor() {
    this.userInfo = {};
  }
  static getInstance() {
    return this.instance || (this.instance = new ZIMKitUserCore());
  }
  connectUser(userInfo, token) {
    return _zegoZimReactNative.default.getInstance().login(userInfo, token).then(zimResult => {
      this.queryUser(userInfo.userID).then(data => {
        const currentUser = {
          ...userInfo,
          userAvatarUrl: data.userList[0].userAvatarUrl
        };
        this.userInfo = currentUser;
      });
      console.log('zim login success');
      return zimResult;
    }).catch(err => {
      console.log('zim login err', err);
      return err;
    });
  }
  disconnectUser() {
    return _zegoZimReactNative.default.getInstance().logout();
  }
  queryUser(userID) {
    const userIDs = [userID];
    return _zegoZimReactNative.default.getInstance().queryUsersInfo(userIDs, {
      isQueryFromServer: false
    }).then(({
      userList,
      errorUserList
    }) => {
      console.log('query users info success', userList, errorUserList);
      return {
        userList,
        errorUserList
      };
    }).catch(err => {
      console.log('query users info err', err);
      return err;
    });
  }
}
exports.default = ZIMKitUserCore;
//# sourceMappingURL=ZIMKitUserCore.js.map