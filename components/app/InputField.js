import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, { ZoomInDown, ZoomOutDown } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "./../../utils/colors";

const { height, width } = Dimensions.get("window");

const InputField = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <Animated.View
      style={styles.buttons_container}
      entering={ZoomInDown}
      exiting={ZoomOutDown}
    >
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <FontAwesome
          name="magic"
          size={RFPercentage(3.3)}
          color={colors.darker}
        />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={(value) => onChange(value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </Animated.View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginLeft: 15,
    bottom: height * 0.12 + (Platform.OS === "android" ? 20 : 0),
    width: width * 0.9,
  },
  input: {
    fontSize: RFPercentage(2),
    textAlign: "right",
    paddingHorizontal: 5,
    height: height * 0.07,
    width: "100%",
    // borderWidth: 2,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  button: {
    height: height * 0.07,
    width: height * 0.07,
    borderRadius: 20,
    position: "absolute",
    zIndex: 1,
    top: height * 0.02,
    left: width * 0.03,
  },
});
