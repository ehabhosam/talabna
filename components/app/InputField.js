import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ThemedButton } from "react-native-really-awesome-button";

const { height, width } = Dimensions.get("window");

const InputField = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <View style={styles.buttons_container}>
      <ThemedButton
        name="bruce"
        type="primary"
        borderRadius={10}
        width={width * 0.2 - 15}
        onPress={onSubmit}
      >
        ودي
      </ThemedButton>
      <TextInput
        value={value}
        onChangeText={(value) => onChange(value)}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    fontSize: RFPercentage(2),
    textAlign: "right",
    paddingHorizontal: 5,
    borderWidth: 2,
    height: height * 0.067,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    shadowColor: "black",
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    width: width * 0.8 - 15,
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
