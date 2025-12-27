import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get('window');
const BADGE_SIZE = (width - 64) / 3; // 3 columns with padding

// --- Mock Data ---

const ACTIVE_QUESTS = [
  { 
    id: 'q1', 
    title: 'Heritage Hunter', 
    description: 'Visit 3 historical sites in Cebu City.', 
    progress: 2, 
    total: 3, 
    reward: 150, 
    icon: 'map-outline' 
  },
  { 
    id: 'q2', 
    title: 'Local Foodie', 
    description: 'Scan 2 famous local delicacies.', 
    progress: 0, 
    total: 2, 
    reward: 100, 
    icon: 'restaurant-outline' 
  },
  { 
    id: 'q3', 
    title: 'Social Butterfly', 
    description: 'Share an achievement with friends.', 
    progress: 0, 
    total: 1, 
    reward: 50, 
    icon: 'share-social-outline' 
  },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'First Steps', level: 1, unlocked: true, icon: 'footsteps' },
  { id: '2', title: 'Historian', level: 5, unlocked: true, icon: 'book' },
  { id: '3', title: 'Navigator', level: 3, unlocked: false, icon: 'compass' },
  { id: '4', title: 'Foodie', level: 2, unlocked: false, icon: 'restaurant' },
  { id: '5', title: 'Socialite', level: 4, unlocked: false, icon: 'people' },
  { id: '6', title: 'Photographer', level: 3, unlocked: true, icon: 'camera' },
  { id: '7', title: 'Polyglot', level: 5, unlocked: false, icon: 'language' },
  { id: '8', title: 'Cebu Expert', level: 10, unlocked: false, icon: 'ribbon' },
  { id: '9', title: 'Night Owl', level: 2, unlocked: false, icon: 'moon' },
];

