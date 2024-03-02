import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewJournalEntriesScreen = ({navigation}) => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const entries = await AsyncStorage.getItem('journalEntries');
        if (entries) {
          setJournalEntries(JSON.parse(entries));
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchJournalEntries();
  }, []);

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4">Journal Entries</Text>
      {journalEntries.map((entry, index) => (
        <View key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
          <Text className="text-lg mb-2">Date: {new Date(entry.date).toLocaleDateString()}</Text>
          {Object.entries(entry.ratings).map(([emotion, rating]) => (
            <Text key={emotion}>{`${emotion}: ${rating}`}</Text>
          ))}
          <Text className="mt-2">{entry.freeEntry}</Text>
        </View>
      ))}
      {journalEntries.length === 0 && <Text>No journal entries found.</Text>}
    </ScrollView>
  );
};

export default ViewJournalEntriesScreen;
