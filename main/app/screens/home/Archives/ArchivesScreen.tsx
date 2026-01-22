import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// --- Mock Data ---
const PLACEHOLDER_IMG = require('../../../../assets/logo/Logo-Icon.png');

const FAVORITE_ITEMS = [
  { 
    id: 'f1', 
    title: "Magellan's Cross", 
    category: 'Landmark', 
    rating: 4.8, 
    image: require('../../../../assets/placeholder/Magellan.jpg') 
  },
  { 
    id: 'f2', 
    title: 'Temple of Leah', 
    category: 'Attraction', 
    rating: 4.5, 
    image: require('../../../../assets/placeholder/Temple.jpg')
  },
];

const HISTORY_ITEMS = [
  { 
    id: '1', 
    title: 'Fort San Pedro', 
    category: 'Historical Site', 
    location: 'Cebu City', 
    rating: 4.7,
    image: require('../../../../assets/placeholder/Fort.jpg'),
    savedAt: '2 days ago'
  },
  { 
    id: '2', 
    title: 'Yap-Sandiego House', 
    category: 'Ancestral House', 
    location: 'Parian, Cebu', 
    rating: 4.5,
    image: require('../../../../assets/placeholder/Yap.jpg'),
    savedAt: '1 week ago'
  },
  { 
    id: '3', 
    title: 'Museo Sugbo', 
    category: 'Museum', 
    location: 'Cebu City', 
    rating: 4.6,
    image: require('../../../../assets/placeholder/Museo.jpg'),
    savedAt: '1 month ago'
  },
];

// --- Components ---

// Horizontal Favorite Card (Taller, distinct style)
const FavoriteCard = ({ item, onPress }: { item: any, onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.8}
    className="mr-4 w-40 bg-white/10 border border-white/5 rounded-2xl p-3"
  >
    <View className="w-full h-32 rounded-xl mb-3 bg-white/5 p-1 items-center justify-center relative">
        <Image 
            source={item.image}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-background-dark/60 p-1.5 rounded-full">
            <Ionicons name="heart" size={14} color="#FF5E3E" />
        </View>
    </View>
    <Text className="text-white font-bold text-base mb-1" numberOfLines={1}>{item.title}</Text>
    <View className="flex-row items-center justify-between">
        <Text className="text-secondary text-xs">{item.category}</Text>
        <View className="flex-row items-center">
            <Ionicons name="star" size={10} color="#FFC107" />
            <Text className="text-white text-xs ml-1">{item.rating}</Text>
        </View>
    </View>
  </TouchableOpacity>
);

// Vertical History Item Card (Row style)
const HistoryItemCard = ({ item, onPress }: { item: any, onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row bg-white/5 border border-white/5 rounded-2xl p-3 mb-3 items-center"
  >
    {/* Image Thumbnail */}
    <View className="w-20 h-20 rounded-xl mr-4 bg-white/5 p-1 items-center justify-center">
       <Image 
           source={item.image}
           className="w-full h-full rounded-xl"
           resizeMode="cover"
       />
    </View>

    {/* Content */}
    <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
            <Text className="text-gray-200 font-bold text-base flex-1 mr-2" numberOfLines={1}>{item.title}</Text>
            {/* Outline Heart for History items (indicating not 'favorited' yet, or just saved) */}
            <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
        </View>

        <Text className="text-gray-500 text-xs font-medium mb-1">{item.category}</Text>
        
        <View className="flex-row items-center justify-between mt-1">
            <Text className="text-gray-500 text-[10px] italic">Viewed {item.savedAt}</Text>
            <View className="flex-row items-center bg-black/20 px-2 py-0.5 rounded-md">
                <Ionicons name="star" size={10} color="#FFC107" />
                <Text className="text-gray-400 text-[10px] font-bold ml-1">{item.rating}</Text>
            </View>
        </View>
    </View>
  </TouchableOpacity>
);


const ArchivesScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemPress = (item: any) => {
    navigation.navigate('LandmarkDetails', { landmarkId: item.id, title: item.title });
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1">
        <ScrollView 
            contentContainerStyle={{ paddingBottom: 80 }} 
            showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-4">
            
            {/* --- HEADER --- */}
            <View className="mb-6 items-center">
                <Text className="text-primary-dark font-extrabold text-4xl tracking-tight">
                Archives
                </Text>
                <Text className="text-gray-300 text-base mt-1 opacity-80">
                Your collection of history
                </Text>
            </View>

            {/* --- SEARCH BAR --- */}
            <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-3 mb-8">
                <Ionicons name="search" size={20} color="#FF5E3E" />
                <TextInput 
                placeholder="Search your collection..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-white text-base"
                />
            </View>

            {/* --- FAVORITES SECTION (Horizontal) --- */}
            <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-white text-2xl font-bold">Favorites</Text>
                    <TouchableOpacity>
                        <Ionicons name="arrow-forward" size={20} color="#B71C1C" />
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                    {FAVORITE_ITEMS.map((item) => (
                        <FavoriteCard 
                            key={item.id} 
                            item={item} 
                            onPress={() => handleItemPress(item)} 
                        />
                    ))}
                </ScrollView>
            </View>

            {/* --- HISTORY SECTION (Vertical) --- */}
            <View>
                <View className="flex-row justify-between items-center mb-4">
                     <Text className="text-white text-2xl font-bold">History</Text>
                     {/* Filter Icon */}
                     <TouchableOpacity>
                        <Ionicons name="filter" size={20} color="#B71C1C" />
                     </TouchableOpacity>
                </View>

                {HISTORY_ITEMS.map((item) => (
                    <HistoryItemCard 
                        key={item.id} 
                        item={item} 
                        onPress={() => handleItemPress(item)} 
                    />
                ))}
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default ArchivesScreen;