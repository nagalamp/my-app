import { Slot } from "expo-router";

import Toast from "react-native-toast-message";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";

import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function RootLayout() {
  const [fontsLoaded] =
    useFonts({
      Comfortaa_300Light,
      Comfortaa_400Regular,
      Comfortaa_500Medium,
      Comfortaa_600SemiBold,
      Comfortaa_700Bold,
    });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />

      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,

    justifyContent:
      "center",

    alignItems:
      "center",
  },
});