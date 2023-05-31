import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { ThemedButton } from "react-native-really-awesome-button";

import AppText from "./AppText";
import getDimension from "../utils/getDimension";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function AppButton({
  title,
  onPress,
  backgroundColor = "tomato",
  color = "black",
  button_width = "auto",
  button_height = "auto",
  style = null,
  fontSize = 5,
  icon = null,
  disabled = false,
}) {
  const _width =
    button_width === "auto" ? null : getDimension(button_width, WIDTH, HEIGHT);
  const _height =
    button_height === "auto"
      ? null
      : getDimension(button_height, WIDTH, HEIGHT);
  return (
    <>
      <AwesomeButton
        onPress={onPress}
        disabled={disabled}
        style={[styles.awesome, style]}
        width={_width}
        height={_height}
        backgroundColor={null}
      >
        <AppText size={fontSize} color={color}>
          {title}
        </AppText>
        {icon}
      </AwesomeButton>
    </>
  );
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  awesome: {},
});
