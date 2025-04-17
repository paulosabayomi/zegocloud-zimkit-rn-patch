import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import TextMessage from './TextMessage';
import Avatar from '../common/Avatar';
import { dateFormat } from '../../utils/dateFormat';
import React, { useEffect, useState } from 'react';
import { ZIMKit } from '../../index';
import Delegate from 'react-delegate-component';
function Messages(props) {
  const {
    index,
    item,
    conversationID,
    conversationType,
    messageList,
    itemBuilder
  } = props;
  const {
    senderUserID,
    message,
    type,
    timestamp,
    sentStatus,
    userInfo
  } = item;
  const [time, setTime] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    setCurrentUser(ZIMKit.currentUser());
    setTime(messageDateFormat(timestamp, index));
  }, []);
  const messageDateFormat = (timestamp, index) => {
    if (!timestamp) {
      return;
    }
    if (index === 0) {
      return dateFormat(timestamp, true);
    } else {
      const previousMessage = messageList[index - 1];
      if (previousMessage && timestamp - previousMessage.timestamp > 300000) {
        return dateFormat(timestamp, true);
      }
    }
  };
  return /*#__PURE__*/React.createElement(View, {
    style: style.container
  }, itemBuilder ? /*#__PURE__*/React.createElement(Delegate, {
    to: itemBuilder
  }) : /*#__PURE__*/React.createElement(View, null, time ? /*#__PURE__*/React.createElement(View, {
    style: style.timeBox
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.time
  }, time)) : null, senderUserID !== currentUser.userID ? /*#__PURE__*/React.createElement(View, {
    style: style.leftMsg
  }, /*#__PURE__*/React.createElement(View, {
    style: style.avatar
  }, userInfo !== null && userInfo !== void 0 && userInfo.memberAvatarUrl ? /*#__PURE__*/React.createElement(Avatar, {
    url: userInfo.memberAvatarUrl
  }) : /*#__PURE__*/React.createElement(Image, {
    style: style.image,
    source: require('../resources/avatar-default.png')
  })), /*#__PURE__*/React.createElement(View, {
    style: style.content
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.name,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.userName), /*#__PURE__*/React.createElement(View, {
    style: style.msgContent
  }, type === 1 ? /*#__PURE__*/React.createElement(TextMessage, {
    text: message,
    backgroundColor: "white"
  }) : null))) : /*#__PURE__*/React.createElement(View, {
    style: style.rightMsg
  }, sentStatus === 0 ? /*#__PURE__*/React.createElement(View, {
    style: style.loading
  }, /*#__PURE__*/React.createElement(ActivityIndicator, null)) : null, sentStatus === 2 ? /*#__PURE__*/React.createElement(View, {
    style: style.error
  }, /*#__PURE__*/React.createElement(Image, {
    style: style.icon,
    source: require('../resources/send-fail-icon.png')
  })) : null, type === 1 ? /*#__PURE__*/React.createElement(TextMessage, {
    text: message,
    backgroundColor: "#3478fc",
    color: "white"
  }) : null, /*#__PURE__*/React.createElement(View, {
    style: style.avatar
  }, currentUser.userAvatarUrl ? /*#__PURE__*/React.createElement(Avatar, {
    url: currentUser.userAvatarUrl
  }) : /*#__PURE__*/React.createElement(Image, {
    style: style.image,
    source: require('../resources/avatar-default.png')
  })))));
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  timeBox: {
    alignSelf: 'center',
    marginBottom: 16
  },
  time: {
    fontSize: 12,
    color: '#b1b4bb'
  },
  leftMsg: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 16
  },
  rightMsg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 16
  },
  content: {
    flex: 1
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatar: {
    marginLeft: 12,
    marginRight: 12
  },
  image: {
    width: 44,
    height: 44
  },
  name: {
    marginBottom: 2,
    maxWidth: '80%'
  },
  msgContent: {
    flex: 1,
    flexDirection: 'row'
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  icon: {
    width: 20,
    height: 20
  }
});
export default Messages;
//# sourceMappingURL=Messages.js.map