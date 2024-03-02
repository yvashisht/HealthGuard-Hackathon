// screens/ContactScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

import { Button } from "react-native";

interface ListItemProps {
  text: string;
  onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.item}>{text}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  // Define your dictionary of contacts with names as keys and phone numbers as values
  const contactNumbers = {
    "Alberta 24/7 Helpline": "18773032642",
    "Alberta Health Link": "811",
    "National Overdose Response Service (NORS)": "18886886677",
    // Add more contacts as needed
    // this is added to a scrollable list, so can make as long as we can
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

  // Function to handle the button press for a specific contact
  const handleItemClick = (contactName) => {
    const phoneNumber = contactNumbers[contactName];
    if (phoneNumber) {
      handlePhoneCall(contactName, phoneNumber);
    } else {
      Alert.alert("Error", "Contact not found!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contacts</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {Object.keys(contactNumbers).map((contactName) => (
          <View key={contactName} style={{ marginBottom: 10 }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    alignItems: "flex-start",
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
