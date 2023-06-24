import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";

import InputField from "./InputField";
import SimpleButton from "./SimpleButton";
import { Item } from "../../module/Item";
import { colors } from "./../../utils/colors";

export default function BottomButtons({
  dispatch,
  isViewingInputField,
  setIsViewingInputField,
  setUserInput,
  userInput,
  onClearItems,
}) {
  const { width } = useWindowDimensions();
  function handleAddFromText() {
    dispatch({ type: "ADD_FROM_TEXT", payload: { text: userInput } });
    setIsViewingInputField(false);
    setUserInput("");
  }

  function addNewItem() {
    dispatch({ type: "ADD_ITEM", payload: new Item() });
  }

  return (
    <>
      {isViewingInputField && (
        <InputField
          value={userInput}
          onChange={setUserInput}
          placeholder="اكتب اوردرك زي كدا: واحد فول و4 طعمية مثلا"
        />
      )}
      <View
        style={[
          styles.buttons_container,
          { width },
          Platform.OS === "android" ? { marginBottom: 20 } : {},
        ]}
      >
        <SimpleButton
          backgroundColor={colors.tomato}
          onPress={onClearItems}
          width="15vw"
        >
          <EvilIcons name="trash" size={35} color="white" />
        </SimpleButton>
        <SimpleButton
          backgroundColor={colors.darker}
          onPress={isViewingInputField ? handleAddFromText : addNewItem}
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
    bottom: 0,
    position: "absolute",
  },
  main_button: {
    backgroundColor: colors.darker,
    // borderRadius: "50%",
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
