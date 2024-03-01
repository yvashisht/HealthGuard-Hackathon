// screens/SignInScreen.tsx
import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ onSignIn }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "1020066039198-l2tbnqldmt348bf9cva0qnas6h2g9kon.apps.googleusercontent.com",
    webClientId: "1020066039198-5b4j5cm8tnku2t12s60rgsdo0tmn0e0m.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      AsyncStorage.setItem('userToken', authentication.accessToken);
      onSignIn(authentication);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button disabled={!request} title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
};

export default SignInScreen;
