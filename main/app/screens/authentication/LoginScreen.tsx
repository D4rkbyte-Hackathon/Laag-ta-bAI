import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ImageBackground 
        source={require('../../../assets/authentication/login.jpg')}
        className="flex-1"
        resizeMode="cover"
    >
      {/* 1. Darker Global Overlay for better focus */}
      <View className="absolute inset-0 bg-black/50" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
            keyboardShouldPersistTaps="handled"
          >
            <View className="px-6 w-full max-w-md mx-auto my-auto">
              
              {/* --- GLASS FRAME --- */}
              {/* Added bg-black/20 to container as a fallback */}
              <View className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/80 bg-black/20">
                {/* FIX: 
                   1. intensity={80} -> Stronger blur
                   2. bg-black/40 -> Explicit dark tint for contrast
                */}
                <BlurView intensity={80} tint="dark" className="px-6 py-10 bg-black/40">
                    
                    {/* --- HEADER --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(100).duration(1000).springify()}
                        className="items-center mb-10"
                    >
                        <Text className="text-white text-4xl font-extrabold tracking-tight text-center">
                        Log In
                        </Text>
                        <Text className="text-gray-200 text-sm mt-2 text-center font-medium opacity-90">
                        Your heritage journey awaits.
                        </Text>
                    </Animated.View>

                    {/* --- FORM --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <View className="space-y-1.5">
                            <Text className="text-primary-dark font-bold ml-1 text-xs uppercase tracking-widest opacity-90">Email</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-14 focus:border-[#FFC107]/60">
                                <Ionicons name="mail" size={20} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="explorer@example.com"
                                    placeholderTextColor="#AAA"
                                    value={email}
                                    onChangeText={setEmail}
                                    className="flex-1 ml-3 text-white text-base font-medium"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View className="space-y-1.5">
                            <Text className="text-primary-dark font-bold ml-1 text-xs uppercase tracking-widest opacity-90">Password</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-14 focus:border-[#FFC107]/60">
                                <Ionicons name="key" size={20} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="••••••••"
                                    placeholderTextColor="#AAA"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    className="flex-1 ml-3 text-white text-base font-medium"
                                />
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} className="p-2">
                                    <Ionicons 
                                    name={isPasswordVisible ? "eye-off" : "eye"} 
                                    size={20} 
                                    color="rgba(255,255,255,0.6)" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity className="items-end">
                            <Text className="text-gray-300 font-medium text-xs">Forgot Password?</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* --- MAIN ACTIONS --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(300).duration(1000).springify()}
                        className="mt-8 space-y-4"
                    >
                        <TouchableOpacity 
                            onPress={() => navigation.replace('Permissions')}
                            activeOpacity={0.8}
                            className="bg-[#FFC107] h-14 rounded-xl items-center justify-center shadow-lg shadow-amber-500/20"
                        >
                            <Text className="text-[#2B0E0E] text-lg font-bold tracking-wider">LOG IN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.replace('Permissions')}
                            activeOpacity={0.6}
                            className="items-center py-2"
                        >
                            <Text className="text-white/90 text-sm font-semibold tracking-wide border-b border-white/20 pb-0.5">
                                Continue as Guest
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* --- SOCIALS --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        className="mt-6"
                    >
                        <View className="flex-row items-center mb-6">
                            <View className="flex-1 h-[1px] bg-white/20" />
                            <Text className="text-gray-300 px-3 text-[10px] font-bold uppercase">Or continue with</Text>
                            <View className="flex-1 h-[1px] bg-white/20" />
                        </View>
                        <View className="flex-row justify-center gap-6">
                            {['logo-facebook', 'logo-google', 'logo-apple'].map((icon, index) => (
                                <TouchableOpacity 
                                    key={index}
                                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center shadow-sm active:bg-white/20"
                                >
                                    <Ionicons name={icon as any} size={22} color="white" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {/* --- FOOTER --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(500).duration(1000).springify()}
                        className="flex-row justify-center mt-8"
                    >
                        <Text className="text-gray-300 text-sm">New here? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text className="text-[#FFC107] font-bold text-sm">Create Account</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </BlurView>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;