const MasteryScreen = ({ navigation }: Props) => {
  
  const handleBadgePress = (achievement: any) => {
    navigation.navigate('AchievementDetail', { achievement });
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 80 }} 
          showsVerticalScrollIndicator={false}
        >
            
            {/* --- HEADER: LEVEL & PROGRESS --- */}
            <View className="px-6 pt-6 pb-8 items-center">
                <Text className="text-secondary font-bold tracking-widest uppercase mb-1">Current Rank</Text>
                <Text className="text-white font-extrabold text-4xl mb-4 text-center tracking-tight">
                    Cebuano Explorer
                </Text>

                {/* Level Badge Circle */}
                <View className="w-32 h-32 rounded-full border-4 border-primary-dark items-center justify-center bg-white/5 mb-6 shadow-lg shadow-yellow-500/20 relative">
                     <View className="items-center z-10">
                        <Text className="text-gray-400 text-xs font-bold uppercase">Level</Text>
                        <Text className="text-primary-dark text-5xl font-extrabold">05</Text>
                     </View>
                     {/* Decorative ring */}
                     <View className="absolute w-28 h-28 rounded-full border border-white/10" />
                </View>

                {/* Progress Bar */}
                <View className="w-full mb-2">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-400 text-xs font-bold">XP Progress</Text>
                        <Text className="text-primary-dark text-xs font-bold">2,450 / 5,000</Text>
                    </View>
                    <View className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                        {/* REPLACED GRADIENT CLASS WITH SOLID COLOR AND INLINE STYLE */}
                        <View 
                            className="h-full bg-primary-dark" 
                            style={{ width: '49%' }} 
                        />
                    </View>
                </View>
            </View>

            {/* --- STATS ROW --- */}
            <View className="flex-row justify-between px-6 mb-8">
                <View className="flex-1 bg-white/5 border border-white/10 p-3 rounded-2xl items-center mr-2">
                    <Ionicons name="trophy" size={24} color="#FFC107" />
                    <Text className="text-white font-bold text-lg mt-1">12</Text>
                    <Text className="text-gray-400 text-[10px] uppercase">Awards</Text>
                </View>
                <View className="flex-1 bg-white/5 border border-white/10 p-3 rounded-2xl items-center mx-2">
                    <Ionicons name="flame" size={24} color="#FF5E3E" />
                    <Text className="text-white font-bold text-lg mt-1">5</Text>
                    <Text className="text-gray-400 text-[10px] uppercase">Streak</Text>
                </View>
                <View className="flex-1 bg-white/5 border border-white/10 p-3 rounded-2xl items-center ml-2">
                    <Ionicons name="map" size={24} color="#4CAF50" />
                    <Text className="text-white font-bold text-lg mt-1">24</Text>
                    <Text className="text-gray-400 text-[10px] uppercase">Visited</Text>
                </View>
            </View>

            {/* --- ACTIVE QUESTS --- */}
            <View className="mb-8">
                <View className="flex-row justify-between items-end px-6 mb-4">
                    <Text className="text-white text-xl font-bold">Active Quests</Text>
                    <TouchableOpacity>
                        <Text className="text-accent text-xs font-bold">View All</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                >
                    {ACTIVE_QUESTS.map((quest) => (
                        <View 
                            key={quest.id}
                            className="w-64 bg-white/10 border border-white/10 rounded-2xl p-4 mr-4"
                        >
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="bg-white/10 p-2 rounded-lg">
                                    <Ionicons name={quest.icon as any} size={20} color="#E69138" />
                                </View>
                                <View className="bg-primary-dark/20 px-2 py-1 rounded-md">
                                    <Text className="text-primary-dark text-[10px] font-bold">+{quest.reward} XP</Text>
                                </View>
                            </View>

                            <Text className="text-white font-bold text-lg mb-1">{quest.title}</Text>
                            <Text className="text-gray-400 text-xs mb-3 h-8 leading-4" numberOfLines={2}>
                                {quest.description}
                            </Text>

                            {/* Quest Progress */}
                            <View>
                                <View className="flex-row justify-between mb-1">
                                    <Text className="text-gray-400 text-[10px] font-bold">Progress</Text>
                                    <Text className="text-white text-[10px] font-bold">{quest.progress}/{quest.total}</Text>
                                </View>
                                <View className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                                    <View 
                                        className="h-full bg-secondary" 
                                        style={{ width: `${(quest.progress / quest.total) * 100}%` }} 
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* --- BADGES GRID --- */}
            <View className="px-6">
                <View className="flex-row justify-between items-end mb-4">
                    <Text className="text-white text-xl font-bold">Badge Collection</Text>
                    <TouchableOpacity>
                        <Text className="text-accent text-xs font-bold">View All</Text>
                    </TouchableOpacity>
                </View>
                
                <View className="flex-row flex-wrap justify-between">
                    {ACHIEVEMENTS.map((item) => (
                        <TouchableOpacity 
                            key={item.id}
                            onPress={() => handleBadgePress(item)}
                            activeOpacity={0.8}
                            style={{ width: BADGE_SIZE, height: BADGE_SIZE * 1.3 }}
                            className="mb-6 items-center"
                        >
                            {/* Hexagon / Shape Container */}
                            <View 
                                className={`w-full aspect-square rounded-2xl items-center justify-center border-2 mb-2 ${
                                    item.unlocked 
                                        ? 'bg-primary-dark/10 border-primary-dark' 
                                        : 'bg-white/5 border-white/5'
                                }`}
                            >
                                <Ionicons 
                                    name={item.icon as any} 
                                    size={32} 
                                    color={item.unlocked ? '#FFC107' : '#4B5563'} 
                                />
                                {item.unlocked && (
                                    <View className="absolute bottom-1">
                                        <Ionicons name="star" size={10} color="#FFC107" />
                                    </View>
                                )}
                            </View>
                            
                            <Text 
                                className={`text-center font-bold text-xs ${item.unlocked ? 'text-white' : 'text-gray-600'}`}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default MasteryScreen;