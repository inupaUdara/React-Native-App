import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    minLength: false,
  });
  const auth = FIREBASE_AUTH;

  const validatePassword = (pwd) => {
    setPasswordCriteria({
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      minLength: pwd.length >= 6,
    });
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!passwordCriteria.lowercase || !passwordCriteria.uppercase || !passwordCriteria.number || !passwordCriteria.minLength) {
      alert("Password does not meet the criteria");
      return;
    }
    setLoading(true)
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(newUser.user, { displayName: name });
      if (newUser) navigation.navigate("Login");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use by another account.');
      } else {
        alert('Sign up failed: ' + error.message);
      }
      console.log(error);
    }
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.innerContainer}>
        <Text style={styles.title}>My App</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#C0C0C0"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#C0C0C0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C0C0C0"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#C0C0C0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.passwordCriteriaContainer}>
          <Text style={styles.passwordCriteriaText}>
            {passwordCriteria.lowercase ? "✔️" : "❌"} One lowercase character
          </Text>
          <Text style={styles.passwordCriteriaText}>
            {passwordCriteria.uppercase ? "✔️" : "❌"} One uppercase character
          </Text>
          <Text style={styles.passwordCriteriaText}>
            {passwordCriteria.number ? "✔️" : "❌"} One number
          </Text>
          <Text style={styles.passwordCriteriaText}>
            {passwordCriteria.minLength ? "✔️" : "❌"} 6 characters minimum
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          <>
          {loading ? (<ActivityIndicator size="small" color="#222" />) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
    textAlign: 'center',
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#3D3D3D",
    color: "white",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
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
  signIn: {
    color: "#FFD482",
  },
  passwordCriteriaContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  passwordCriteriaText: {
    color: "#888",
  },
});
