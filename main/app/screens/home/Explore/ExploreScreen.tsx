import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const ExploreScreen = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-gray-50 flex-1">
      <Text className="text-3xl font-bold mb-6 text-gray-800">Explore Cebu</Text>
      
      {/* Main Action: SCAN */}
      <TouchableOpacity 
        className="bg-blue-600 p-6 rounded-xl mb-6 shadow-md"
        onPress={() => navigation.navigate('Scan')}
      >
        <Text className="text-white text-center font-bold text-xl">📷 Scan Landmark</Text>
      </TouchableOpacity>

      {/* Grid for other sections */}
      <View className="flex-row flex-wrap justify-between">
        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-sm" onPress={() => navigation.navigate('FullMap')}>
          <Text className="font-bold text-lg">🗺️ Map</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-sm" onPress={() => navigation.navigate('Transit')}>
          <Text className="font-bold text-lg">🚌 Transit</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-sm" onPress={() => navigation.navigate('Archives')}>
          <Text className="font-bold text-lg">📂 Archives</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-sm" onPress={() => navigation.navigate('Mastery')}>
          <Text className="font-bold text-lg">🏆 Mastery</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-lg mb-4 shadow-sm" onPress={() => navigation.navigate('Profile')}>
          <Text className="font-bold text-lg">👤 Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ExploreScreen;