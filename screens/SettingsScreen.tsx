// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage was successfully cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

const SettingsScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Reset App Data" onPress={clearAsyncStorage} />
    </View>
  );
};

export default SettingsScreen;
