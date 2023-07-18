import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { icons, COLORS, images } from "./constants";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";
import { TouchableOpacity, Image, Text } from "react-native";
import styles from "./common/header/screenheader.style";
import Profile from "./components/profile/Profile";

const Stack = createStackNavigator();

const AppNavigator = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BMenu" component={BottomMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;