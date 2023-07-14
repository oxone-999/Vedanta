import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./login.style";

const Login = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        // "http://localhost:5005/api/auth/login",
        "https://vedanta-services.onrender.com/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            employeeId: employeeId,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status === "ok") {
        await AsyncStorage.setItem("token", json.data);

        if (json.admin) {
          await AsyncStorage.setItem("admin", json.admin);
          console.log(json.admin);
        }
        setLoading(false);
        navigation.navigate("Home");
      } else {
        setLoading(false);
        setError(json.error);
      }
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
      if (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <View style={styles.main}>
          <Image
            style={styles.image}
            source={require("../../../assets/authBg.jpg")}
          />
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Employee ID."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmployeeId(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity style={styles.links}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.links}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.forgot_button}>New Account?</Text>
          </TouchableOpacity>
          <Text>{error}</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
