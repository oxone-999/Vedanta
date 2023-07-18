import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./bottommenu.style";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS, images } from "../../constants";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Report from "../report/Report";
import ScreenHeaderBtn from "../common/header/ScreenHeaderBtn";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
  return (
    <Tab.Navigator initialRouteName="Home" 
        
    >
      <Tab.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              type={"Menu"}
              navigation={navigation}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
              type={"Profile"}
              navigation={navigation}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Report" component={Report} /> */}
    </Tab.Navigator>
  );
};

export default BottomMenu;
