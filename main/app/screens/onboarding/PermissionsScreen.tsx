import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  FadeInDown, 
  FadeIn
} from 'react-native-reanimated';
import { GradientBackground } from '../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// Reusable Permission Item Component
const PermissionItem = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: keyof typeof Ionicons.glyphMap; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <Animated.View 
    entering={FadeInDown.delay(delay).duration(600).springify()}
    className="flex-row items-center bg-white/10 rounded-2xl p-4 mb-4 border border-white/5"
  >
    <View className="bg-secondary/20 p-3 rounded-full mr-4">
      <Ionicons name={icon} size={24} color="#FF5E3E" />
    </View>
    <View className="flex-1">
      <Text className="text-white text-lg font-bold mb-1">{title}</Text>
      <Text className="text-gray-300 text-sm leading-5 opacity-80">
        {description}
      </Text>
    </View>
    {/* Visual-only Toggle */}
    <View className="ml-2">
       <Ionicons name="radio-button-off" size={24} color="#666" />
    </View>
  </Animated.View>
);

const PermissionsScreen = ({ navigation }: Props) => {

  const handleContinue = () => {
    navigation.replace('Welcome'); 
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1 px-6 justify-between">
        
        {/* Header Section - Centered & Larger Icon */}
        <View className="mt-12 items-center">
          <Animated.View entering={FadeIn.delay(200).duration(800)} className="items-center">
            
            {/* Icon: No Background, Larger Size (80) */}
            <View className="mb-6">
                <Ionicons name="shield-checkmark-outline" size={80} color="#FFC107" />
            </View>

            {/* Centered Text */}
            <Text className="text-white text-3xl font-bold mb-3 text-center">
              Enable Access
            </Text>
            <Text className="text-gray-300 text-base leading-6 text-center px-4">
              To provide the full Laag-ta-bAI experience, we need access to the following:
            </Text>
          </Animated.View>
        </View>

        {/* Permissions List */}
        <View className="flex-1 justify-center mt-4">
            <PermissionItem 
              icon="camera-outline" 
              title="Camera" 
              description="To scan landmarks and identify historical sites instantly."
              delay={400}
            />
            <PermissionItem 
              icon="mic-outline" 
              title="Microphone" 
              description="To interact with your AI local guide via voice commands."
              delay={600}
            />
            <PermissionItem 
              icon="images-outline" 
              title="Photo Library" 
              description="To save your badges, scanned history, and travel journals."
              delay={800}
            />
        </View>

        {/* Footer Actions */}
        <Animated.View 
          entering={FadeInDown.delay(1000).springify()}
          className="mb-8 w-full items-center"
        >
          {/* Note added above the button */}
          <Text className="text-white/40 text-xs mb-3 text-center">
            You can allow permissions in settings later
          </Text>

          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.8}
            className="bg-primary-dark w-full py-4 rounded-xl items-center shadow-lg shadow-black/40"
          >
            <Text className="text-background-dark text-lg font-bold">
              ALLOW PERMISSIONS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.replace('Welcome')}
            className="mt-4 items-center p-2"
          >
            <Text className="text-gray-400 text-sm font-medium">
              Maybe Later
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </SafeAreaView>
    </GradientBackground>
  );
};

export default PermissionsScreen;