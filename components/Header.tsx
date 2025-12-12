import { createHeaderStyles } from '@/assets/styles/header.styles';
import useTheme from '@/hooks/useTheme';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

export default function Header() {
  const { colors } = useTheme();
  const headerColors = createHeaderStyles(colors);
  const today = new Date();

  


  return (
      <View style={headerColors.container}>
        <Image onLoad={() => {
          console.log('Image loaded');
        }}
        source={require('@/assets/images/logo.png')} style={{ width: 100, height: 100 }} 
        />
        <View style={headerColors.titleContainer}>
          <Text style={headerColors.header}>Look for an event</Text>
          <Text style={headerColors.subHeader}>{format(today, 'EEEE, MMMM d, yyyy')}</Text>
        </View>
      </View>
  )
}

