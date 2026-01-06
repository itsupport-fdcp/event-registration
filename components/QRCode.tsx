import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';

interface QRCodeProps {
  value: string;
  size?: number;
  backgroundColor?: string;
  color?: string;
}

export default function QRCode({
  value,
  size = 250,
  backgroundColor = '#FFFFFF',
  color = '#000000'
}: QRCodeProps) {
  return (
    <View style={[styles.container, { backgroundColor, padding: 16, borderRadius: 16 }]}>
      <QRCodeSVG
        value={value}
        size={size}
        backgroundColor={backgroundColor}
        color={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
