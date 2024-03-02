// screens/JournalScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalScreen = () => {
  const [freeEntry, setFreeEntry] = useState('');
  const emotions = ['Hopeless', 'Angry', 'Irritable', 'Anxious', 'Sad', 'Lonely', 'Content', 'Calm', 'Comfortable','Safe', 'Joyful'];
  const [ratings, setRatings] = useState({
    Hopeless: 0,
    Angry: 0,
    Irritable: 0,
    Anxious: 0,
    Sad: 0,
    Lonely: 0,
    Content: 0,
    Calm: 0,
    Comfortable: 0,
    Safe: 0,
    Joyful: 0,
  });

  const handleRating = (emotion, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [emotion]: rating }));
  };

  const handleSubmit = async () => {
    const journalEntry = {
      date: new Date().toISOString(),
      ratings,
      freeEntry,
    };

    try {
      const existingEntries = await AsyncStorage.getItem('journalEntries');
      const newEntries = existingEntries ? JSON.parse(existingEntries) : [];
      newEntries.push(journalEntry);

      await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
      Alert.alert('Journal Saved', 'Your journal entry has been saved successfully.');

      setRatings({
        Hopeless: 0,
        Angry: 0,
        Irritable: 0,
        Anxious: 0,
        Sad: 0,
        Lonely: 0,
        Content: 0,
        Calm: 0,
        Comfortable: 0,
        Safe: 0,
        Joyful: 0,
      });
      setFreeEntry('');
    } catch (error) {
      Alert.alert('Error', 'There was an error saving your journal entry.');
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4">Today's Journal</Text>
      {emotions.map((emotion) => (
        <View key={emotion} className="mb-6">
          <Text className="text-lg mb-2">{emotion}</Text>
          <View className="flex-row justify-between">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => handleRating(emotion, num)}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  ratings[emotion] === num ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                <Text className={`${ratings[emotion] === num ? 'text-white' : 'text-black'}`}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <TextInput
        className="mt-4 border border-gray-300 p-2 h-40 textAlign-vertical-top"
        multiline
        placeholder="Write about your day..."
        onChangeText={setFreeEntry}
        value={freeEntry}
      />
      <TouchableOpacity onPress={handleSubmit} className="mt-4 bg-blue-500 p-2 rounded-lg items-center">
        <Text className="text-white text-lg">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default JournalScreen;

