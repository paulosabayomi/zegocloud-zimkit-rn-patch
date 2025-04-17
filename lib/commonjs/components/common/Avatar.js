"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Avatar(props) {
  const {
    url
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.avatarBox
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: style.image,
    source: {
      uri: url
    }
  }));
}
const style = _reactNative.StyleSheet.create({
  avatarBox: {
    flex: 1
  },
  image: {
    width: 44,
    height: 44
  }
});
var _default = exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map