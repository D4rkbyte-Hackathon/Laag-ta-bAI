import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Mactan Gateway</Text>
      <Text className="mb-8 text-gray-500 text-center px-4">Welcome to Cebu! Let's get you exploring.</Text>
      
      <TouchableOpacity 
        className="bg-green-600 py-4 px-10 rounded-lg"
        onPress={() => navigation.replace('Explore')} // Goes to Home
      >
        <Text className="text-white font-bold text-lg">Enter App</Text>
      </TouchableOpacity>
    </View>
  );
};
export default WelcomeScreen;