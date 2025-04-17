"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _index = require("../index");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function MessageInput(props) {
  const {
    conversationID,
    conversationType,
    onFocus,
    onBlur,
    preMessageSending,
    showPickFileButton
  } = props;
  const [value, onChangeText] = (0, _react.useState)('');
  const [defaultInputHeight, setDefaultInputHeight] = (0, _react.useState)(0);
  const [textInputHeight, setTextInputHeight] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    _index.ZIMKit.onPreMessageSending(preMessageSending);
  }, []);
  const sendMessage = () => {
    if (value) {
      onChangeText('');
      setTextInputHeight(defaultInputHeight);
      _index.ZIMKit.sendTextMessage(conversationID, conversationType, value);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.inputBox, {
      height: textInputHeight
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: style.input,
    onChangeText: text => onChangeText(text),
    value: value,
    onFocus: onFocus,
    onBlur: onBlur,
    multiline: true,
    onContentSizeChange: ({
      nativeEvent: {
        contentSize: {
          width,
          height
        }
      }
    }) => {
      var h = height;
      if (!defaultInputHeight) {
        setDefaultInputHeight(h);
      }
      if (_reactNative.Platform.OS == 'ios') {
        h = height + 25;
      }
      setTextInputHeight(h);
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.iconBox
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: sendMessage
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.icon,
    source: require('./resources/icon-send.png')
  }))));
}
const style = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputBox: {
    flex: 1,
    marginRight: 10
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    borderRadius: 8,
    backgroundColor: '#f4f1f2'
  },
  iconBox: {},
  icon: {
    width: 34,
    height: 34
  }
});
var _default = exports.default = MessageInput;
//# sourceMappingURL=MessageInput.js.map