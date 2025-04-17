import { StyleSheet, View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import Delegate from 'react-delegate-component';
import Avatar from './common/Avatar';
import { dateFormat } from '../utils/dateFormat';
import { ZIMKit } from '../index';
import React, { useState } from 'react';
function Conversation(props) {
  const {
    conversationID,
    conversationName,
    conversationType,
    conversationAvatarUrl,
    lastMessage,
    lastMessageBuilder,
    lastMessageTimeBuilder,
    onPressed,
    onLongPress,
    unreadMessageCount
  } = props;
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuLocationX, setMenuLocationX] = useState(0);
  const [menuLocationY, setMenuLocationY] = useState(0);
  const defaultOnLongPress = event => {
    setMenuVisible(true);
    console.log('defaultOnLongPress', conversationID, conversationName);
  };
  const onMenuMaskPress = () => {
    console.log('onMenuMaskPress');
    setMenuVisible(!menuVisible);
  };
  const onDeletePress = () => {
    console.log('onDeletePress');
    setMenuVisible(!menuVisible);
    Alert.alert('Confirm', 'Do you want to delete this conversation?', [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
        ZIMKit.deleteConversation(conversationID, conversationType);
      }
    }]);
  };
  const onQuitPress = () => {
    console.log('onQuitPress');
    setMenuVisible(!menuVisible);
    Alert.alert('Confirm', 'Do you want to leave this group?', [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => {
        console.log('OK Pressed');
        ZIMKit.leaveGroup(conversationID);
      }
    }]);
  };
  const onCancelPress = () => {
    console.log('onCancelPress');
    setMenuVisible(!menuVisible);
  };
  const onConversationPressed = () => {
    ZIMKit.clearUnreadCount(conversationID, conversationType);
    const props = {
      conversationID,
      conversationName,
      conversationType,
      conversationAvatarUrl
    };
    onPressed(props);
  };
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onConversationPressed,
    onLongPress: onLongPress ? onLongPress : defaultOnLongPress
  }, /*#__PURE__*/React.createElement(View, {
    style: style.conversationItem
  }, /*#__PURE__*/React.createElement(View, {
    style: style.avatar
  }, unreadMessageCount ? /*#__PURE__*/React.createElement(View, {
    style: style.unreadBox
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.unreadMessage
  }, unreadMessageCount > 99 ? '99+' : unreadMessageCount)) : null, conversationType === 0 ? conversationAvatarUrl ? /*#__PURE__*/React.createElement(Avatar, {
    url: conversationAvatarUrl
  }) : /*#__PURE__*/React.createElement(Image, {
    style: style.image,
    source: require('./resources/avatar-default.png')
  }) : /*#__PURE__*/React.createElement(Image, {
    style: style.image,
    source: require('./resources/avatar-group.png')
  })), /*#__PURE__*/React.createElement(View, {
    style: style.itemContent
  }, /*#__PURE__*/React.createElement(View, {
    style: style.main
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, conversationName ? conversationName : conversationType === 0 ? 'Chat' : 'Group Chat'), !lastMessageBuilder ? /*#__PURE__*/React.createElement(Text, {
    style: style.message,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.message) : /*#__PURE__*/React.createElement(Delegate, {
    to: lastMessageBuilder
  })), /*#__PURE__*/React.createElement(View, {
    style: style.timeBox
  }, !lastMessageTimeBuilder ? /*#__PURE__*/React.createElement(Text, {
    style: style.timeText
  }, lastMessage !== null && lastMessage !== void 0 && lastMessage.timestamp ? dateFormat(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.timestamp) : '') : /*#__PURE__*/React.createElement(Delegate, {
    to: lastMessageTimeBuilder
  }))), /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    visible: menuVisible
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onMenuMaskPress
  }, /*#__PURE__*/React.createElement(View, {
    style: style.modalMask
  })), /*#__PURE__*/React.createElement(View, {
    style: style.modalView
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onDeletePress
  }, /*#__PURE__*/React.createElement(View, {
    style: [style.modalItem, style.borderBottom]
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.text
  }, "Delete"))), conversationType === 2 ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onQuitPress
  }, /*#__PURE__*/React.createElement(View, {
    style: [style.modalItem, style.borderBottom]
  }, /*#__PURE__*/React.createElement(Text, {
    style: style.text
  }, "Quit"))) : null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onCancelPress
  }, /*#__PURE__*/React.createElement(View, {
    style: style.modalItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: [style.text, {
      color: 'red'
    }]
  }, "Cancel")))))));
}
const style = StyleSheet.create({
  conversationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 68,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8'
  },
  unreadBox: {
    position: 'absolute',
    zIndex: 2,
    top: -6,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 100
  },
  unreadMessage: {
    color: 'white',
    fontSize: 10
  },
  avatar: {
    marginRight: 10
  },
  image: {
    width: 44,
    height: 44
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    height: 68
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    maxWidth: 155,
    color: '#b1b4bb'
  },
  timeBox: {
    justifyContent: 'center'
  },
  timeText: {
    color: '#b8b8b8'
  },
  modalMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalView: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20
  },
  modalItem: {
    paddingTop: 8,
    paddingBottom: 8
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8'
  }
});
export default Conversation;
//# sourceMappingURL=Conversation.js.map