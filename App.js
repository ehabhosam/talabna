import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import MainScreen from "./screens/MainScreen";
import bgUrl from "./assets/unzoomed.png";
import { GlobalAlert } from "./utils/GlobalAlert/GlobalAlert";

import { colors } from "./utils/colors";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function App() {
  const [fontsLoaded] = useFonts({
    ArabicUIDisplaySemiBold: require("./assets/ArabicUIDisplaySemiBold.otf"),
    "AvenirLTStd-Medium": require("./assets/AvenirLTStd-Medium.otf"),
    "Hacen-Tunisia-Lt": require("./assets/Hacen-Tunisia-Lt.ttf"),
    AvenirBold: require("./assets/Avenir-Bold.otf"),
    "Hacen-Tunisia-Bold": require("./assets/Hacen-Tunisia-Bold.ttf"),
    arabic: require("./assets/arefmenna.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* App background Image */}
      {/* <Image
        style={styles.image}
        // source="https://cdn.leonardo.ai/users/f130997f-dd81-4e1b-b6d0-195e1390cede/generations/baa61c99-5e98-45e3-8875-07caf93c75cc/Leonardo_Diffusion_A_vibrant_abstract_wallpaper_featuring_a_mo_0.jpg"
        // source="https://jooinn.com/images/wood-29.jpg"
        source={bgUrl}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        blurRadius={0.4}
      /> */}
      <MainScreen />
      <StatusBar style="auto" />
    </View>
    // <BottomSheetModalProvider>
    // {/* <GlobalAlert /> */}
    // {/* </BottomSheetModalProvider> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
    // opacity: 0.65,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
