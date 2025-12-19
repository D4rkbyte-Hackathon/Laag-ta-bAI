import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  FadeIn, 
  FadeInDown 
} from 'react-native-reanimated';

// Define navigation types for TypeScript
type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    // Navigate to Onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding'); 
    }, 3000);

    return () => clearTimeout(timer); // Cleanup if user exits
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-background-light items-center justify-center">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF4" />
      
      {/* Container for Logo Elements */}
      <View className="items-center justify-center space-y-6">
        
        {/* 1. Logo Icon: Elegant Fade In (No Bounce) */}
        <Animated.Image 
          entering={FadeIn.duration(1200)}
          source={require('../../../assets/logo/Logo-Icon.png')} 
          className="w-48 h-48" 
          resizeMode="contain"
        />
        
        {/* 2. Logo Text: Gentle Slide Up & Fade (Professional & Smooth) */}
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(400)}
          className="mt-4"
        >
          <Animated.Image 
            source={require('../../../assets/logo/Logo-Text.png')} 
            className="w-72 h-24" 
            resizeMode="contain"
          />
        </Animated.View>

        {/* 3. Tagline: Subtle Fade In last */}
        <Animated.View 
          entering={FadeIn.duration(1000).delay(1000)}
          className="items-center"
        >
          <Text className="text-text-light font-medium text-lg mt-2 tracking-widest text-center">
            Discover Cebu's Heritage.
          </Text>
          <Text className="text-text-light font-medium text-lg mt-1 tracking-widest text-center">
            One Photo at a Time.
          </Text>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;