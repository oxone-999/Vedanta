import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./components/home/home-main/Home";
import Login from "./components/auth/login/Login";
import Splash from "./components/common/splash/Splash";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} />
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
