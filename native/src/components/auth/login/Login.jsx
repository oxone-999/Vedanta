import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import authBg from "../../../assets/images/authBg.jpg";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>LOGIN</Text>
        <View style={styles.formContainer}>
          <Image
            source={require("../../../assets/images/authBg.jpg")}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholder="Employee ID"
            onChangeText={setEmployeeId}
            value={employeeId}
            autoFocus
            required
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            required
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register here</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;