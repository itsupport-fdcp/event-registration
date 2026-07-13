import { m } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  loading?: boolean;
  onPress: () => void;
  title: string;
}

export default function PrimaryButton({
  disabled = false,
  icon,
  loading = false,
  onPress,
  title,
}: PrimaryButtonProps) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={isDisabled ? styles.disabled : undefined}
    >
      <LinearGradient
        colors={isDisabled ? [colors.tertiary, colors.tertiary] : ['#580076', '#E200A9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            {icon ? <Ionicons name={icon} size={20} color="#FFFFFF" /> : null}
            <Text style={styles.text}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
  disabled: {
    opacity: 0.65,
  },
});
