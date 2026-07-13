import EmptyState from '@/components/empty states/EmptyState';
import SearchBar from '@/components/SearchBar';
import { contentWrapperPadding } from '@/constants/content';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
export default function SavedItems() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      
      <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.contentWrapper}>
        <SearchBar placeholder="Search saved events" onSearch={(text: string) => console.log(`Searching for ${text}`)}/>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          <EmptyState
            header="No Saved Events"
            description="Events you save will appear here."
            icon="bookmark-outline"
          />

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 4,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
});
