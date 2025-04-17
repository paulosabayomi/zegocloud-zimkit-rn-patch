"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConversationList", {
  enumerable: true,
  get: function () {
    return _ConversationList.default;
  }
});
Object.defineProperty(exports, "MessageInput", {
  enumerable: true,
  get: function () {
    return _MessageInput.default;
  }
});
Object.defineProperty(exports, "MessageList", {
  enumerable: true,
  get: function () {
    return _MessageList.default;
  }
});
Object.defineProperty(exports, "MessageListPage", {
  enumerable: true,
  get: function () {
    return _MessageListPage.default;
  }
});
exports.ZIMKit = void 0;
var _index = _interopRequireDefault(require("./services/index"));
var _ConversationList = _interopRequireDefault(require("./components/ConversationList"));
var _MessageListPage = _interopRequireDefault(require("./pages/MessageListPage"));
var _MessageList = _interopRequireDefault(require("./components/MessageList"));
var _MessageInput = _interopRequireDefault(require("./components/MessageInput"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { NativeModules, Platform } from 'react-native';

const ZIMKit = exports.ZIMKit = _index.default.getInstance();
//# sourceMappingURL=index.js.map