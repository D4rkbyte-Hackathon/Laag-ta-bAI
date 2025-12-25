import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  onBack: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightAction?: () => void;
};

export const TopNavbar = ({ title, onBack, rightIcon, onRightAction }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute top-0 left-0 right-0 flex-row bg-background-light items-center justify-between px-6 shadow-[0_5px_10px_rgba(0,0,0,0.1)] border-b border-transparent rounded-b-[40px] z-50 elevation-5"
      style={{ 
        paddingTop: Math.max(insets.top, 20), 
        height: 60 + Math.max(insets.top, 20),
        paddingBottom: 0
      }} 
    >
        {/* Left: Back Button */}
        <TouchableOpacity 
          onPress={onBack}
          className="w-10 h-10 items-center justify-center rounded-full active:bg-gray-200"
        >
          <Ionicons name="arrow-back" size={24} color="#2B0E0E" />
        </TouchableOpacity>

        {/* Center: Title */}
        <Text className="text-accent text-2xl font-bold tracking-wide text-center" numberOfLines={1}>
          {title}
        </Text>

        {/* Right: Optional Action Icon */}
        <View className="w-10 h-10 items-center justify-center">
          {rightIcon ? (
            <TouchableOpacity 
              onPress={onRightAction}
              className="w-10 h-10 items-center justify-center rounded-full active:bg-gray-200"
            >
              <Ionicons name={rightIcon} size={24} color="#2B0E0E" />
            </TouchableOpacity>
          ) : (
            // Empty placeholder to keep title centered
            <View className="w-10 h-10" />
          )}
        </View>
    </View>
  );
};