import EmptyState from '@/components/empty states/EmptyState';
import NewsCardList, { defaultNews } from '@/components/NewsCardList';
import SearchBar from '@/components/SearchBar';
import { contentWrapperPadding } from '@/constants/content';
import { l } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LatestNews() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return defaultNews;

    return defaultNews.filter(
      (item) =>
        item.headline?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder="Search latest news"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Latest news</Text>

          {filteredNews.length > 0 ? (
            <NewsCardList news={filteredNews} horizontal={false} />
          ) : (
            <EmptyState
              header={searchQuery ? 'No Results Found' : 'No News Found'}
              description={
                searchQuery
                  ? `No news matching "${searchQuery}"`
                  : 'There are no latest news stories right now.'
              }
              icon={searchQuery ? 'search-outline' : 'newspaper-outline'}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginLeft: contentWrapperPadding - 4,
  },
  searchWrapper: {
    paddingHorizontal: contentWrapperPadding,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
});
