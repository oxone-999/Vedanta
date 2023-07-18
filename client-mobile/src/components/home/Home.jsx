import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { icons, SIZES, COLORS } from "../../constants";
import styles from "./home.style";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const [currUser, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("projects");

  const employees = ["projects", "employees", "vendors", "clients"];

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("admin");
    // navigation.navigate("Login");
    navigation.navigate("Profile");
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const decodedToken = jwtDecode(token);
          const { exp } = decodedToken;

          if (Date.now() >= exp * 1000) {
            // Token has expired, perform logout or other actions
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("admin");
            navigation.navigate("Login");
          } else {
            // Token is valid, you can use the decodedToken data
            setUser(decodedToken);

            const admin = await AsyncStorage.getItem("admin");
            if (admin === "true") {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }
        } else {
          // Token doesn't exist, redirect to login
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.container}>
          <Text style={styles.userName}>Welcome {currUser.username}</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=""
              onChange={() => {}}
              placeholder="search for vedanta employees here"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <FlatList
            data={employees}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.small }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: SIZES.medium }}></View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.loginBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
