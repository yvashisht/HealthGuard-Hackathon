import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyJourneyScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedOption(null); // Reset selected option when selecting a new date
    // Here, you can load saved data for the selected date if available
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    const updatedMarkedDates = {
      ...markedDates,
      [selectedDate]: { selected: true, selectedColor: option === 'Yes' ? 'red' : 'green' }
    };
    setMarkedDates(updatedMarkedDates);
    // Here, you can save the selected option for the selected date
  };

  return (
    <View style={{ flex: 1 }}>
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
              onPress={() => handleSelectOption('Yes')}
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
              onPress={() => handleSelectOption('No')}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>No</Text>
            </TouchableOpacity>
            {selectedOption && (
              <Text style={{ fontSize: 20, marginTop: 20 }}>You selected: {selectedOption}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default MyJourneyScreen;
