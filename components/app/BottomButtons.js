import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import InputField from "./InputField";
import RelativeView from "../RelativeView";
import { Item } from "../../module/Item";
import { colors } from "./../../utils/colors";
import AnimateOnClick from "./AnimateOnClick";
import SimpleButton from "./simpleButton";

const { width } = Dimensions.get("window");

export default function BottomButtons({
  dispatch,
  isViewingInputField,
  setIsViewingInputField,
  setUserInput,
  userInput,
  onClearItems,
}) {
  const [animation, setanimation] = React.useState("bounceIn");
  const [isClearButtonClicked, setIsClearButtonClicked] = React.useState(false);
  function toggleAnimation() {
    setanimation(animation === "zoomOut" ? "zoomIn" : "zoomOut");
  }
  return (
    <>
      {isViewingInputField && (
        <InputField
          value={userInput}
          onChange={setUserInput}
          onSubmit={() => {
            dispatch({ type: "ADD_FROM_TEXT", payload: { text: userInput } });
            setIsViewingInputField(false);
            setUserInput("");
          }}
          placeholder="اكتب اوردرك زي كدا: واحد فول و4 طعمية مثلا"
        />
      )}

      <View style={[styles.buttons_container]}>
        <SimpleButton
          backgroundColor={colors.tomato}
          onPress={onClearItems}
          width="15vw"
        >
          <EvilIcons name="trash" size={35} color="white" />
        </SimpleButton>
        <SimpleButton
          backgroundColor={colors.darker}
          onPress={() => dispatch({ type: "ADD_ITEM", payload: new Item() })}
          width="20vw"
        >
          <Text style={styles.main_button_text}>+</Text>
        </SimpleButton>
        <SimpleButton
          backgroundColor={colors.dark}
          onPress={() => setIsViewingInputField(!isViewingInputField)}
          width="15vw"
        >
          <FontAwesome name="pencil-square-o" size={24} color="white" />
        </SimpleButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttons_container: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    columnGap: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  main_button: {
    backgroundColor: colors.darker,
    borderRadius: "50%",
  },
  clear_button: {
    backgroundColor: colors.tomato,
  },
  enter_button: {
    backgroundColor: colors.dark,
  },
  main_button_text: {
    fontSize: RFPercentage(5),
    color: colors.lighter,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drop_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

/**
 *         <ThemedButton
          name="bruce"
          type="primary"
          borderRadius={10}
          width={width * 0.2 - 15}
          onPress={onClearItems}
        >
          <EvilIcons name="trash" size={35} color="white" />
        </ThemedButton>

        <ThemedButton
          name="bruce"
          type="danger"
          borderRadius={10}
          width={width * 0.2 - 15}
          onPress={() => setIsViewingInputField(!isViewingInputField)}
        >
          <FontAwesome name="pencil-square-o" size={24} color="white" />
        </ThemedButton>
        <ThemedButton
          name="bruce"
          type="anchor"
          borderRadius={10}
          width={width * 0.6 - 15}
          onPress={() => dispatch({ type: "ADD_ITEM", payload: new Item() })}
          debouncedPressTime={1}
        >
          زود يا حبيب اخوك
        </ThemedButton>
 */
