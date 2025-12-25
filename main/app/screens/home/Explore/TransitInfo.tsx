import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Carousel from 'react-native-reanimated-carousel';
import { GradientBackground } from '../../../components/GradientBackground';
import { TopNavbar } from '../../../components/TopNavbar';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get('window');

// --- Mock Data ---
const TRANSPORT_MODES = [
  { 
    id: 'jeepney', 
    title: 'Modern Jeepney', 
    fare: '₱15.00 min', 
    icon: 'bus-outline', 
    description: 'Air-conditioned, comfortable, and safer. Key routes: IT Park, Ayala, Carbon.' 
  },
  { 
    id: 'trad-jeep', 
    title: 'Traditional Jeepney', 
    fare: '₱13.00 min', 
    icon: 'car-sport-outline', 
    description: 'The classic King of the Road. Open-air and goes almost everywhere.' 
  },
  { 
    id: 'taxi', 
    title: 'Taxi / Grab', 
    fare: 'Metered', 
    icon: 'car-outline', 
    description: 'Private and convenient. Available 24/7 via apps or hailing.' 
  },
  { 
    id: 'mybus', 
    title: 'MyBus', 
    fare: '₱25.00 - ₱50.00', 
    icon: 'bus', 
    description: 'Main bus line connecting Airport (MCIA) to SM City and Seaside.' 
  },
];

const COMMUTER_TIPS = [
  {
    id: 1,
    title: 'Pay Exact Change',
    icon: 'wallet-outline',
    content: 'Drivers appreciate small bills or coins ("barya"). Passing a ₱1000 bill for a ₱15 ride is a big no-no!'
  },
  {
    id: 2,
    title: 'Safety First',
    icon: 'shield-checkmark-outline',
    content: 'Keep your bag in front of you and avoid wearing flashy jewelry when riding traditional jeepneys.'
  },
  {
    id: 3,
    title: 'Jeepney Etiquette',
    icon: 'people-outline',
    content: 'Always "misod" (scoot over) to make room for new passengers. It is the unspoken rule of the road.'
  },
  {
    id: 4,
    title: 'Getting Off',
    icon: 'hand-left-outline',
    content: 'Say "Lugar lang!" (Stop here!) loudly or tap your coin on the metal rail when you want to get off.'
  },
];

const TransitInfo = ({ navigation }: Props) => {
  
  // Render Tip Card with Margin for spacing
  const renderTip = ({ item }: { item: typeof COMMUTER_TIPS[0] }) => (
    <View className="flex-1 px-2">
        <View className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 flex-row items-center h-full">
            <View className="bg-secondary/20 p-3 rounded-full mr-4">
                <Ionicons name={item.icon as any} size={28} color="#E69138" />
            </View>
            <View className="flex-1">
                <Text className="text-secondary font-bold text-lg mb-1">{item.title}</Text>
                <Text className="text-gray-300 text-sm leading-5">
                    {item.content}
                </Text>
            </View>
        </View>
    </View>
  );

  return (
    <GradientBackground>
      <TopNavbar 
          title="Local Commute"
          onBack={() => navigation.goBack()}
      />

      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 120 }}
          showsVerticalScrollIndicator={false}
        >
          
          {/* --- ROUTE FINDER (Restored) --- */}
          <View className="px-6 mb-8">
            <View className="bg-white/10 border border-white/10 rounded-2xl p-4">
                {/* From (Current Location) */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="radio-button-on" size={20} color="#FFC107" />
                    <Text className="text-white ml-3 font-medium">Your Current Location</Text>
                </View>
                
                {/* Connector Line */}
                <View className="absolute left-[29px] top-[34px] h-8 w-[1px] bg-white/30" />

                {/* To (Input) */}
                <View className="flex-row items-center bg-black/20 rounded-xl px-3 py-2 border border-white/5">
                    <Ionicons name="location" size={20} color="#FF5E3E" />
                    <TextInput 
                        placeholder="Enter destination..."
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-3 text-white font-medium"
                    />
                </View>

                {/* Find Route Button */}
                <TouchableOpacity className="mt-4 bg-primary-dark py-3 rounded-xl items-center shadow-lg">
                    <Text className="text-background-dark font-bold text-base">Find Route</Text>
                </TouchableOpacity>
            </View>
          </View>

          {/* --- MODES OF TRANSPORT --- */}
          <View className="px-6 mb-8">
            <Text className="text-white text-xl font-bold mb-4">Modes of Transport</Text>
            
            {TRANSPORT_MODES.map((mode) => (
                <TouchableOpacity 
                    key={mode.id}
                    className="bg-white/10 border border-white/5 rounded-2xl p-4 mb-3 flex-row items-start"
                    activeOpacity={0.7}
                >
                    <View className="bg-white/10 p-3 rounded-xl mr-4">
                        <Ionicons name={mode.icon as any} size={24} color="#FFC107" />
                    </View>
                    <View className="flex-1">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-white font-bold text-lg">{mode.title}</Text>
                            <View className="bg-primary-dark/20 px-2 py-1 rounded-md">
                                <Text className="text-primary-dark text-xs font-bold">{mode.fare}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-300 text-sm leading-5 opacity-80">
                            {mode.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
          </View>

          {/* --- COMMUTER TIPS CAROUSEL (Moved to Bottom) --- */}
          <View className="mb-4">
            <Text className="px-6 text-white text-xl font-bold mb-4">Daily Tips</Text>
            <Carousel
                loop
                width={width}
                height={120}
                autoPlay={true}
                autoPlayInterval={4000}
                data={COMMUTER_TIPS}
                scrollAnimationDuration={1000}
                renderItem={renderTip}
                // Mode config for nicer spacing effect
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default TransitInfo;