import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SplashScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-3xl font-bold text-white mb-6">Laag ta bAI!</Text>
      <TouchableOpacity 
        className="bg-white py-3 px-8 rounded-full"
        onPress={() => navigation.replace('Welcome')}
      >
        <Text className="text-blue-500 font-bold">Start Journey</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SplashScreen;