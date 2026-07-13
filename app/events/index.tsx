import EmptyState from '@/components/empty states/EmptyState';
import EventCardList, { defaultEvents as happeningEvents } from '@/components/EventCardList';
import SearchBar from '@/components/SearchBar';
import UpcomingEventsList, { defaultEvents as upcomingEvents } from '@/components/UpcomingEventsList';
import { contentWrapperPadding } from '@/constants/content';
import { l } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type EventsSection = 'happening' | 'upcoming';

export default function Events() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ section?: string | string[] }>();
  const [searchQuery, setSearchQuery] = useState('');

  const sectionParam = Array.isArray(params.section) ? params.section[0] : params.section;
  const section: EventsSection = sectionParam === 'upcoming' ? 'upcoming' : 'happening';
  const isHappening = section === 'happening';
  const title = isHappening ? 'Happening now' : 'Upcoming events';

  const filteredHappeningEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return happeningEvents;

    return happeningEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.hosted_by.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const filteredUpcomingEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return upcomingEvents;

    return upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.hostedBy.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const hasResults = isHappening
    ? filteredHappeningEvents.length > 0
    : filteredUpcomingEvents.length > 0;

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
          placeholder={`Search ${title.toLowerCase()}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>{title}</Text>

          {hasResults ? (
            isHappening ? (
              <EventCardList events={filteredHappeningEvents} horizontal={false} />
            ) : (
              <UpcomingEventsList events={filteredUpcomingEvents} />
            )
          ) : (
            <EmptyState
              header={searchQuery ? 'No Results Found' : 'No Events Found'}
              description={
                searchQuery
                  ? `No events matching "${searchQuery}"`
                  : isHappening
                    ? 'There are no events happening right now.'
                    : 'There are no upcoming events right now.'
              }
              icon={searchQuery ? 'search-outline' : 'calendar-outline'}
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
    color: '#FFFFFF',
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
});
