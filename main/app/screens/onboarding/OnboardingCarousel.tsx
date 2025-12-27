import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  interpolateColor, 
  Extrapolation,
  SharedValue,
  runOnJS,
  FadeIn,   // <--- IMPORT DIRECTLY
  FadeOut   // <--- IMPORT DIRECTLY
} from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../components/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'See Beyond the Surface',
    description: 'Don\'t just sightsee—sight-understand. Snap a photo of any landmark and watch history come alive with myths, facts, and stories.', 
    // Photo Suggestion: A POV shot of someone scanning Magellan's Cross or a statue. (1:1 aspect ratio pic)
    image: require('../../../assets/logo/Logo-Icon.png'),
  },
  {
    id: 2,
    title: 'Your Pocket Local Buddy',
    description: 'Curious about a legend? Need a food spot? Chat with our AI guide who knows Cebu like a best friend—available 24/7 in any language.',
    // Photo Suggestion: A traveler looking happy while texting on their phone in a vibrant street. (1:1 aspect ratio pic)
    image: require('../../../assets/logo/Logo-Icon.png'),
  },
  {
    id: 3,
    title: 'Arrive & Orient Instantly',
    description: 'Landing at MCIA? We turn arrival chaos into your first adventure. Get instant orientation and start your quests right from the airport.',
    // Photo Suggestion: The Mactan-Cebu International Airport interior (wooden arches) or a traveler with luggage. (1:1 aspect ratio pic)
    image: require('../../../assets/logo/Logo-Icon.png'),
  },
  {
    id: 4,
    title: 'Master Cebu\'s Heritage',
    description: 'Unlock hidden gems and earn badges as you explore. Go beyond the usual tourist spots and become a true Heritage Master.',
    // Photo Suggestion: A "hidden gem" location or a collage of badges/achievements. (1:1 aspect ratio pic)
    image: require('../../../assets/logo/Logo-Icon.png'),
  },
];

// --- Custom Pagination Dot Component ---
const PaginationDot = ({ index, progress }: { index: number, progress: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [8, 24, 8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      ['#E0E0E0', '#FF5E3E', '#E0E0E0']
    );

    return {
      width,
      opacity,
      backgroundColor,
    };
  });

  return (
    <Animated.View
      className="h-2 rounded-full mx-1"
      style={animatedStyle}
    />
  );
};

// --- Animated Button Text Component ---
const AnimatedBtnText = ({ text }: { text: string }) => {
    return (
        <Animated.Text 
            // FIX: Removed "Animated." prefix from FadeIn/FadeOut
            key={text} 
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="text-text-light text-lg font-bold"
        >
            {text}
        </Animated.Text>
    )
}

const OnboardingCarousel = ({ navigation }: Props) => {
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<ICarouselInstance>(null);

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      navigation.replace('Permissions');
    } else {
      ref.current?.next();
    }
  };

  const handleSkip = () => {
    navigation.replace('Permissions');
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
        progress.value,
        [onboardingData.length - 2, onboardingData.length - 1],
        ['#FFC107', '#4CAF50'] // Primary-Dark -> Main-Green
    );

    return { backgroundColor };
  });

  const renderItem = ({ item }: any) => {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full h-3/5 items-center justify-end mb-8">
            <View className="shadow-lg shadow-black/50 w-full h-full">
                <Image 
                    source={item.image}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>
        </View>
        
        <View className="items-center h-1/5">
            <Text className="text-white text-3xl font-bold text-center mb-4">
            {item.title}
            </Text>
            <Text className="text-gray-300 text-base text-center px-4 leading-6 opacity-80">
            {item.description}
            </Text>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1 justify-between">
        <View className="flex-row justify-end p-4 z-10">
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-white text-base font-medium opacity-80">Skip</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 -mt-2">
            <Carousel
                ref={ref}
                loop={false}
                width={width}
                height={height * 0.7}
                autoPlay={false}
                data={onboardingData}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => {
                    runOnJS(setCurrentIndex)(index);
                }}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
                renderItem={renderItem}
            />
        </View>

        <View className="items-center w-full px-6 pb-10">
          <View className="flex-row mb-8 h-4 items-center justify-center">
            {onboardingData.map((_, index) => (
              <PaginationDot 
                key={index} 
                index={index} 
                progress={progress} 
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="w-full shadow-lg"
          >
            <Animated.View 
                className="w-full py-4 items-center justify-center rounded-full"
                style={buttonAnimatedStyle}
            >
                <AnimatedBtnText 
                    text={currentIndex === onboardingData.length - 1 ? 'GOT IT' : 'NEXT'} 
                />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default OnboardingCarousel;