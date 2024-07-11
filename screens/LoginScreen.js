import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={styles.title}>My App</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value=''
        onChangeText=''
        placeholderTextColor="#C0C0C0"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value=''
        onChangeText=''
        placeholderTextColor="#C0C0C0"
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginBottom: 80,
  },
  input: {
    backgroundColor: '#3D3D3D',
    color: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#FFFFFF',
    textAlign: 'right',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFDD88',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    color: 'white',
  },
  signUp: {
    color: '#FFDD88',
  },
});
