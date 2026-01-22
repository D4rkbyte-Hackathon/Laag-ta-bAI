import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { GradientBackground } from '../../../components/GradientBackground';
import { TopNavbar } from '../../../components/TopNavbar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

type RootStackParamList = {
  LandmarkDetails: { landmarkId: string; title: string };
  MainTabs: { screen: string };
  AIChat: { landmarkId: string; title: string };
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Data ---
const MOCK_DATA = {
  title: "Magellan's Cross",
  location: "Cebu City, Philippines",
  rating: 4.8,
  image: require('../../../../assets/placeholder/Magellan.jpg'),
  sections: {
    about: "Magellan's Cross is a Christian cross planted by Portuguese and Spanish explorers as ordered by Ferdinand Magellan upon arriving in Cebu in the Philippines on April 21, 1521.",
    significance: "This site is a symbol of the birth of Christianity in the land. It houses the original cross inside a tindalo wood case to protect it from people who chipped away parts of it in the belief that it had miraculous powers.",
    history: "The kiosk that houses the cross was built in 1834. The ceiling of the kiosk is painted with a mural depicting the baptism of Rajah Humabon and his household by Fr. Pedro Valderrama.",
    trivia: "Did you know? Some historians believe the original cross has been destroyed or lost, and the one present today is a replica placed there by the Spaniards."
  }
};

const LandmarkDetails = ({ navigation }: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, 'LandmarkDetails'>>();
  const { title } = route.params || { title: MOCK_DATA.title };
  
  // UI State only for Text-to-Speech toggle
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Handlers ---
  const handleWebSearch = () => {
    const query = encodeURIComponent(title);
    Linking.openURL(`https://www.google.com/search?q=${query}`);
  };

  return (
    <GradientBackground>
      <TopNavbar 
          title="Landmark Details"
          onBack={() => navigation.goBack()}
          rightIcon="heart-outline"
          onRightAction={() => {
            // 1. Clear the stack! 
            // This closes the modal (and anything else) and goes back to the root (MainTabs)
            navigation.popToTop(); 
            // 2. Switch the tab
            // Now that we are back at MainTabs, we just switch the active screen
            navigation.navigate('MainTabs', { screen: 'Archives' });
        }}
      />

      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            <View className="w-full h-[500px] mb-6">
                <MaskedView
                    style={{ flex: 1 }}
                    maskElement={
                    <LinearGradient
                        colors={['black', 'black', 'transparent']}
                        locations={[0, 0.8, 1]}
                        style={{ flex: 1 }}
                    />
                    }
                >
                <Image
                source={MOCK_DATA.image}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                />
            </MaskedView>
            </View>

            {/* --- TITLE & INFO --- */}
            <View className="px-6 mb-6">
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-white font-extrabold text-3xl flex-1 mr-4">
                        {title}
                    </Text>
                    <View className="bg-primary-dark px-3 py-1 rounded-lg flex-row items-center">
                        <Ionicons name="star" size={14} color="#2B0E0E" />
                        <Text className="text-background-dark font-bold ml-1">{MOCK_DATA.rating}</Text>
                    </View>
                </View>

                <View className="flex-row items-center mb-6">
                    <Ionicons name="location-sharp" size={16} color="#E69138" />
                    <Text className="text-gray-300 ml-1 text-base">{MOCK_DATA.location}</Text>
                </View>

                {/* --- ACTION BUTTONS --- */}
                <View className="flex-row gap-3 mb-8">
                    {/* Chat with AI (Primary) */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AIChat', { title })}
                        className="flex-1 bg-primary-dark h-12 rounded-xl flex-row items-center justify-center shadow-lg shadow-yellow-500/20"
                    >
                        <Ionicons name="chatbubble-ellipses" size={20} color="#2B0E0E" />
                        <Text className="text-background-dark font-bold text-base ml-2">Ask bAI: The AI Guide</Text>
                    </TouchableOpacity>

                    {/* Text to Speech Button (UI Toggle Only) */}
                    <TouchableOpacity 
                        onPress={() => setIsSpeaking(!isSpeaking)}
                        className={`w-12 h-12 rounded-xl items-center justify-center border ${
                            isSpeaking ? 'bg-secondary border-secondary' : 'bg-white/10 border-white/10'
                        }`}
                    >
                         <Ionicons 
                            name={isSpeaking ? "volume-high" : "volume-medium-outline"} 
                            size={22} 
                            color={isSpeaking ? "#2B0E0E" : "white"} 
                         />
                    </TouchableOpacity>

                    {/* Google Search Button (Functional) */}
                    <TouchableOpacity 
                        onPress={handleWebSearch}
                        className="w-12 h-12 bg-white/10 rounded-xl items-center justify-center border border-white/10"
                    >
                         <Ionicons name="globe-outline" size={22} color="white" />
                    </TouchableOpacity>
                </View>

                {/* --- DYNAMIC SECTIONS --- */}
                <View className="gap-4">
                    {/* About Section */}
                    <View className="bg-white/5 border border-white/5 rounded-2xl p-5">
                        <Text className="text-secondary font-bold text-lg mb-2 uppercase tracking-wide">About</Text>
                        <Text className="text-gray-300 leading-6 text-base">{MOCK_DATA.sections.about}</Text>
                    </View>

                    {/* Significance Section */}
                    <View className="bg-white/5 border border-white/5 rounded-2xl p-5">
                        <Text className="text-secondary font-bold text-lg mb-2 uppercase tracking-wide">Significance</Text>
                        <Text className="text-gray-300 leading-6 text-base">{MOCK_DATA.sections.significance}</Text>
                    </View>

                    {/* History Section */}
                    <View className="bg-white/5 border border-white/5 rounded-2xl p-5">
                        <Text className="text-secondary font-bold text-lg mb-2 uppercase tracking-wide">History</Text>
                        <Text className="text-gray-300 leading-6 text-base">{MOCK_DATA.sections.history}</Text>
                    </View>

                    {/* Trivia Section */}
                    <View className="bg-secondary/10 border border-secondary/20 rounded-2xl p-5 flex-row">
                        <Ionicons name="bulb-outline" size={24} color="#E69138" />
                        <View className="ml-3 flex-1">
                            <Text className="text-secondary font-bold text-lg mb-2 uppercase tracking-wide">Trivia</Text>
                            <Text className="text-gray-300 leading-6 text-base italic">
                                "{MOCK_DATA.sections.trivia}"
                            </Text>
                        </View>
                    </View>
                </View>

            </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default LandmarkDetails;