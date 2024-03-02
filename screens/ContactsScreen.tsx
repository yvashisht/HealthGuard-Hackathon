import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from "react-native";
import { Button } from "react-native";
import { SearchBar } from '../components/searchBar';

interface ListItemProps {
  text: string;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-2">
      <Text className="text-base">{text}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const contactNumbers = {
    "Alberta 24/7 Helpline": "18773032642",
    "Alberta Health Link": "811",
    "National Overdose Response Service (NORS)": "18886886677",
    // Add more contacts as needed
  };

  const handlePhoneCall = (contactName, phoneNumber) => {
    Alert.alert(
      "Confirm Call",
      `Are you sure you want to call ${contactName}?\nPhone number: ${phoneNumber}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${phoneNumber}`),
        },
      ],
      { cancelable: true }
    );
  };

  const handleItemClick = (contactName) => {
    const phoneNumber = contactNumbers[contactName];
    if (phoneNumber) {
      handlePhoneCall(contactName, phoneNumber);
    } else {
      Alert.alert("Error", "Contact not found!");
    }
  };

  return (
    <View className="bg-blue-100 flex-1 items-center justify-start pt-12 p-2">
      <Text className="text-xl font-bold mb-4">Contacts</Text>
      <ScrollView className="w-full" contentContainerStyle={{ alignItems: 'center' }}>
        <SearchBar />
        {Object.keys(contactNumbers).map((contactName) => (
          <View key={contactName} className="mb-2 w-11/12">
            <Button
              title={`${contactName}`}
              onPress={() => handleItemClick(contactName)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
