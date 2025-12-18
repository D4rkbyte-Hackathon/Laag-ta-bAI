import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ScanScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white mb-10">[ Camera View Placeholder ]</Text>
      
      <TouchableOpacity 
        className="bg-white w-20 h-20 rounded-full border-4 border-gray-300 items-center justify-center"
        onPress={() => navigation.navigate('Identifying')}
      >
        <View className="bg-red-500 w-16 h-16 rounded-full" />
      </TouchableOpacity>
      
      <Text className="text-white mt-4">Tap to Simulate Capture</Text>
    </View>
  );
};
export default ScanScreen;