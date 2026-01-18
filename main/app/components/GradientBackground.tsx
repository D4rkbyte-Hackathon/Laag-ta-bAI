import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { ImageBackground } from 'react-native';

cssInterop(LinearGradient, {
  className: {
    target: 'style',
  },
});

interface Props {
  children: React.ReactNode;
  className?: string; 
}

export const GradientBackground = ({ children, className }: Props) => {
  return (
    <LinearGradient
      colors={['#2B0E0E', '#571717']} 
      className={`flex-1 ${className || ''}`}
    >
      <ImageBackground
        source={require('../../assets/others/main-bg.png')}
        className="flex-1"
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    </LinearGradient>
  );
};