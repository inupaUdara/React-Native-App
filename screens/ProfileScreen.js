import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <TextInput
        style={styles.input}
        value={user ? user.displayName : ''}
        placeholder="Name"
        placeholderTextColor="#C0C0C0"
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={user ? user.email : ''}
        placeholder="Email"
        placeholderTextColor="#C0C0C0"
        editable={false}
      />
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );

  console.log(user);
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3D3D3D',
    color: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFD482',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
