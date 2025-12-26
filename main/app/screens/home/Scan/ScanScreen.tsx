import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'; // Import Animation
import IdentifyingModal from './IdentifyingModal';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

// Tips array
const CAMERA_TIPS = [
    "Camera is active",
    "Scan a landmark",
    "Find historical sites",
    "Tap shutter to identify"
];

const ScanScreen = ({ navigation }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [zoom, setZoom] = useState(0); 
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [tipIndex, setTipIndex] = useState(0); // State for current tip

  const cameraRef = useRef<CameraView>(null);

  // Cycle through tips every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % CAMERA_TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-background-dark p-6">
        <Text className="text-white text-center mb-4">We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-primary-dark px-6 py-3 rounded-xl">
            <Text className="font-bold text-background-dark">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Handlers ---
  const toggleCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  const toggleZoom = () => {
    setZoom(current => (current === 0 ? 0.01 : 0)); 
  };

  const handleGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      handleScan();
    }
  };

  const handleScan = () => {
    setIsIdentifying(true);
  };

  const onIdentificationComplete = () => {
    setIsIdentifying(false);
    navigation.navigate('LandmarkDetails', { 
        landmarkId: 'scanned-1', 
        title: "Magellan's Cross"
    });
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      
      <CameraView 
        style={{ flex: 1 }} 
        facing={facing}
        flash={flash}
        zoom={zoom}
        ref={cameraRef}
      >
        <SafeAreaView className="flex-1 justify-between p-0">
            
            {/* --- TOP CONTROLS --- */}
            <View className="px-6 pt-6">
                <View className="flex-row justify-between items-center bg-black/20 p-2 rounded-full backdrop-blur-sm">
                    {/* Zoom Toggle */}
                    <TouchableOpacity 
                        onPress={toggleZoom} 
                        className="w-10 h-10 items-center justify-center rounded-full border border-white/20"
                    >
                        <Text className="text-[#E69138] font-bold text-xs">
                            {zoom === 0 ? "1x" : "2x"}
                        </Text>
                    </TouchableOpacity>

                    {/* --- DYNAMIC TIP (Centered) --- */}
                    <View className="flex-1 items-center justify-center mx-2">
                        <Animated.Text 
                            key={tipIndex} // Key change triggers animation
                            entering={FadeIn.duration(500)}
                            exiting={FadeOut.duration(500)}
                            className="text-[#E8F5E9] font-bold text-sm tracking-wide uppercase"
                        >
                            {CAMERA_TIPS[tipIndex]}
                        </Animated.Text>
                    </View>

                    {/* Flash Toggle */}
                    <TouchableOpacity 
                        onPress={toggleFlash} 
                        className="w-10 h-10 items-center justify-center rounded-full border border-white/20"
                    >
                        <Ionicons 
                            name={flash === 'on' ? "flash" : "flash-off"} 
                            size={20} 
                            // Changed icon color to Secondary (#E69138)
                            color={flash === 'on' ? "#E69138" : "#E69138"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- BOTTOM CONTROLS CONTAINER --- */}
            <View className="flex-row items-center justify-between bg-black/40 rounded-t-[30px] px-10 pt-12 pb-28 border-t border-white/10 backdrop-blur-md">
                
                <TouchableOpacity onPress={handleGallery} className="w-12 h-12 bg-white/10 rounded-full items-center justify-center active:bg-white/20">
                    <Ionicons name="images" size={24} color="#E69138" />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleScan}
                    activeOpacity={0.7}
                    className="-mt-8"
                >
                    <View className="w-20 h-20 rounded-full border-2 border-main-green items-center justify-center bg-white/10 shadow-2xl">
                        <View className="w-16 h-16 bg-light-green rounded-full shadow-lg shadow-white/50" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleCamera} className="w-12 h-12 bg-white/10 rounded-full items-center justify-center active:bg-white/20">
                    <Ionicons name="camera-reverse" size={24} color="#E69138" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
      </CameraView>

      <IdentifyingModal 
        visible={isIdentifying} 
        onFinish={onIdentificationComplete}
      />

    </View>
  );
};

export default ScanScreen;