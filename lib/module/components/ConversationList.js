import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import Conversation from './Conversation';
import React, { useEffect, useState } from 'react';
import Delegate from 'react-delegate-component';
import { ZIMKit } from '../index';
import ZIMKitConversationCore from '../services/internal/ZIMKitConversationCore';
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
  const [conversationList, setConversationList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (typeof filter === 'function') {
      const filteredList = filter(conversationList);
      setFilteredList(filteredList);
      if (filteredList !== conversationList) {
        setIsFilter(true);
      }
    }
  }, [filter]);
  useEffect(() => {
    setIsLoading(true);
    ZIMKit.getConversationList().then(data => {
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
    ZIMKit.onConversationListChanged(conversationList => {
      const data = [...conversationList];
      let sortedList = [];
      if (sorter) {
        sortedList = sorter(data);
      } else {
        sortedList = defaultSorter(data);
      }
      setConversationList(sortedList);
      ZIMKitConversationCore.getInstance().conversationList = sortedList;
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
    return /*#__PURE__*/React.createElement(View, {
      style: style.errorView
    }, /*#__PURE__*/React.createElement(Text, null, "error view"));
  };
  const defaultEmptyBuilder = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.emptyView
    }, /*#__PURE__*/React.createElement(Text, null, "No conversation yet"));
  };
  const defaultLoadingBuilder = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.loadingView
    }, /*#__PURE__*/React.createElement(ActivityIndicator, null));
  };
  const onScrollToEnd = () => {
    if (conversationList.length >= 20) {
      ZIMKit.loadMoreConversation();
    }
  };
  const renderItem = ({
    item
  }) => itemBuilder ? /*#__PURE__*/React.createElement(Delegate, {
    to: itemBuilder,
    props: {
      item
    }
  }) : /*#__PURE__*/React.createElement(Conversation, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, isLoading ? /*#__PURE__*/React.createElement(Delegate, {
    to: loadingBuilder ? loadingBuilder : defaultLoadingBuilder
  }) : !hasError ? conversationList.length ? /*#__PURE__*/React.createElement(FlatList, {
    data: isFilter ? filteredList : conversationList,
    renderItem: renderItem,
    keyExtractor: item => item.conversationID,
    onEndReachedThreshold: 0,
    onEndReached: onScrollToEnd
  }) : /*#__PURE__*/React.createElement(Delegate, {
    to: emptyBuilder ? emptyBuilder : defaultEmptyBuilder
  }) : /*#__PURE__*/React.createElement(Delegate, {
    to: errorBuilder ? errorBuilder : defaultErrorBuilder
  }));
}
const style = StyleSheet.create({
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
export default ConversationList;
//# sourceMappingURL=ConversationList.js.map