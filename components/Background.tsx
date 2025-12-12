import useTheme from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Background({children}: {children: React.ReactNode}) {

  const {colors} = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
        {children}  
    </View>
  )
}


const styles = StyleSheet.create({})