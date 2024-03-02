// screens/AboutMeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AboutMeScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [journey, setJourney] = useState('');

  useEffect(() => {
    // Fetch stored data when the component mounts
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedJourney = await AsyncStorage.getItem('journey'); // Retrieve journey text
        if (storedName) setName(storedName);
        if (storedAge) setAge(storedAge);
        if (storedGender) setGender(storedGender);
        if (storedJourney) setJourney(storedJourney); // Set journey text
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch stored data.');
      }
    };

    fetchData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('age', age);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('journey', journey); // Save journey text
      Alert.alert('Success', 'Your information has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <View className="bg-blue-100 flex-1 p-4 justify-center">
      <Text className="text-xl font-bold mb-4">About Me</Text>

      <Text className="mb-2">Name</Text>
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        onChangeText={setName}
        value={name}
        placeholder="Your Name"
      />

      <Text className="mb-2">Age</Text>
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        onChangeText={setAge}
        value={age}
        placeholder="Your Age"
        keyboardType="numeric"
      />

      <Text className="mb-2">Gender</Text>
      <TextInput
        className="border border-gray-300 p-2 mb-6"
        onChangeText={setGender}
        value={gender}
        placeholder="Your Gender"
      />

      <Text className="text-lg font-semibold mb-2">My Journey</Text>
      <TextInput
        className="border border-blue-300 bg-white p-2 w-3/4 h-40 mb-6 rounded"
        onChangeText={setJourney}
        value={journey}
        placeholder="Describe your journey"
        multiline={true} // Enable multiline input
        numberOfLines={10} // Set number of lines
      />

      <Button title="Save" onPress={saveData} />
    </View>
  );
};

export default AboutMeScreen;

