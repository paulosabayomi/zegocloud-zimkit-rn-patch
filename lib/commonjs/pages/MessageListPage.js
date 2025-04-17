"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _MessageList = _interopRequireDefault(require("../components/MessageList"));
var _reactNative = require("react-native");
var _MessageInput = _interopRequireDefault(require("../components/MessageInput"));
var _react = _interopRequireWildcard(require("react"));
var _reactDelegateComponent = _interopRequireDefault(require("react-delegate-component"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import ZIMKitPlugins from "../services/internal/ZIMKitPlugins";

function MessageListPage(props) {  
  const {
    route
  } = props;
  const {
    params
  } = route;
  const {
    conversationID,
    conversationName,
    conversationType,
    itemBuilder,
    loadingBuilder,
    errorBuilder,
    preMessageSending,
    appBarActions
  } = params;
  const [isInputFocus, setIsInputFocus] = (0, _react.useState)(false);

  // let ZegoSendCallInvitationButton;
  // const ZegoPrebuiltCallPlugin = ZIMKitPlugins.getInstance().getZegoPrebuiltCallPlugin();
  // if (ZegoPrebuiltCallPlugin) {
  //   ZegoSendCallInvitationButton = ZegoPrebuiltCallPlugin.ZegoSendCallInvitationButton;
  // }

  const onInputFocus = () => {
    setIsInputFocus(true);
  };
  const onInputBlur = () => {
    setIsInputFocus(false);
  };
  const onGoBackPress = () => {
    console.log('===goback', appBarActions);
    appBarActions.forEach(item => {
      if (item.icon === 'goBack') {
        item.onPressed();
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.topBar
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.icon
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onGoBackPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('./resources/icon-goback.png'),
    style: style.goBack
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: style.topBarTitle
  }, `${conversationName ? conversationName : conversationType === 0 ? 'Chat' : 'Group Chat'}(${conversationID})`), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.callContainer
  }, params.appBarActions[1] ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.audioCall
  }, /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: params.appBarActions[1]
  })) : null, params.appBarActions[2] ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.videoCall
  }, /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: params.appBarActions[2]
  })) : null)), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    behavior: Platform.OS == 'ios' ? 'padding' : null,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_react.default.createElement(_MessageList.default, {
    conversationID: conversationID,
    conversationType: conversationType,
    isInputFocus: isInputFocus,
    itemBuilder: itemBuilder,
    loadingBuilder: loadingBuilder,
    errorBuilder: errorBuilder
  }), /*#__PURE__*/_react.default.createElement(_MessageInput.default, {
    conversationID: conversationID,
    conversationType: conversationType,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
    preMessageSending: preMessageSending
  })));
}
const style = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topBar: {
    height: 50
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  goBack: {
    width: 36,
    height: 36
  },
  topBarTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50
  },
  callContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  audioCall: {
    marginRight: 5
  },
  videoCall: {
    marginRight: 5
  }
});
var _default = exports.default = MessageListPage;
//# sourceMappingURL=MessageListPage.js.map