// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import MyJourneyScreen from './screens/MyJourneyScreen';
import JournalScreen from './screens/JournalScreen';
import ContactsScreen from './screens/ContactsScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import AboutMeScreen from './screens/AboutMeScreen';
import ViewJournalEntriesScreen from './screens/ViewJournalEntriesScreen';
import MoodLog from './screens/MoodLog';
import RelapseForm from './screens/RelapseForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="My Journey" component={MyJourneyScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="ViewJournalEntries" component={ViewJournalEntriesScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="About Me" component={AboutMeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="MoodLog" component={MoodLog} />
        <Stack.Screen name="Relapse Form" component={RelapseForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}