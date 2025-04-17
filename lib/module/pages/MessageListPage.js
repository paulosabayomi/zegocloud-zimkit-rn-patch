import MessageList from '../components/MessageList';
import { StyleSheet, SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import MessageInput from '../components/MessageInput';
import React, { useState } from 'react';
// import ZIMKitPlugins from "../services/internal/ZIMKitPlugins";
import Delegate from 'react-delegate-component';
function MessageListPage(props) {
  const {
    route
  } = props;
  const {
    params
  } = route;
  const {
    conversationID,
    conversationName,
    conversationType,
    itemBuilder,
    loadingBuilder,
    errorBuilder,
    preMessageSending,
    appBarActions
  } = params;
  const [isInputFocus, setIsInputFocus] = useState(false);

  // let ZegoSendCallInvitationButton;
  // const ZegoPrebuiltCallPlugin = ZIMKitPlugins.getInstance().getZegoPrebuiltCallPlugin();
  // if (ZegoPrebuiltCallPlugin) {
  //   ZegoSendCallInvitationButton = ZegoPrebuiltCallPlugin.ZegoSendCallInvitationButton;
  // }

  const onInputFocus = () => {
    setIsInputFocus(true);
  };
  const onInputBlur = () => {
    setIsInputFocus(false);
  };
  const onGoBackPress = () => {
    console.log('===goback', appBarActions);
    appBarActions.forEach(item => {
      if (item.icon === 'goBack') {
        item.onPressed();
      }
    });
  };
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: style.container
  }, /*#__PURE__*/React.createElement(View, {
    style: style.topBar
  }, /*#__PURE__*/React.createElement(View, {
    style: style.icon
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onGoBackPress
  }, /*#__PURE__*/React.createElement(Image, {
    source: require('./resources/icon-goback.png'),
    style: style.goBack
  }))), /*#__PURE__*/React.createElement(Text, {
    style: style.topBarTitle
  }, `${conversationName ? conversationName : conversationType === 0 ? 'Chat' : 'Group Chat'}(${conversationID})`), /*#__PURE__*/React.createElement(View, {
    style: style.callContainer
  }, params.appBarActions[1] ? /*#__PURE__*/React.createElement(View, {
    style: style.audioCall
  }, /*#__PURE__*/React.createElement(Delegate, {
    to: params.appBarActions[1]
  })) : null, params.appBarActions[2] ? /*#__PURE__*/React.createElement(View, {
    style: style.videoCall
  }, /*#__PURE__*/React.createElement(Delegate, {
    to: params.appBarActions[2]
  })) : null)), /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: Platform.OS == 'ios' ? 'padding' : null,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(MessageList, {
    conversationID: conversationID,
    conversationType: conversationType,
    isInputFocus: isInputFocus,
    itemBuilder: itemBuilder,
    loadingBuilder: loadingBuilder,
    errorBuilder: errorBuilder
  }), /*#__PURE__*/React.createElement(MessageInput, {
    conversationID: conversationID,
    conversationType: conversationType,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
    preMessageSending: preMessageSending
  })));
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topBar: {
    height: 50
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  goBack: {
    width: 36,
    height: 36
  },
  topBarTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50
  },
  callContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  audioCall: {
    marginRight: 5
  },
  videoCall: {
    marginRight: 5
  }
});
export default MessageListPage;
//# sourceMappingURL=MessageListPage.js.map