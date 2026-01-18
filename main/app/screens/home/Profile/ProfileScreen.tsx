import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Data ---
const PROFILE_PIC = require('../../../../assets/logo/Logo-Icon.png');
const TEAM_MEMBERS = [
    "John Michael A. Nave",
    "James Andrew S. Ologuin",
    "John Zachary N. Gillana",
    "John Peter D. Pestaño",
    "Jordan A. Cabandon"
];

const ProfileScreen = ({ navigation }: Props) => {
  // --- UI State ---
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // --- Handlers ---
  const handleExitApp = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to close Laag-ta-bAI?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: () => BackHandler.exitApp() }
      ]
    );
  };

  const handleLogout = () => {
    navigation.navigate('Login')
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            
            {/* --- 1. EDIT PROFILE HEADER --- */}
            <View className="items-center mt-6 mb-8 px-6">
                <View className="relative">
                    <View className="w-28 h-28 rounded-full border-4 border-primary-dark/50 bg-white/10 items-center justify-center overflow-hidden mb-4">
                        <Image source={PROFILE_PIC} className="w-20 h-20" resizeMode="contain" />
                    </View>
                    {/* Edit Icon Badge */}
                    <TouchableOpacity className="absolute bottom-4 right-0 bg-secondary p-2 rounded-full border border-background-dark">
                        <Ionicons name="pencil" size={16} color="#2B0E0E" />
                    </TouchableOpacity>
                </View>
                
                <Text className="text-white font-extrabold text-2xl tracking-wide">Juan Dela Cruz</Text>
                <Text className="text-gray-400 text-sm italic mb-4">"Lover of history and heritage."</Text>

                {/* Quick Edit Bio Button */}
                <TouchableOpacity className="bg-white/10 px-4 py-2 rounded-full border border-white/5">
                    <Text className="text-gray-300 text-xs font-bold">Edit Bio</Text>
                </TouchableOpacity>
            </View>

            {/* --- 2. SETTINGS SECTION --- */}
            <View className="px-6 mb-6">
                <Text className="text-secondary font-bold text-xs uppercase mb-3 ml-2 tracking-widest">Settings</Text>
                
                <View className="bg-white/10 border border-white/5 rounded-3xl overflow-hidden">
                    
                    {/* Language */}
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-white/5 active:bg-white/5">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-blue-500/20 items-center justify-center mr-3">
                                <Ionicons name="language" size={18} color="#60A5FA" />
                            </View>
                            <Text className="text-white font-medium">Language</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-gray-400 text-sm mr-2">English</Text>
                            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                        </View>
                    </TouchableOpacity>

                    {/* Dark Mode Toggle */}
                    <View className="flex-row items-center justify-between p-4 border-b border-white/5">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-purple-500/20 items-center justify-center mr-3">
                                <Ionicons name="moon" size={18} color="#A78BFA" />
                            </View>
                            <Text className="text-white font-medium">Dark Mode</Text>
                        </View>
                        <Switch 
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: "#374151", true: "#E69138" }}
                            thumbColor={isDarkMode ? "#ffffff" : "#9CA3AF"}
                        />
                    </View>

                    {/* Notifications Toggle */}
                    <View className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-red-500/20 items-center justify-center mr-3">
                                <Ionicons name="notifications" size={18} color="#F87171" />
                            </View>
                            <Text className="text-white font-medium">Notifications</Text>
                        </View>
                        <Switch 
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#374151", true: "#4CAF50" }}
                            thumbColor={notificationsEnabled ? "#ffffff" : "#9CA3AF"}
                        />
                    </View>

                </View>
            </View>

            {/* --- 3. ABOUT SECTION --- */}
            <View className="px-6 mb-8">
                <Text className="text-secondary font-bold text-xs uppercase mb-3 ml-2 tracking-widest">About</Text>
                
                <View className="bg-white/10 border border-white/5 rounded-3xl p-5">
                    <View className="flex-row items-center mb-4">
                        <Image source={require('../../../../assets/logo/Logo-Icon.png')} className="w-10 h-10 mr-3" />
                        <View>
                            <Text className="text-white font-bold text-lg">Laag ta bAI</Text>
                            <Text className="text-gray-400 text-xs">Version 1.0.0 (Alpha)</Text>
                        </View>
                    </View>

                    <Text className="text-gray-300 text-sm mb-4 leading-5">
                        An AI-powered mobile travel companion that turns your smartphone into an intelligent local guide.
                    </Text>

                    <View className="bg-black/20 rounded-xl p-3">
                        <Text className="text-primary-dark font-bold text-xs uppercase mb-2">Developed by D4rkbyte</Text>
                        {TEAM_MEMBERS.map((member, index) => (
                            <Text key={index} className="text-gray-400 text-xs mb-1">• {member}</Text>
                        ))}
                    </View>
                </View>
            </View>

            {/* --- 4. BOTTOM BUTTONS --- */}
            <View className="px-6 gap-3">
                
                {/* Logout */}
                <TouchableOpacity 
                    onPress={handleLogout}
                    className="w-full bg-white/5 py-4 rounded-2xl items-center border border-white/10 active:bg-white/10"
                >
                    <Text className="text-white font-bold text-base">Log Out</Text>
                </TouchableOpacity>

                {/* Exit App (Functional) */}
                <TouchableOpacity 
                    onPress={handleExitApp}
                    className="w-full bg-red-500/10 py-4 rounded-2xl items-center border border-red-500/20 active:bg-red-500/20"
                >
                    <Text className="text-red-400 font-bold text-base">Exit App</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ProfileScreen;