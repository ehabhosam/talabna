import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  BounceIn,
  ZoomOutDown,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import AppText from "./../AppText";
import rabbitImageUrl from "../../assets/rabbit.png";
import { colors } from "../../utils/colors";

const { width, height } = Dimensions.get("window");

export default function EmptyItems() {
  const dance = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withRepeat(
          withSequence(
            withTiming("-5deg", { duration: 600 }),
            withTiming("5deg", { duration: 600 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[styles.image_container, styles.drop_shadow]}
      entering={BounceIn.delay(200)}
      exiting={ZoomOutDown}
    >
      <Animated.View>
        <Animated.Image
          source={rabbitImageUrl}
          contentFit="cover"
          style={[styles.image, dance]}
        />
      </Animated.View>
      <AppText size={5} color={colors.tomato} alignment="center">
        أبيض يا دولي
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: "center",
  },
  image_container: {
    backgroundColor: "#f3dcaa",
    marginTop: height * 0.1,
    borderRadius: 20,
    padding: 10,
    paddingBottom: 20,
    margin: 20,
  },
  drop_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
});
