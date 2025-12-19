import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withSequence, 
  withRepeat,
  Easing,
} from 'react-native-reanimated';

// --- Animated Components ---
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

// --- Individual Tab Item Component ---
const TabItem = ({ route, isFocused, onPress, options, index }: any) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(isFocused ? 1 : 0.5);
  
  let iconName: any;
  let IconComponent: any = AnimatedIcon;
  const activeColor = '#FFC107'; 
  const inactiveColor = '#333333'; 

  if (route.name === 'Explore') {
    iconName = isFocused ? 'map' : 'map-outline';
  } else if (route.name === 'Archives') {
    iconName = isFocused ? 'book' : 'book-outline';
  } else if (route.name === 'Mastery') {
    iconName = isFocused ? 'trophy' : 'trophy-outline';
  } else if (route.name === 'Profile') {
    iconName = isFocused ? 'person' : 'person-outline';
  }

  useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1.2, { damping: 10, stiffness: 200 });
      // UPDATED: Subtle shake based on your snippet (-5deg to 5deg)
      rotate.value = withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(1);
      rotate.value = withTiming(0);
      opacity.value = withTiming(0.6, { duration: 200 });
    }
  }, [isFocused]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: isFocused ? withTiming(1) : withTiming(0),
    transform: [{ translateY: isFocused ? withSpring(0) : withTiming(10) }],
    height: isFocused ? 'auto' : 0,
  }));

  return (
    <Pressable
      key={index}
      onPress={onPress}
      className="items-center justify-center flex-1 pt-2"
    >
      <IconComponent
        name={iconName}
        size={24}
        color={isFocused ? activeColor : inactiveColor}
        style={iconStyle}
      />
      <AnimatedText 
        className="text-xs mt-1 text-text-light font-bold"
        style={textStyle}
      >
        {route.name}
      </AnimatedText>
    </Pressable>
  );
};

// --- Special Scan Button Component ---
const ScanButton = ({ onPress, isFocused }: any) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Keep breathing animation always active
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // NEW: Text animation logic for Scan button
  const textStyle = useAnimatedStyle(() => ({
    opacity: isFocused ? withTiming(1) : withTiming(0),
    transform: [{ translateY: isFocused ? withSpring(0) : withTiming(10) }],
    height: isFocused ? 'auto' : 0,
  }));

  return (
    <Pressable
      onPress={onPress}
      // lower mt if needed para mo naog ang scan button
      className="items-center justify-center -mt-10"
      style={{ zIndex: 10 }}
    >
      <AnimatedView 
        style={animatedStyle}
        className="bg-primary-dark w-16 h-16 rounded-full items-center justify-center shadow-lg border-[4px] border-background-light"
      >
        <MaterialCommunityIcons name="camera-outline" size={30} color="#2B0E0E" />
      </AnimatedView>
      
      {/* NEW: Scan text now hides/shows like other tabs */}
      <AnimatedText 
        className="text-xs mt-1 text-text-light font-semibold"
        style={textStyle}
      >
        Scan
      </AnimatedText>
    </Pressable>
  );
};

// --- Main Navbar Component ---
const ScreenNavbar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 flex-row bg-background-light items-center justify-around shadow-[0_-5px_10px_rgba(0,0,0,0.1)] border-t border-transparent rounded-t-[40px] z-50 elevation-5"
      style={{ 
        paddingBottom: Math.max(insets.bottom, 20), 
        height: 70 + Math.max(insets.bottom, 20) 
      }} 
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === 'Scan') {
          return <ScanButton key={index} onPress={onPress} isFocused={isFocused} />;
        }

        return (
          <TabItem 
            key={index}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            options={options}
            index={index}
          />
        );
      })}
    </View>
  );
};

export default ScreenNavbar;