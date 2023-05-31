import React, { useCallback } from "react";
import { Dimensions, View } from "react-native";

import getDimension from "../utils/getDimension";

const RelativeView = ({ children, width, height, style, ...rest }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  let _width = getDimension(width, windowWidth, windowHeight);
  let _height = getDimension(height, windowWidth, windowHeight);

  return (
    <View style={[{ width: _width, height: _height }, style]} {...rest}>
      {children ? children : null}
    </View>
  );
};

export default RelativeView;
