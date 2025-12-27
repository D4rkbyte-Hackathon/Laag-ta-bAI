import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { GradientBackground } from '../../../components/GradientBackground';
import { TopNavbar } from '../../../components/TopNavbar';

type RootStackParamList = {
  AIChat: { title: string };
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Data: Chat History ---
const AI_AVATAR = require('../../../../assets/logo/Logo-Icon.png');

const MOCK_MESSAGES = [
  {
    id: '1',
    text: "Hello! I'm your AI Guide. I see you're interested in Magellan's Cross. What would you like to know?",
    sender: 'ai',
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    text: "Who planted this cross?",
    sender: 'user',
    timestamp: '10:01 AM'
  },
  {
    id: '3',
    text: "It was planted by Portuguese and Spanish explorers as ordered by Ferdinand Magellan upon arriving in Cebu on April 21, 1521.",
    sender: 'ai',
    timestamp: '10:01 AM'
  },
  {
    id: '4',
    text: "Is this the real one from 1521?",
    sender: 'user',
    timestamp: '10:02 AM'
  },
  {
    id: '5',
    text: "That's a great question! The original cross is believed to be encased inside the wooden cross you see today. This was done to protect it from people who chipped away parts of it as souvenirs, believing it had miraculous powers.",
    sender: 'ai',
    timestamp: '10:02 AM'
  },
];

const AIChatScreen = ({ navigation }: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, 'AIChat'>>();
  const { title } = route.params || { title: "AI Guide" };
  const [inputText, setInputText] = useState('');
  
  // Ref for auto-scrolling to bottom
  const flatListRef = useRef<FlatList>(null);

  const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => {
    const isUser = item.sender === 'user';

    return (
      <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {/* AI Avatar (Only show on left) */}
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center mr-2 border border-white/10">
             <Image source={AI_AVATAR} className="w-5 h-5" resizeMode="contain" />
          </View>
        )}

        {/* Chat Bubble */}
        <View 
            className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                isUser 
                ? 'bg-background-light rounded-tr-none' // User Bubble (Light Background)
                : 'bg-white/10 border border-white/5 rounded-tl-none' // AI Bubble (Glass)
            }`}
        >
            <Text className={`${isUser ? 'text-background-dark font-bold' : 'text-gray-100'} text-base leading-5`}>
                {item.text}
            </Text>
            <Text className={`text-[10px] mt-1 text-right ${isUser ? 'text-background-dark/60' : 'text-gray-500'}`}>
                {item.timestamp}
            </Text>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <TopNavbar 
          title={`Chat: ${title}`}
          onBack={() => navigation.goBack()}
          // No right action needed for chat usually
      />

      <SafeAreaView edges={['bottom']} className="flex-1">
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            {/* --- CHAT LIST --- */}
            <FlatList
                ref={flatListRef}
                data={MOCK_MESSAGES}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                // Added paddingTop: 100 to avoid TopNavbar overlap
                contentContainerStyle={{ padding: 20, paddingBottom: 20, paddingTop: 120 }}
                showsVerticalScrollIndicator={false}
            />

            {/* --- INPUT AREA --- */}
            <View className="px-4 pb-4 pt-2">
                <View className="flex-row items-center bg-white/10 border border-white/10 rounded-3xl px-2 py-2 backdrop-blur-md">
                    
                    {/* Camera/Attachment Button (Optional) */}
                    <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white/5 mx-1">
                         <Ionicons name="camera-outline" size={22} color="#E69138" />
                    </TouchableOpacity>

                    {/* Text Input */}
                    <TextInput 
                        placeholder="Ask about this landmark..."
                        placeholderTextColor="#9CA3AF"
                        value={inputText}
                        onChangeText={setInputText}
                        className="flex-1 text-white text-base px-2 max-h-24"
                        multiline
                    />

                    {/* Send Button */}
                    <TouchableOpacity 
                        className={`w-10 h-10 items-center justify-center rounded-full ${
                            inputText.length > 0 ? 'bg-primary-dark' : 'bg-white/10'
                        }`}
                        disabled={inputText.length === 0}
                    >
                         <Ionicons 
                            name="send" 
                            size={18} 
                            color={inputText.length > 0 ? "#2B0E0E" : "#6B7280"} 
                            style={{ marginLeft: 2 }} // Optically center the send icon
                         />
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AIChatScreen;