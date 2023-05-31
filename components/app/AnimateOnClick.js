import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function AnimateOnClick({ children, isClicked }) {
  const scale = useSharedValue(1); // Initial scale value

  const handlePress = () => {
    scale.value = withTiming(0.9, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleRelease = () => {
    scale.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    if (isClicked) {
      handlePress();
    } else handleRelease();
  }, [isClicked]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
