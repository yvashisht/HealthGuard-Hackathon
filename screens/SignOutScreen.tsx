import * as React from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signOut = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    // Update app state or context to reflect sign-out
    // e.g., setUserToken(null) if you're storing the token in state
  } catch (e) {
    console.error('Error signing out: ', e);
  }
};

const SettingsScreen = ({ onSignOut }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Other settings options */}
      <Button title="Sign Out" onPress={onSignOut} />
    </View>
  );
};

export default SettingsScreen;

