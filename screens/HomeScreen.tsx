// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logoNoBg from '../assets/Logo-no-bg.png'; 
import { Button } from 'react-native';

const HomeScreen = ({navigation, onSignOut}) => {

  const menuItems = [
    { title: "My Journey", navigateTo: "My Journey" },
    { title: "Journal", navigateTo: "Journal" },
    { title: "Contacts", navigateTo: "Contacts" },
    { title: "Appointments", navigateTo: "Appointments" },
    { title: "About Me", navigateTo: "About Me" },
    { title: "Sign In", navigateTo: "Sign In"},
    { title: "Settings", navigateTo: "Settings" },
    // Add more menu items here
  ];

  return (
    <View className='flex-1 items-center justify-center bg-blue-100'>
      <View className='flex-row items-center'>
        <Image source={logoNoBg} className='w-10 h-10 bg-white-200' />
        <Text className='text-2xl font-bold'>Welcome to HealthGuard!</Text>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.navigateTo)}
          className='py-3 px-6 bg-blue-500 rounded-full my-3 items-center'>
          <Text className='text-white text-lg font-bold'>{item.title}</Text>
        </TouchableOpacity>
      ))}
      {/* Sign Out Button */}
      <TouchableOpacity onPress={onSignOut} className='py-3 px-6 bg-red-500 rounded-full my-3 items-center'>
        <Text className='text-white text-lg font-bold'>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
