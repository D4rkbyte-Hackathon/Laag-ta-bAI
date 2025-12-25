import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TopNavbar } from '../../../components/TopNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const FullMapView = ({ navigation }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Recenter Map Function
  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  return (
    <View className="flex-1 bg-background-light">
      <StatusBar barStyle="dark-content" />

      {/* --- TOP NAVBAR --- */}
      <TopNavbar 
          title="Full Map View"
          onBack={() => navigation.goBack()}
          rightIcon="compass-outline"
          onRightAction={() => navigation.navigate('TransitInfo')} 
      />

      {/* --- MAP CONTAINER --- */}
      <View className="flex-1 relative">
        <MapView
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            style={{ width: '100%', height: '100%' }}
            mapType={mapType}
            initialRegion={{
                latitude: 10.3157,
                longitude: 123.8854,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            showsCompass={false}
            mapPadding={{ top: 0, right: 0, bottom: 20, left: 0 }}
        />

        {/* --- BOTTOM FLOATING ACTION BUTTONS (Uniform Size) --- */}
        <View className="absolute bottom-16 right-5 gap-4">
            {/* Map Layer Toggle */}
            <TouchableOpacity 
                onPress={() => setMapType(prev => prev === 'standard' ? 'satellite' : 'standard')}
                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg shadow-black/20"
            >
                <Ionicons name={mapType === 'standard' ? "layers-outline" : "map-outline"} size={22} color="#2B0E0E" />
            </TouchableOpacity>

            {/* Recenter Button - Same Size (w-12 h-12) */}
            <TouchableOpacity 
                onPress={handleRecenter}
                className="w-12 h-12 bg-primary-dark rounded-full items-center justify-center shadow-xl shadow-yellow-500/30"
            >
                <Ionicons name="locate" size={24} color="#2B0E0E" />
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default FullMapView;