// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import MyJourneyScreen from './screens/MyJourneyScreen';
import JournalScreen from './screens/JournalScreen';
import ContactsScreen from './screens/ContactsScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import AboutMeScreen from './screens/AboutMeScreen';
import SignInScreen from './screens/SignInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    // Check for an existing user token on app startup
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to load user token', e);
      }
    };

    bootstrapAsync();
  }, []);

  const onSignIn = async (authData) => {
    try {
      await AsyncStorage.setItem('userToken', authData.accessToken);
      setUserToken(authData.accessToken); // Update state to reflect user sign-in
    } catch (e) {
      console.error('Failed to save user token', e);
    }
  };

  const onSignOut = async () => {
  try {
    await AsyncStorage.removeItem('userToken'); // Remove the token from storage
    setUserToken(null); // Update app state to reflect sign-out
  } catch (e) {
    console.error('Error signing out: ', e);
  }
};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // User is signed in, show the app screens
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="My Journey" component={MyJourneyScreen} />
            <Stack.Screen name="Journal" component={JournalScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} />
            <Stack.Screen name="About Me" component={AboutMeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <Stack.Screen name="SignIn" options={{ headerShown: false }}>
            {props => <SignInScreen {...props} onSignIn={onSignIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
