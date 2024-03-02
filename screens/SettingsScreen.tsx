// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, Button, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const clearAsyncStorage = async () => {
    Alert.alert(
      "Reset App Data",
      "Are you sure you want to clear all app data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'App data has been successfully cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear app data.');
              console.error('Error clearing AsyncStorage:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View className="flex-1 justify-start items-start p-5">
      <Text className="text-2xl font-bold mb-5">Settings</Text>

      {/* Dark Mode Toggle */}
      <View className="flex-row justify-between items-center w-full mb-4">
        <Text className="text-lg">Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={(value) => setIsDarkMode(value)}
          value={isDarkMode}
        />
      </View>

      {/* Notifications Toggle */}
      <View className="flex-row justify-between items-center w-full mb-4">
        <Text className="text-lg">Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={(value) => setNotificationsEnabled(value)}
          value={notificationsEnabled}
        />
      </View>

      {/* Reset App Data Button */}
      <View className="w-full mt-5">
        <Button title="Reset App Data" onPress={clearAsyncStorage} color="#d9534f" />
      </View>
    </View>
  );
};

export default SettingsScreen;

