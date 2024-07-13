import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { FIREBASE_AUTH } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../AuthContext";

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user);
      if (userCredential) navigation.navigate("Welcome");
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Incorrect email or password.');
      } else {
        alert('Sign up failed: ' + error.message);
      }
    }
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.innerContainer}>
        <Text style={styles.title}>My App</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#C0C0C0"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#C0C0C0"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
            <ActivityIndicator size="small" color="#222" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUp} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginBottom: 80,
  },
  input: {
    backgroundColor: "#3D3D3D",
    color: "white",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  forgotPassword: {
    color: "#FFFFFF",
    textAlign: "right",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFD482",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  footerText: {
    color: "white",
  },
  signUp: {
    color: "#FFD482",
  },
});
