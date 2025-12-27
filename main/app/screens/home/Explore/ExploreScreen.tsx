import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GradientBackground } from '../../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Data ---
const PLACEHOLDER_IMG = require('../../../../assets/logo/Logo-Icon.png');

const NEARBY_PLACES = [
  { id: 1, title: 'Yap-Sandiego House', distance: '0.4 km', image: PLACEHOLDER_IMG },
  { id: 2, title: 'Heritage Monument', distance: '0.8 km', image: PLACEHOLDER_IMG },
  { id: 3, title: 'Casa Gorordo', distance: '1.2 km', image: PLACEHOLDER_IMG },
];

const POPULAR_LANDMARKS = [
  { id: 1, title: 'Magellan\'s Cross', rating: '4.8', image: PLACEHOLDER_IMG },
  { id: 2, title: 'Fort San Pedro', rating: '4.7', image: PLACEHOLDER_IMG },
  { id: 3, title: 'Basilica del Santo Niño', rating: '4.9', image: PLACEHOLDER_IMG },
];

// --- Theme Colors (Based on your config/usage) ---
const COLORS = {
  primary: '#FFC107',   // Yellow
  secondary: '#FF5E3E', // Orange/Gold
  accent: '#B71C1C',    // Red/Orange
  text: '#FFFFFF',
};

const ExploreScreen = ({ navigation }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 80 }} 
          showsVerticalScrollIndicator={false}
          // Important: Helps prevent ScrollView from stealing map touches
          scrollEventThrottle={16}
        >
          
          {/* --- HEADER --- */}
          <View className="px-6 pt-4 mb-6 items-center">
            <Text className="text-primary-dark font-extrabold text-4xl tracking-tight text-center">
              Explore
            </Text>
            <Text className="text-gray-300 text-base mt-1 opacity-80 text-center">
              Discover the heart of Cebu
            </Text>
          </View>

          {/* --- SEARCH BAR --- */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-3">
              {/* Changed to Secondary Color */}
              <Ionicons name="search" size={20} color={COLORS.secondary} />
              <TextInput 
                placeholder="Search landmarks, museums..."
                placeholderTextColor="#9CA3AF" 
                className="flex-1 ml-3 text-white text-base"
              />
              <TouchableOpacity>
                 <Ionicons name="options-outline" size={20} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- INTERACTIVE MAP SECTION --- */}
          <View className="px-6 mb-8">
              {/* Increased Height to h-80 (approx 320px) */}
              <View className="h-80 w-full rounded-3xl overflow-hidden border border-white/20 relative shadow-lg shadow-black/50">
                  <MapView
                      style={{ width: '100%', height: '100%' }}
                      initialRegion={{
                          latitude: 10.3157,
                          longitude: 123.8854,
                          latitudeDelta: 0.05,
                          longitudeDelta: 0.05,
                      }}
                      region={location ? {
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                      } : undefined}
                      showsUserLocation={true}
                      // --- ENABLED INTERACTIONS ---
                      scrollEnabled={true}
                      zoomEnabled={true}
                      pitchEnabled={true}
                      rotateEnabled={true}
                  >
                      <Marker 
                          coordinate={{ latitude: 10.3157, longitude: 123.8854 }}
                          title="Magellan's Cross"
                          pinColor={COLORS.accent} // Use Accent Color for Marker
                      />
                  </MapView>
                  
                  {/* Expand Button (Kept as requested) */}
                  <TouchableOpacity 
                      onPress={() => navigation.navigate('FullMap')}
                      className="absolute top-3 left-3 bg-secondary p-3 rounded-full shadow-lg"
                  >
                      <Ionicons name="expand" size={20} color="#2B0E0E" />
                  </TouchableOpacity>
              </View>
          </View>

          {/* --- NEARBY YOU --- */}
          <View className="mb-8">
              <View className="px-6 mb-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white text-2xl font-bold">Nearby You</Text>
                    <TouchableOpacity>
                        {/* Changed to Accent Color */}
                        <Ionicons name="arrow-forward" size={24} color={COLORS.accent} />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-gray-400 text-sm mt-1">Within a 5 km radius</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                  {NEARBY_PLACES.map((place) => (
                      <TouchableOpacity 
                          key={place.id}
                          activeOpacity={0.8}
                          className="mr-4 w-44 bg-white/10 border border-white/5 rounded-2xl p-3"
                      >
                          <View className="w-full h-32 rounded-xl mb-3 bg-white/5 p-4 items-center justify-center">
                              <Image 
                                  source={place.image}
                                  className="w-full h-full"
                                  resizeMode="contain"
                              />
                          </View>
                          <Text className="text-white font-bold text-base mb-1" numberOfLines={1}>{place.title}</Text>
                          <View className="flex-row items-center">
                              {/* Changed to Secondary Color */}
                              <Ionicons name="location-sharp" size={14} color={COLORS.secondary} />
                              <Text className="text-gray-300 text-xs ml-1">{place.distance}</Text>
                          </View>
                      </TouchableOpacity>
                  ))}
              </ScrollView>
          </View>

          {/* --- POPULAR LANDMARKS --- */}
          <View className="px-6 mb-4">
              <View className="mb-4">
                  <Text className="text-white text-2xl font-bold">Popular Landmarks</Text>
                  <Text className="text-gray-400 text-sm mt-1">Must-visit heritage sites</Text>
              </View>
              
              {POPULAR_LANDMARKS.map((landmark) => (
                  <TouchableOpacity 
                      key={landmark.id}
                      className="flex-row bg-white/5 border border-white/5 rounded-2xl p-3 mb-3 items-center"
                      activeOpacity={0.7}
                  >
                       <View className="w-20 h-20 rounded-xl mr-4 bg-white/5 p-2 items-center justify-center">
                          <Image 
                              source={landmark.image}
                              className="w-full h-full"
                              resizeMode="contain"
                          />
                      </View>
                      <View className="flex-1">
                          <View className="flex-row justify-between items-start">
                              <Text className="text-white font-bold text-lg flex-1 mr-2">{landmark.title}</Text>
                              <View className="flex-row items-center bg-black/40 px-2 py-1 rounded-lg">
                                  {/* Star stays Primary (Yellow) usually, but could be Secondary */}
                                  <Ionicons name="star" size={12} color={COLORS.primary} />
                                  <Text className="text-white text-xs font-bold ml-1">{landmark.rating}</Text>
                              </View>
                          </View>
                          <Text className="text-gray-400 text-xs mt-1">Heritage Site • Cebu City</Text>
                          <View className="flex-row mt-2">
                               <View className="bg-primary-dark/20 px-2 py-1 rounded-md border border-primary-dark/20">
                                  <Text className="text-primary-dark text-[10px] font-bold uppercase tracking-wide">Historical</Text>
                               </View>
                          </View>
                      </View>
                  </TouchableOpacity>
              ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ExploreScreen;