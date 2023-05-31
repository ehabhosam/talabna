import React from "react";
import { Text, Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { isTextArabic } from "./../utils/isTextArabic";

const AppText = ({
  children,
  color,
  styles = {},
  size = 4,
  alignment = null,
  isBold = false,
  ...other
}) => {
  const primary = "black";
  const isArabic = isTextArabic(children);
  return (
    <Text
      style={[
        {
          color: color ? color : primary,
          fontSize: RFPercentage(size),
          textAlign: alignment ?? (isArabic ? "right" : "left"),
          fontFamily: "arabic",
          // fontFamily: isBold
          //   ? !isArabic
          //     ? "AvenirBold"
          //     : "Hacen-Tunisia-Bold"
          //   : !isArabic
          //   ? Platform.OS === "android"
          //     ? "AvenirLTStd-Medium"
          //     : "Avenir"
          //   : "Hacen-Tunisia-Lt",
        },
        isBold && { transform: [{ translateY: 2 }] },
        styles,
      ]}
      {...other}
    >
      {children}
    </Text>
  );
};

export default AppText;
