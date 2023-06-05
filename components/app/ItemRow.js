import { useRef, useEffect } from "react";
import NumericInput from "./../NumericInput";
import { Image } from "expo-image";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

import imgUrl from "../../assets/unzoomed.png";
import { Item } from "../../module/Item";
import RelativeView from "./../RelativeView";
import { colors } from "../../utils/colors";
import Animated, { SlideOutRight, ZoomInLeft } from "react-native-reanimated";

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
    <Animated.View
      style={styles.drop_shadow}
      entering={ZoomInLeft}
      exiting={SlideOutRight}
    >
      <GestureHandlerRootView>
        <Swipeable renderRightActions={deleteButton}>
          <TouchableWithoutFeedback>
            <RelativeView
              width={"100%"}
              height="10vh"
              style={[styles.test, { backgroundColor }]}
            >
              <Image
                blurRadius={0.5}
                source={imgUrl}
                style={styles.image}
                contentFit="cover"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(250, 233, 190, 0.65)",
                  colors.lighter,
                ]}
                style={styles.background}
                start={{ x: 0, y: 0.25 }}
                end={{ x: 1, y: 0.75 }}
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
            </RelativeView>
          </TouchableWithoutFeedback>
        </Swipeable>
      </GestureHandlerRootView>
    </Animated.View>
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
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  test: {
    textAlign: "right",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  input: {
    width: "70%",
    height: "80%",
    textAlign: "right",
    fontSize: RFPercentage(4),
    paddingHorizontal: 10,
    fontFamily: "arabic",
    // backgroundColor: "red",
  },
  button: {
    fontSize: RFPercentage(3),
  },
  swipe: {
    backgroundColor: colors.tomato,
    width: width / 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    zIndex: 20,
    elevation: 20,
  },
  shadow: {
    shadowColor: colors.darker,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    // flex: 1,
  },
  drop_shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    // backgroundColor: colors.lighter,
    // borderRadius: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -10,
    marginTop: 10,
    height: "200%",
    borderRadius: 10,
    // transform: [{ scaleX: 5 }],
  },
});
