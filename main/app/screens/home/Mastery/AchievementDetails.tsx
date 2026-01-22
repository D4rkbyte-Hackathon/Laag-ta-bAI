import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { GradientBackground } from '../../../components/GradientBackground';
import { TopNavbar } from '../../../components/TopNavbar';

type RootStackParamList = {
  AchievementDetails: { achievement: any };
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Milestones Data ---
const MILESTONES = [
    { id: 1, label: "Visited Fort San Pedro", completed: true },
    { id: 2, label: "Scanned Magellan's Cross", completed: true },
];

const AchievementDetails = ({ navigation }: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, 'AchievementDetails'>>();
  const { achievement } = route.params;

  const isUnlocked = achievement.unlocked;

  return (
    <GradientBackground>
      <TopNavbar 
          title="Achievement Details"
          onBack={() => navigation.goBack()}
      />

      <SafeAreaView edges={['bottom']} className="flex-1">
        <ScrollView 
            contentContainerStyle={{ padding: 24, paddingTop: 120, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
        >
            
            {/* --- BADGE ICON LARGE --- */}
            <View 
                className={`w-48 h-48 rounded-full border-4 items-center justify-center mb-6 ${
                    isUnlocked 
                    ? 'bg-primary-dark/20 border-primary-dark' 
                    : 'bg-white/5 border-white/10'
                }`}
            >
                 <Ionicons 
                    name={achievement.icon} 
                    size={80} 
                    color={isUnlocked ? '#FFC107' : '#4B5563'} 
                />
            </View>

            {/* --- TITLE & STATUS --- */}
            <Text className="text-white font-extrabold text-3xl mb-2 text-center tracking-wider">
                {achievement.title}
            </Text>
            
            <View className={`px-4 py-1.5 rounded-full mb-2 ${isUnlocked ? 'bg-green-500/20' : 'bg-gray-700/50'}`}>
                <Text className={`font-bold uppercase text-xs tracking-widest ${isUnlocked ? 'text-green-400' : 'text-gray-400'}`}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                </Text>
            </View>

            {/* Earned Date */}
            {isUnlocked && (
                <Text className="text-gray-400 text-xs font-medium italic mb-8">
                    Earned on Dec 15, 2024
                </Text>
            )}

            {/* --- DETAILS CARD --- */}
            <View className="w-full bg-white/10 border border-white/10 rounded-3xl p-6 mb-6">
                
                {/* Description */}
                <View className="mb-6">
                    <Text className="text-secondary font-bold text-sm uppercase mb-2">Description</Text>
                    <Text className="text-gray-300 leading-6 text-base">
                        {isUnlocked 
                            ? "Congratulations! You have mastered this skill. Keep exploring to find more secrets hidden around Cebu."
                            : "Explore more locations and complete quests to unlock this badge."
                        }
                    </Text>
                </View>

                {/* Journey / Milestones */}
                <View className="mb-6">
                    <Text className="text-secondary font-bold text-sm uppercase mb-3">Journey</Text>
                    <View className="gap-3">
                        {MILESTONES.map((step, index) => (
                            <View key={step.id} className="flex-row items-center">
                                <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${isUnlocked ? 'bg-green-500/20' : 'bg-white/10'}`}>
                                    <Ionicons 
                                        name={isUnlocked ? "checkmark" : "ellipse-outline"} 
                                        size={14} 
                                        color={isUnlocked ? "#4ade80" : "#9CA3AF"} 
                                    />
                                </View>
                                <Text className={`text-base ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                    {step.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Reward Section */}
                <View className="flex-row items-center bg-black/20 p-4 rounded-xl border border-white/5">
                    <View className="bg-primary-dark/20 p-2 rounded-lg mr-4">
                        <Ionicons name="gift" size={24} color="#FFC107" />
                    </View>
                    <View>
                        <Text className="text-white font-bold text-base">Reward</Text>
                        <Text className="text-secondary font-bold">+500 XP</Text>
                    </View>
                </View>

            </View>

            {/* --- ACTION BUTTON --- */}
            {isUnlocked ? (
                <TouchableOpacity className="w-full bg-primary-dark py-4 rounded-2xl items-center flex-row justify-center shadow-lg shadow-yellow-500/20">
                    <Ionicons name="share-social" size={20} color="#2B0E0E" />
                    <Text className="text-background-dark font-bold text-lg ml-2">Share Achievement</Text>
                </TouchableOpacity>
            ) : (
                <View className="w-full bg-white/5 py-4 rounded-2xl items-center flex-row justify-center border border-white/10">
                    <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                    <Text className="text-gray-400 font-bold text-lg ml-2">Locked</Text>
                </View>
            )}

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AchievementDetails;