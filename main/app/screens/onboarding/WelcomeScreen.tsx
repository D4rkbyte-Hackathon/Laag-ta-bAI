import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  FadeIn
} from 'react-native-reanimated';
import { GradientBackground } from '../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get('window');

// Reusable Option Card Component
const GatewayOption = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  delay 
}: { 
  icon: keyof typeof Ionicons.glyphMap; 
  title: string; 
  subtitle: string;
  onPress: () => void;
  delay: number;
}) => (
  <Animated.View entering={FadeInDown.delay(delay).duration(600).springify()}>
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-white/10 border border-white/5 p-4 rounded-2xl mb-3"
    >
      <View className="bg-secondary/20 w-12 h-12 rounded-full items-center justify-center mr-4">
        <Ionicons name={icon} size={24} color="#FF5E3E" />
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{title}</Text>
        <Text className="text-gray-300 text-xs opacity-80">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  </Animated.View>
);

const WelcomeScreen = ({ navigation }: Props) => {

  const handleNavigation = (screen: string) => {
    // Navigate to the MainTabs, then specific screen
    // Note: Ensure your Tab Navigator route names match these (Scan, Mastery, Profile)
    navigation.replace('MainTabs', { screen }); 
  };

  const handleEnterCebu = () => {
    // Default entry goes to Explore (Home)
    navigation.replace('MainTabs', { screen: 'Explore' });
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          
          {/* Top Section: Visual Only (No Badge) */}
          <View className="items-center mt-6 mb-8 px-6">
              {/* Main Visual: Mactan Airport Arches */}
              <Animated.View 
                  entering={FadeInUp.delay(200).duration(1000).springify()}
                  className="w-full items-center shadow-2xl shadow-black/50"
              >
                  <View className="w-full aspect-square rounded-[40px] overflow-hidden border-4 border-white/20">
                       <Image 
                          // Replace pic of MCIA or pwede sad vid/gif sa diff places in cebu
                          source={require('../../../assets/onboarding/welcome.jpg')}
                          className="w-full h-full"
                          resizeMode="cover"
                      />
                      <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                  </View>

                  {/* Floating Icon Badge */}
                  <View className="absolute -bottom-6 bg-secondary w-16 h-16 rounded-full items-center justify-center border-4 border-[#2B0E0E] shadow-xl">
                      <Ionicons name="airplane" size={32} color="#2B0E0E" />
                  </View>
              </Animated.View>
          </View>

          {/* Bottom Content Section */}
          <Animated.View 
              entering={FadeIn.delay(400).duration(800)}
              className="px-6 w-full"
          >
              <View className="items-center mb-8">
                  <Text className="text-light-green text-3xl font-extrabold mb-1 tracking-tight text-center">
                      Maayong pag abot!
                  </Text>
                  <Text className="text-white text-lg font-medium mb-4 tracking-widest opacity-90 uppercase">
                      Welcome to Mactan
                  </Text>
                  
                  {/* Enhanced Description from Concept Paper */}
                  <Text className="text-gray-300 text-center leading-6 text-sm px-2">
                    You've arrived at Mactan-Cebu International Airport. Start your journey by exploring the rich history and culture of this beautiful destination. 
                  </Text>
                  <Text className="text-gray-300 text-center leading-6 text-sm px-2 mt-2">
                    Skip the arrival chaos— <Text className="text-primary-dark font-bold">Laag ta bAI</Text> is ready to guide you to hidden gems right from the terminal.
                  </Text>
              </View>

              {/* Quick Access Options */}
              <View className="mb-6">
                <Text className="text-white/60 text-xs font-bold mb-3 uppercase tracking-wider ml-1">
                  Immediate Services
                </Text>
                
                <GatewayOption 
                  icon="scan-outline"
                  title="Scan Landmark"
                  subtitle="Identify what's around you instantly"
                  delay={500}
                  onPress={() => handleNavigation('Scan')}
                />
                <GatewayOption 
                  icon="trophy-outline"
                  title="My Badges"
                  subtitle="Check your mastery progress"
                  delay={600}
                  onPress={() => handleNavigation('Mastery')}
                />
                <GatewayOption 
                  icon="person-outline"
                  title="Travel Profile"
                  subtitle="View your journal and settings"
                  delay={700}
                  onPress={() => handleNavigation('Profile')}
                />
              </View>

              {/* Main Action Button */}
              <TouchableOpacity
                  onPress={handleEnterCebu}
                  activeOpacity={0.8}
                  className="bg-primary-dark w-full py-4 rounded-xl items-center shadow-lg shadow-yellow-900/20"
              >
                  <View className="flex-row items-center">
                      <Text className="text-background-dark text-lg font-bold mr-2">
                          START EXPLORING
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color="#2B0E0E" />
                  </View>
              </TouchableOpacity>

          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default WelcomeScreen;