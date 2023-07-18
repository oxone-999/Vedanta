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
import { AvatarGenerator } from "random-avatar-generator";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./signup.style";

const Signup = ({ navigation }) => {
  const generator = new AvatarGenerator();
  const [fullName, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        // "http://localhost:5005/api/auth/signup",
        "https://vedanta-services.onrender.com/api/auth/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: fullName,
            employeeId: employeeId,
            password: password,
            avatar: generator.generateRandomAvatar(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (json.status === "ok") {
        setLoading(false);
        navigation.navigate("Login");
      } else {
        setLoading(false);
        setError(json.error);
      }

      console.log("Success:", JSON.stringify(json));
    } catch (error) {
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
              placeholder="Username"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setName(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Employee Id"
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
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.forgot_button}>Already have an account?</Text>
          </TouchableOpacity>
          <Text>{error}</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Signup;
