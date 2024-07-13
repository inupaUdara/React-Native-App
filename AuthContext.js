import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(FIREBASE_AUTH);
    setUser(null);
    await AsyncStorage.removeItem('user');	
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
