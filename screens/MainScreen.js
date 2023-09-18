import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { ThemedButton } from "react-native-really-awesome-button";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import ItemRow from "./../components/app/ItemRow";
import InputField from "./../components/app/InputField";
import reducer from "../state/reducer";
import { Item } from "../module/Item";
import { colors } from "./../utils/colors";
import BottomButtons from "../components/app/BottomButtons";
import rabbitImageUrl from "../assets/rabbit.png";
import EmptyItems from "../components/app/EmptyItems";
import Animated, {
  SlideInUp,
  ZoomOut,
  ZoomOutRight,
} from "react-native-reanimated";

/* state structure: { items: { id, count, item_name }[] } */
const initialState = { items: [] };


// import {} from "../utils/GlobalAlert/GlobalAlert"
import { globalAlertManager } from "../utils/GlobalAlert/GlobalAlertManager";

const { width, height } = Dimensions.get("window");

export default function MainScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isViewingInputField, setIsViewingInputField] = useState(false);
  const [userInput, setUserInput] = useState("");

  const { height: hookHeight } = useWindowDimensions();

  function onClearItems() {
    if (state.items.length > 0) {
      Alert.alert("كدا هتمسح كل حاجة 😲", "", [
        {
          text: "دغدغ",
          onPress: () => dispatch({ type: "CLEAR_ITEMS" }),
        },
        {
          text: "خلاص بلاش",
          style: "cancel",
        },
      ]);
      // globalAlertManager.alert({
      //   title: "Thiss is Alert title",
      //   message: "",
      //   actions: [
      //     {
      //       text: "clear",
      //       onPress: () => dispatch({ type: "CLEAR_ITEMS" }),
      //     },
      //     {
      //       text: "cancel",
      //       style: "cancel",
      //     },
      //   ],
      // })
    }
  }

  return (
    <Screen>
      <Animated.View entering={SlideInUp}>
        <AppText size={6} color={colors.darker} isBold={true} alignment="right">
          هتطلبو ايه يا رجالة؟
        </AppText>
      </Animated.View>

      {state.items.length > 0 && (
        <KeyboardAvoidingView>
          <Animated.View exiting={ZoomOutRight}>
            <FlatList
              style={[styles.list, { maxHeight: hookHeight * 0.7 }]}
              data={state.items}
              keyboardDismissMode={"interactive"}
              renderItem={({ item }) => (
                <ItemRow
                  backgroundColor={colors.light}
                  item={item}
                  dispatch={dispatch}
                  key={item.id}
                />
              )}
              ItemSeparatorComponent={<View style={{ height: 10 }} />}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      )}

      {state.items.length === 0 && <EmptyItems />}

      <BottomButtons
        dispatch={dispatch}
        isViewingInputField={isViewingInputField}
        setIsViewingInputField={setIsViewingInputField}
        userInput={userInput}
        setUserInput={setUserInput}
        onClearItems={onClearItems}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    overflow: "visible",
  },
  title_shadow: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
