"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _index = require("../index");
var _react = _interopRequireWildcard(require("react"));
var _Messages = _interopRequireDefault(require("./messages/Messages"));
var _reactDelegateComponent = _interopRequireDefault(require("react-delegate-component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function MessageList(props) {
  const {
    conversationID,
    conversationType,
    isInputFocus,
    // Internal use
    itemBuilder,
    loadingBuilder,
    errorBuilder
  } = props;
  const [messageList, setMessageList] = (0, _react.useState)([]);
  const flatListRef = (0, _react.useRef)(null);
  const [isRefreshing, setIsRefreshing] = (0, _react.useState)(false);
  const [hasError, setHasError] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  let groupMemberInfoList = [];
  (0, _react.useEffect)(() => {
    if (isInputFocus) {
      setTimeout(() => {
        var _flatListRef$current;
        (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToEnd();
      }, 200);
    }
  }, [isInputFocus]);
  (0, _react.useEffect)(() => {
    setIsLoading(true);
    _index.ZIMKit.getMessageList(conversationID, conversationType).then(data => {
      setIsLoading(false);
      if (!data.code) {
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        // scroll to end
        setTimeout(() => {
          var _flatListRef$current2;
          (_flatListRef$current2 = flatListRef.current) === null || _flatListRef$current2 === void 0 || _flatListRef$current2.scrollToEnd();
        }, 200);
        setHasError(false);
        if (conversationType === 2) {
          getGroupMemberInfoList(data);
        }
      } else {
        console.log('get message list err', data);
        setHasError(true);
      }
    });
    _index.ZIMKit.onMessageListChanged((id, type, messageList) => {
      if (conversationID === id && conversationType === type) {
        const data = [...messageList];
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        // clear unread count
        _index.ZIMKit.clearUnreadCount(id, type);
        // scroll to end
        setTimeout(() => {
          var _flatListRef$current3;
          (_flatListRef$current3 = flatListRef.current) === null || _flatListRef$current3 === void 0 || _flatListRef$current3.scrollToEnd();
        }, 200);
        if (conversationType === 2) {
          getGroupMemberInfoList(data);
        }
      }
    });
    return () => {
      // clear subscription
      _index.ZIMKit.offMessageListChanged();
    };
  }, []);
  const getGroupMemberInfoList = async messageList => {
    let memberIDs = [];
    messageList.forEach(msg => {
      if (!memberIDs.some(item => item === msg.senderUserID)) {
        memberIDs.push(msg.senderUserID);
      }
    });
    memberIDs.forEach(async (id, index) => {
      await _index.ZIMKit.queryGroupMemberInfo(id, conversationID).then(data => {
        groupMemberInfoList.push(data.userInfo);
        messageList.forEach(msg => {
          if (msg.senderUserID === id) {
            msg.userInfo = data.userInfo;
          }
        });
        setMessageList([...messageList]);
      });
    });
  };
  const refresh = () => {
    setIsRefreshing(true);
    _index.ZIMKit.loadMoreMessage(conversationID, conversationType).then(data => {
      if (!data.code) {
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        setIsRefreshing(false);
      } else {
        console.log('load more message', data);
      }
    });
  };
  const defaultLoadingBuilder = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.loadingView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null));
  };
  const defaultErrorBuilder = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.errorView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "error view"));
  };
  const renderItem = ({
    item,
    index
  }) => /*#__PURE__*/_react.default.createElement(_Messages.default, {
    index: index,
    item: item,
    conversationID: conversationID,
    conversationType: conversationType,
    messageList: messageList,
    itemBuilder: itemBuilder
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: loadingBuilder ? loadingBuilder : defaultLoadingBuilder
  }) : !hasError ? messageList.length ? /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    contentContainerStyle: {
      paddingTop: 16
    },
    ref: flatListRef,
    data: messageList,
    renderItem: renderItem,
    keyExtractor: item => item.localMessageID,
    refreshing: isRefreshing,
    onRefresh: refresh
  }) : null : /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: errorBuilder ? errorBuilder : defaultErrorBuilder
  }));
}
const style = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f1f4'
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
var _default = exports.default = MessageList;
//# sourceMappingURL=MessageList.js.map