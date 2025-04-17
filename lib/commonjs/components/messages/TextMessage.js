"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function TextMessages(props) {
  const {
    text,
    backgroundColor,
    color
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [style.text, {
      color
    }]
  }, text));
}
const style = _reactNative.StyleSheet.create({
  container: {
    maxWidth: '60%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 15
  }
});
var _default = exports.default = TextMessages;
//# sourceMappingURL=TextMessage.js.map