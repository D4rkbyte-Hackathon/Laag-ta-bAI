import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-6">This is the Profile Screen</Text>
      
      <TouchableOpacity 
        className="bg-gray-200 py-3 px-6 rounded-lg"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-black font-medium">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;