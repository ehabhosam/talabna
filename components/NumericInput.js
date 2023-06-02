import { StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";

import RelativeView from "./RelativeView";
import AppText from "./AppText";
import { RFPercentage } from "react-native-responsive-fontsize";
import { colors } from "../utils/colors";

const NumericInput = ({ min, max, value, onChange, unit = "", ...rest }) => {
  return (
    <RelativeView
      width={"30vw"}
      height="auto"
      style={[
        styles.numeric_container,
        styles.m_bottom,
        {
          marginTop: 20,
        },
      ]}
    >
      <InputSpinner
        // skin="round"
        buttonStyle={styles.counter_button}
        step={1}
        color={colors.lighter}
        textColor={colors.lighter}
        max={max}
        min={min}
        fontSize={RFPercentage(2.5)}
        value={value}
        onChange={onChange}
        rest
      />
      {unit && (
        <AppText styles={{ opacity: 0.7 }} size={2.5}>
          &nbsp;&nbsp;{unit}s{" "}
        </AppText>
      )}
    </RelativeView>
  );
};

export default NumericInput;

const styles = StyleSheet.create({
  numeric_input: {
    borderRadius: 10,
    overflow: "hidden",
  },
  m_bottom: { marginBottom: 20 },
  numeric_container: { flexDirection: "row", alignItems: "flex-end" },
  counter_button: {
    backgroundColor: colors.light,
    opacity: 0.7,
  },
});
