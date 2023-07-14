import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { icons, COLORS, images } from "./constants";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";
import { TouchableOpacity, Image } from "react-native";
import styles from "./common/header/screenheader.style";
import Profile from "./components/profile/Profile";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <Text>Home</Text>
              // <ScreenHeaderBtn
              //   iconUrl={icons.menu}
              //   dimension="60%"
              //   type={"Menu"}
              //   navigation={navigation}
              // />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={images.profile}
                  resizeMode="cover"
                  style={styles.btnImg("100%")}
                />
              </TouchableOpacity>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;