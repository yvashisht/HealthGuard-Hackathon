import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyJourneyScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const loadMarkedDates = async () => {
      try {
        const savedMarkedDates = await AsyncStorage.getItem('markedDates');
        if (savedMarkedDates !== null) {
          setMarkedDates(JSON.parse(savedMarkedDates));
        }
      } catch (error) {
        console.error('Error loading marked dates:', error);
      }
    };

    loadMarkedDates();
  }, []);

  const saveMarkedDates = async (dates) => {
    try {
      await AsyncStorage.setItem('markedDates', JSON.stringify(dates));
    } catch (error) {
      console.error('Error saving marked dates:', error);
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedOption(null); // Reset selected option when selecting a new date
    // Here, you can load saved data for the selected date if available
  };

  const handleSelectOption = (option, date) => {
    setSelectedOption(option);
    const updatedMarkedDates = {
      ...markedDates,
      [date]: { selected: true, selectedColor: option === 'Yes' ? 'red' : 'green' }
    };
    setMarkedDates(updatedMarkedDates);
    saveMarkedDates(updatedMarkedDates); // Save marked dates

    if (option === 'Yes') {
      // Navigate to RelapseForm screen
      navigation.navigate('RelapseForm');
    }
  };

  return (
    <View className='bg-blue-100' style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Calendar
          style={{ marginBottom: 20 }}
          onDayPress={(day) => handleSelectDate(day.dateString)}
          markedDates={markedDates}
        />
        {selectedDate && (
          <View>
            <Text style={{ fontSize: 20 }}>Did you use any substances on {selectedDate}?</Text>
            <TouchableOpacity
              style={{
                backgroundColor: selectedOption === 'Yes' ? 'red' : 'lightgreen',
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
              onPress={() => handleSelectOption('Yes', selectedDate)}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: selectedOption === 'No' ? 'green' : 'lightcoral',
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
              onPress={() => handleSelectOption('No', selectedDate)}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>No</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyJourneyScreen;
