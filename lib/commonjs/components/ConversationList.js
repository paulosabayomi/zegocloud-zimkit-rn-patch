"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _Conversation = _interopRequireDefault(require("./Conversation"));
var _react = _interopRequireWildcard(require("react"));
var _reactDelegateComponent = _interopRequireDefault(require("react-delegate-component"));
var _index = require("../index");
var _ZIMKitConversationCore = _interopRequireDefault(require("../services/internal/ZIMKitConversationCore"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ConversationList(props) {
  const {
    filter,
    sorter,
    onPressed,
    onLongPress,
    errorBuilder,
    emptyBuilder,
    loadingBuilder,
    lastMessageBuilder,
    lastMessageTimeBuilder,
    itemBuilder
  } = props;
  const [conversationList, setConversationList] = (0, _react.useState)([]);
  const [isFilter, setIsFilter] = (0, _react.useState)(false);
  const [filteredList, setFilteredList] = (0, _react.useState)([]);
  const [hasError, setHasError] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (typeof filter === 'function') {
      const filteredList = filter(conversationList);
      setFilteredList(filteredList);
      if (filteredList !== conversationList) {
        setIsFilter(true);
      }
    }
  }, [filter]);
  (0, _react.useEffect)(() => {
    setIsLoading(true);
    _index.ZIMKit.getConversationList().then(data => {
      setIsLoading(false);
      if (!data.code) {
        let sortedList = [];
        if (sorter) {
          sortedList = sorter(data);
        } else {
          sortedList = defaultSorter(data);
        }
        setConversationList(sortedList);
        setHasError(false);
      } else {
        setHasError(true);
      }
    });
    _index.ZIMKit.onConversationListChanged(conversationList => {
      const data = [...conversationList];
      let sortedList = [];
      if (sorter) {
        sortedList = sorter(data);
      } else {
        sortedList = defaultSorter(data);
      }
      setConversationList(sortedList);
      _ZIMKitConversationCore.default.getInstance().conversationList = sortedList;
    });
  }, []);
  const defaultSorter = conversationList => {
    const sortedConversationList = conversationList.sort((a, b) => b.orderKey - a.orderKey);
    return sortedConversationList;
  };
  const defaultFilter = conversationName => {
    const filteredList = conversationList.filter(item => item.conversationName === conversationName);
    return filteredList;
  };
  const defaultErrorBuilder = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.errorView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "error view"));
  };
  const defaultEmptyBuilder = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.emptyView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "No conversation yet"));
  };
  const defaultLoadingBuilder = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: style.loadingView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null));
  };
  const onScrollToEnd = () => {
    if (conversationList.length >= 20) {
      _index.ZIMKit.loadMoreConversation();
    }
  };
  const renderItem = ({
    item
  }) => itemBuilder ? /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: itemBuilder,
    props: {
      item
    }
  }) : /*#__PURE__*/_react.default.createElement(_Conversation.default, {
    conversationID: item.conversationID,
    conversationName: item.conversationName,
    conversationType: item.type,
    conversationAvatarUrl: item.conversationAvatarUrl,
    lastMessage: item.lastMessage,
    lastMessageBuilder: lastMessageBuilder,
    lastMessageTimeBuilder: lastMessageTimeBuilder,
    onPressed: onPressed,
    onLongPress: onLongPress,
    unreadMessageCount: item.unreadMessageCount
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.container
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: loadingBuilder ? loadingBuilder : defaultLoadingBuilder
  }) : !hasError ? conversationList.length ? /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: isFilter ? filteredList : conversationList,
    renderItem: renderItem,
    keyExtractor: item => item.conversationID,
    onEndReachedThreshold: 0,
    onEndReached: onScrollToEnd
  }) : /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: emptyBuilder ? emptyBuilder : defaultEmptyBuilder
  }) : /*#__PURE__*/_react.default.createElement(_reactDelegateComponent.default, {
    to: errorBuilder ? errorBuilder : defaultErrorBuilder
  }));
}
const style = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  loadingView: {
    flex: 1
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
var _default = exports.default = ConversationList;
//# sourceMappingURL=ConversationList.js.map