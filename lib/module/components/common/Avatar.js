import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
function Avatar(props) {
  const {
    url
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: style.avatarBox
  }, /*#__PURE__*/React.createElement(Image, {
    style: style.image,
    source: {
      uri: url
    }
  }));
}
const style = StyleSheet.create({
  avatarBox: {
    flex: 1
  },
  image: {
    width: 44,
    height: 44
  }
});
export default Avatar;
//# sourceMappingURL=Avatar.js.map