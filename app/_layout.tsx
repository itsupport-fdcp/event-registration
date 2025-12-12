import Background from "@/components/Background";
import Header from "@/components/Header";
import { ThemeProvider } from "@/hooks/useTheme";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {

  useEffect(() => { 
    SplashScreen.preventAutoHideAsync().catch(console.log);
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(console.log);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" animated />
        <ThemeProvider>
          <Background>
            <Header />
            <Slot />
          </Background>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
