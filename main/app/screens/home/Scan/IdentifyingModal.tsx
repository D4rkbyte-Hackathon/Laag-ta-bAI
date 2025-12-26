import React, { useEffect, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onFinish: () => void;
};

const STEPS = [
  "Analyzing image...",
  "Detecting edges...",
  "Matching with database...",
  "Landmark identified!"
];

const IdentifyingModal = ({ visible, onFinish }: Props) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (visible) {
      setStepIndex(0);
      
      const interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < STEPS.length - 1) return prev + 1;
          return prev;
        });
      }, 800);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        onFinish();
      }, 3200);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/60 px-8">
        
        {/* Using BlurView for frosted glass effect */}
        <BlurView intensity={40} tint="dark" className="absolute top-0 left-0 right-0 bottom-0" />

        <Animated.View 
            entering={ZoomIn.duration(300)}
            exiting={FadeOut.duration(200)}
            className="w-full bg-white/10 border border-white/20 p-8 rounded-3xl items-center shadow-2xl"
            style={{ overflow: 'hidden' }} // Important for blur containment if needed inside
        >
          {/* Animated Icon */}
          <View className="mb-6 relative items-center justify-center">
             <View className="w-20 h-20 rounded-full bg-primary-dark/20 animate-pulse absolute" />
             <Ionicons name="scan-outline" size={48} color="#FF5E3E" />
          </View>

          {/* Dynamic Text */}
          <Text className="text-white text-xl font-bold mb-2 text-center tracking-wider">
             bAI is identifying...
          </Text>
          
          <Animated.Text 
            key={stepIndex} 
            entering={FadeIn.duration(300)}
            className="text-primary-dark text-lg font-medium mb-6 text-center"
          >
            {STEPS[stepIndex]}
          </Animated.Text>

          {/* Loading Bar */}
          <View className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
             <Animated.View 
                className="h-full bg-main-green rounded-full" 
                style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }} 
             />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default IdentifyingModal;