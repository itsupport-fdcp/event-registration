import EmptyState from '@/components/empty states/EmptyState';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function NotFound() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EmptyState
        header="Page Not Found"
        description="The page you're looking for doesn't exist or has moved."
        icon="compass-outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
