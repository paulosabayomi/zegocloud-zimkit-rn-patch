import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
function TextMessages(props) {
  const {
    text,
    backgroundColor,
    color
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: [style.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [style.text, {
      color
    }]
  }, text));
}
const style = StyleSheet.create({
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
export default TextMessages;
//# sourceMappingURL=TextMessage.js.map