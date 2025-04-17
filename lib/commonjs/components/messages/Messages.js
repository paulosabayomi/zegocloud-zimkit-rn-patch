"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _TextMessage = _interopRequireDefault(require("./TextMessage"));
var _Avatar = _interopRequireDefault(require("../common/Avatar"));
var _dateFormat = require("../../utils/dateFormat");
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../index");
var _reactDelegateComponent = _interopRequireDefault(require("react-delegate-component"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Messages(props) {
  const {
    index,
    item,
    conversationID,
    conversationType,
    messageList,
    itemBuilder
  } = props;
  const {
    senderUserID,
    message,
    type,
    timestamp,
    sentStatus,
    userInfo
  } = item;
  const [time, setTime] = (0, _react.useState)('');
  const [currentUser, setCurrentUser] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    setCurrentUser(_index.ZIMKit.currentUser());
    setTime(messageDateFormat(timestamp, index));
  }, []);
  const messageDateFormat = (timestamp, index) => {
    if (!timestamp) {
      return;
    }
    if (index === 0) {
      return (0, _dateFormat.dateFormat)(timestamp, true);
    } else {
      const previousMessage = messageList[index - 1];
      if (previousMessage && timestamp - previousMessage.timestamp > 300000) {
        return (0, _dateFormat.dateFormat)(timestamp, true);
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, itemBuilder ? /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: itemBuilder
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, time ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.timeBox
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.time
  }, time)) : null, senderUserID !== currentUser.userID ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.leftMsg
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.avatar
  }, userInfo !== null && userInfo !== void 0 && userInfo.memberAvatarUrl ? /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    url: userInfo.memberAvatarUrl
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.image,
    source: require('../resources/avatar-default.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.name,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.userName), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.msgContent
  }, type === 1 ? /*#__PURE__*/_react.default.createElement(_TextMessage.default, {
    text: message,
    backgroundColor: "white"
  }) : null))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.rightMsg
  }, sentStatus === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.loading
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null)) : null, sentStatus === 2 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.error
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.icon,
    source: require('../resources/send-fail-icon.png')
  })) : null, type === 1 ? /*#__PURE__*/_react.default.createElement(_TextMessage.default, {
    text: message,
    backgroundColor: "#3478fc",
    color: "white"
  }) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.avatar
  }, currentUser.userAvatarUrl ? /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    url: currentUser.userAvatarUrl
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.image,
    source: require('../resources/avatar-default.png')
  })))));
}
const style = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  timeBox: {
    alignSelf: 'center',
    marginBottom: 16
  },
  time: {
    fontSize: 12,
    color: '#b1b4bb'
  },
  leftMsg: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 16
  },
  rightMsg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 16
  },
  content: {
    flex: 1
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatar: {
    marginLeft: 12,
    marginRight: 12
  },
  image: {
    width: 44,
    height: 44
  },
  name: {
    marginBottom: 2,
    maxWidth: '80%'
  },
  msgContent: {
    flex: 1,
    flexDirection: 'row'
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  icon: {
    width: 20,
    height: 20
  }
});
var _default = exports.default = Messages;
//# sourceMappingURL=Messages.js.map