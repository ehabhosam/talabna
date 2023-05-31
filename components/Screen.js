import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

import WrapperWithKeyboardDismiss from "./KeyboardAvoid";

const { width } = Dimensions.get("window");

function Screen({ children, style, avoidKeyboard = true }) {
  return (
    <KeyboardAvoidingView
      enabled={avoidKeyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <WrapperWithKeyboardDismiss>
        <SafeAreaView style={[styles.screen]}>
          <View style={[styles.inner, style]}>{children}</View>
        </SafeAreaView>
      </WrapperWithKeyboardDismiss>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    zIndex: 5,
    width,
  },
  inner: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
});

export default Screen;
