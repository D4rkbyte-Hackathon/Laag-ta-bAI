import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

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
      {children}
    </LinearGradient>
  );
};