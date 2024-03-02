import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RelapseForm = ({ navigation }) => {
  const [substancesUsed, setSubstancesUsed] = useState('');
  const [explanation, setExplanation] = useState('');
  const [trigger, setTrigger] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedInputs, setSavedInputs] = useState({});

  useEffect(() => {
    const loadSavedInputs = async () => {
      try {
        const savedInputs = await AsyncStorage.getItem('savedInputs');
        if (savedInputs !== null) {
          setSavedInputs(JSON.parse(savedInputs));
        }
      } catch (error) {
        console.error('Error loading saved inputs:', error);
      }
    };

    loadSavedInputs();
  }, []);

  const handleSave = async () => {
    try {
      const updatedSavedInputs = {
        ...savedInputs,
        [selectedDate]: {
          substancesUsed,
          explanation,
          trigger
        }
      };
      await AsyncStorage.setItem('savedInputs', JSON.stringify(updatedSavedInputs));
      console.log('User input saved successfully!');
    } catch (error) {
      console.error('Error saving user input:', error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    const inputForSelectedDate = savedInputs[date.dateString];
    if (inputForSelectedDate) {
      setSubstancesUsed(inputForSelectedDate.substancesUsed);
      setExplanation(inputForSelectedDate.explanation);
      setTrigger(inputForSelectedDate.trigger);
    } else {
      setSubstancesUsed('');
      setExplanation('');
      setTrigger('');
    }
  };

  return (
    <ScrollView className='bg-blue-100' contentContainerStyle={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }
        }}
      />
      <Text style={styles.heading}>What substances did you use?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter substances used"
        value={substancesUsed}
        onChangeText={setSubstancesUsed}
      />
      <Text style={styles.heading}>Explain how much substance you used:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Explanation"
        multiline
        value={explanation}
        onChangeText={setExplanation}
      />
      <Text style={styles.heading}>What were you doing when you decided to use it? Did anything happen that triggered you to use it?</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter trigger information"
        multiline
        value={trigger}
        onChangeText={setTrigger}
      />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
});

export default RelapseForm;
