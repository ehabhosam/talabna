import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";

import AnimateOnClick from "./AnimateOnClick";
import RelativeView from "../RelativeView";

export default function SimpleButton({
  backgroundColor,
  onPress,
  children,
  width,
}) {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <AnimateOnClick isClicked={isClicked}>
      <Animated.View entering={FadeInDown}>
        <TouchableOpacity
          style={[styles.rounded, styles.drop_shadow, { backgroundColor }]}
          onPress={onPress}
          onPressIn={() => setIsClicked(true)}
          onPressOut={() => setIsClicked(false)}
        >
          <RelativeView width={width} height={width} style={[styles.center]}>
            {children}
          </RelativeView>
        </TouchableOpacity>
      </Animated.View>
    </AnimateOnClick>
  );
}

const styles = StyleSheet.create({
  drop_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  rounded: {
    borderRadius: 300,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
