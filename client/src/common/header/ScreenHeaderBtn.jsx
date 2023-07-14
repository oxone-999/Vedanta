import React, { useState } from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenHeaderBtn = ({iconUrl,dimension,type, navigation }) => {

  const handlePress = () => {
    console.log(type);
    console.log(navigation);
    navigation.navigate("Profile");
  };

  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
