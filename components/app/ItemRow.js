import { useRef, useState, useEffect } from "react";
import NumericInput from "./../NumericInput";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import SwipeableItem, {
  useSwipeableItemParams,
  OpenDirection,
} from "react-native-swipeable-item";

import AppText from "./../AppText";
import { Item } from "../../module/Item";
import RelativeView from "./../RelativeView";
import { ThemedButton } from "react-native-really-awesome-button";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");

const ItemRow = ({ item, backgroundColor, dispatch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!item.title) {
      inputRef.current.focus();
    }
  }, []);

  function editCount(count) {
    dispatch({
      type: "EDIT_COUNT",
      payload: { id: item.id, count },
    });
  }
  function editTitle(title) {
    dispatch({
      type: "EDIT_TITLE",
      payload: { id: item.id, title },
    });
  }
  function addItem() {
    dispatch({ type: "ADD_ITEM", payload: new Item() });
  }
  function deleteItem() {
    dispatch({ type: "DELETE_ITEM", payload: { id: item.id } });
  }

  const deleteButton = () => {
    return (
      <TouchableOpacity onPress={deleteItem} style={styles.swipe}>
        <EvilIcons name="trash" size={30} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.shadow}>
      <Swipeable renderLeftActions={deleteButton}>
        <TouchableWithoutFeedback>
          <RelativeView
            width={"100%"}
            height="9vh"
            style={[styles.test, { backgroundColor }]}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={[colors.lighter, colors.light]}
              style={styles.background}
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
            />
            <NumericInput min={1} value={item.count} onChange={editCount} />
            <TextInput
              value={item.title}
              onChangeText={(value) => editTitle(value)}
              ref={inputRef}
              style={styles.input}
              size={3}
              onSubmitEditing={addItem}
            ></TextInput>
            {/* <AppText
              color={"red"}
              size={3}
              styles={{
                backgroundColor: "darkblue",
                position: "absolute",
                top: 0,
              }}
            >
              {item.id}
            </AppText> */}
          </RelativeView>
        </TouchableWithoutFeedback>
      </Swipeable>
    </View>
  );
};

export default ItemRow;

const styles = StyleSheet.create({
  containter: {
    borderRadius: "10",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  test: {
    textAlign: "right",
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    borderRadius: "10",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  input: {
    width: "70%",
    height: "100%",
    textAlign: "right",
    fontSize: RFPercentage(4),
    paddingHorizontal: 10,
    fontFamily: "arabic",
  },
  button: {
    // display: "none",
    fontSize: RFPercentage(3),
  },
  swipe: {
    backgroundColor: "red",
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: colors.darker,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    // flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -10,
    marginTop: 10,
    height: "200%",
    borderRadius: 10,
  },
});
