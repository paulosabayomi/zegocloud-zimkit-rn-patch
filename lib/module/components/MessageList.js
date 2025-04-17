import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { ZIMKit } from '../index';
import React, { useEffect, useState, useRef } from 'react';
import Messages from './messages/Messages';
import Delegate from 'react-delegate-component';
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
  const [messageList, setMessageList] = useState([]);
  const flatListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let groupMemberInfoList = [];
  useEffect(() => {
    if (isInputFocus) {
      setTimeout(() => {
        var _flatListRef$current;
        (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToEnd();
      }, 200);
    }
  }, [isInputFocus]);
  useEffect(() => {
    setIsLoading(true);
    ZIMKit.getMessageList(conversationID, conversationType).then(data => {
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
    ZIMKit.onMessageListChanged((id, type, messageList) => {
      if (conversationID === id && conversationType === type) {
        const data = [...messageList];
        data.sort((a, b) => a.orderKey - b.orderKey);
        setMessageList(data);
        // clear unread count
        ZIMKit.clearUnreadCount(id, type);
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
      ZIMKit.offMessageListChanged();
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
      await ZIMKit.queryGroupMemberInfo(id, conversationID).then(data => {
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
    ZIMKit.loadMoreMessage(conversationID, conversationType).then(data => {
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
    return /*#__PURE__*/React.createElement(View, {
      style: style.loadingView
    }, /*#__PURE__*/React.createElement(ActivityIndicator, null));
  };
  const defaultErrorBuilder = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: style.errorView
    }, /*#__PURE__*/React.createElement(Text, null, "error view"));
  };
  const renderItem = ({
    item,
    index
  }) => /*#__PURE__*/React.createElement(Messages, {
    index: index,
    item: item,
    conversationID: conversationID,
    conversationType: conversationType,
    messageList: messageList,
    itemBuilder: itemBuilder
  });
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, isLoading ? /*#__PURE__*/React.createElement(Delegate, {
    to: loadingBuilder ? loadingBuilder : defaultLoadingBuilder
  }) : !hasError ? messageList.length ? /*#__PURE__*/React.createElement(FlatList, {
    contentContainerStyle: {
      paddingTop: 16
    },
    ref: flatListRef,
    data: messageList,
    renderItem: renderItem,
    keyExtractor: item => item.localMessageID,
    refreshing: isRefreshing,
    onRefresh: refresh
  }) : null : /*#__PURE__*/React.createElement(Delegate, {
    to: errorBuilder ? errorBuilder : defaultErrorBuilder
  }));
}
const style = StyleSheet.create({
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
export default MessageList;
//# sourceMappingURL=MessageList.js.map