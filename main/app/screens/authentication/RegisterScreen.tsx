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

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ImageBackground 
        source={require('../../../assets/onboarding/register.jpg')}
        className="flex-1"
        resizeMode="cover"
    >
      <View className="absolute inset-0 bg-black/50" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
            
            <View className="px-6 pt-2 absolute z-10 top-2 left-0">
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 items-center justify-center rounded-full bg-black/40 border border-white/20 active:bg-black/60"
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="px-6 pb-10 flex-1 justify-center max-w-md mx-auto w-full mt-12">
              
              <View className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/80 bg-black/20">
                
                {/* FIX: Dark tint + background mix */}
                <BlurView intensity={80} tint="dark" className="px-6 py-8 bg-black/40">

                    {/* --- HEADER --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(100).duration(1000).springify()}
                        className="items-center mb-8"
                    >
                        <Text className="text-white text-3xl font-extrabold tracking-tight text-center">
                        Create Account
                        </Text>
                        <Text className="text-gray-200 text-sm mt-1 text-center font-medium opacity-90">
                        Get started.
                        </Text>
                    </Animated.View>

                    {/* --- FORM --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="space-y-4"
                    >
                        {/* Full Name */}
                        <View className="space-y-1">
                            <Text className="text-primary-dark font-bold ml-1 text-[10px] uppercase tracking-wider opacity-80">Full Name</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-12 focus:border-[#FFC107]/60">
                                <Ionicons name="person" size={18} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="Juan Dela Cruz"
                                    placeholderTextColor="#AAA"
                                    value={name}
                                    onChangeText={setName}
                                    className="flex-1 ml-3 text-white text-sm font-medium"
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View className="space-y-1">
                            <Text className="text-primary-dark font-bold ml-1 text-[10px] uppercase tracking-wider opacity-80">Email</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-12 focus:border-[#FFC107]/60">
                                <Ionicons name="mail" size={18} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="explorer@email.com"
                                    placeholderTextColor="#AAA"
                                    value={email}
                                    onChangeText={setEmail}
                                    className="flex-1 ml-3 text-white text-sm font-medium"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View className="space-y-1">
                            <Text className="text-primary-dark font-bold ml-1 text-[10px] uppercase tracking-wider opacity-80">Password</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-12 focus:border-[#FFC107]/60">
                                <Ionicons name="lock-closed" size={18} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="••••••••"
                                    placeholderTextColor="#AAA"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    className="flex-1 ml-3 text-white text-sm font-medium"
                                />
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View className="space-y-1">
                            <Text className="text-primary-dark font-bold ml-1 text-[10px] uppercase tracking-wider opacity-80">Confirm Password</Text>
                            <View className="flex-row items-center bg-black/40 border border-white/10 rounded-xl px-4 h-12 focus:border-[#FFC107]/60">
                                <Ionicons name="shield-checkmark" size={18} color="#FF5E3E" />
                                <TextInput 
                                    placeholder="••••••••"
                                    placeholderTextColor="#AAA"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    className="flex-1 ml-3 text-white text-sm font-medium"
                                />
                            </View>
                        </View>
                    </Animated.View>

                    {/* --- ACTION BUTTON --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(300).duration(1000).springify()}
                        className="mt-8"
                    >
                        <TouchableOpacity 
                        onPress={() => navigation.replace('Permissions')}
                        activeOpacity={0.8}
                        className="bg-[#FFC107] h-14 rounded-xl items-center justify-center shadow-lg shadow-amber-500/20"
                        >
                        <Text className="text-[#2B0E0E] text-lg font-bold tracking-wider">SIGN UP</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* --- FOOTER --- */}
                    <Animated.View 
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        className="flex-row justify-center mt-6"
                    >
                        <Text className="text-gray-300 text-sm">Already a member? </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text className="text-[#FFC107] font-bold text-sm">Log In</Text>
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

export default RegisterScreen;