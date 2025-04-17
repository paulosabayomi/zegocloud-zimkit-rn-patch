"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _reactDelegateComponent = _interopRequireDefault(require("react-delegate-component"));
var _Avatar = _interopRequireDefault(require("./common/Avatar"));
var _dateFormat = require("../utils/dateFormat");
var _index = require("../index");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Conversation(props) {
  const {
    conversationID,
    conversationName,
    conversationType,
    conversationAvatarUrl,
    lastMessage,
    lastMessageBuilder,
    lastMessageTimeBuilder,
    onPressed,
    onLongPress,
    unreadMessageCount
  } = props;
  const [menuVisible, setMenuVisible] = (0, _react.useState)(false);
  const [menuLocationX, setMenuLocationX] = (0, _react.useState)(0);
  const [menuLocationY, setMenuLocationY] = (0, _react.useState)(0);
  const defaultOnLongPress = event => {
    setMenuVisible(true);
    console.log('defaultOnLongPress', conversationID, conversationName);
  };
  const onMenuMaskPress = () => {
    console.log('onMenuMaskPress');
    setMenuVisible(!menuVisible);
  };
  const onDeletePress = () => {
    console.log('onDeletePress');
    setMenuVisible(!menuVisible);
    _reactNative.Alert.alert('Confirm', 'Do you want to delete this conversation?', [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
        _index.ZIMKit.deleteConversation(conversationID, conversationType);
      }
    }]);
  };
  const onQuitPress = () => {
    console.log('onQuitPress');
    setMenuVisible(!menuVisible);
    _reactNative.Alert.alert('Confirm', 'Do you want to leave this group?', [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
        _index.ZIMKit.leaveGroup(conversationID);
      }
    }]);
  };
  const onCancelPress = () => {
    console.log('onCancelPress');
    setMenuVisible(!menuVisible);
  };
  const onConversationPressed = () => {
    _index.ZIMKit.clearUnreadCount(conversationID, conversationType);
    const props = {
      conversationID,
      conversationName,
      conversationType,
      conversationAvatarUrl
    };
    onPressed(props);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onConversationPressed,
    onLongPress: onLongPress ? onLongPress : defaultOnLongPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.conversationItem
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.avatar
  }, unreadMessageCount ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.unreadBox
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.unreadMessage
  }, unreadMessageCount > 99 ? '99+' : unreadMessageCount)) : null, conversationType === 0 ? conversationAvatarUrl ? /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    url: conversationAvatarUrl
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.image,
    source: require('./resources/avatar-default.png')
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.image,
    source: require('./resources/avatar-group.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.itemContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.main
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, conversationName ? conversationName : conversationType === 0 ? 'Chat' : 'Group Chat'), !lastMessageBuilder ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.message,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.message) : /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: lastMessageBuilder
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.timeBox
  }, !lastMessageTimeBuilder ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.timeText
  }, lastMessage !== null && lastMessage !== void 0 && lastMessage.timestamp ? (0, _dateFormat.dateFormat)(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.timestamp) : '') : /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: lastMessageTimeBuilder
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    visible: menuVisible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onMenuMaskPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.modalMask
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.modalView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onDeletePress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.modalItem, style.borderBottom]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.text
  }, "Delete"))), conversationType === 2 ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onQuitPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.modalItem, style.borderBottom]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.text
  }, "Quit"))) : null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onCancelPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.modalItem
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.text, {
      color: 'red'
    }]
  }, "Cancel")))))));
}
const style = _reactNative.StyleSheet.create({
  conversationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 68,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8'
  },
  unreadBox: {
    position: 'absolute',
    zIndex: 2,
    top: -6,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 100
  },
  unreadMessage: {
    color: 'white',
    fontSize: 10
  },
  avatar: {
    marginRight: 10
  },
  image: {
    width: 44,
    height: 44
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    height: 68
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    maxWidth: 155,
    color: '#b1b4bb'
  },
  timeBox: {
    justifyContent: 'center'
  },
  timeText: {
    color: '#b8b8b8'
  },
  modalMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalView: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20
  },
  modalItem: {
    paddingTop: 8,
    paddingBottom: 8
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8'
  }
});
var _default = exports.default = Conversation;
//# sourceMappingURL=Conversation.js.map