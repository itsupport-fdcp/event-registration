import EmptyState from '@/components/empty states/EmptyState';
import EventCardList, { defaultEvents as happeningEvents } from '@/components/EventCardList';
import SearchBar from "@/components/SearchBar";
import UpcomingEventsList, {
  defaultEvents as upcomingEvents,
  type UpcomingEvent,
} from '@/components/UpcomingEventsList';
import { contentWrapperPadding } from '@/constants/content';
import { l, s } from "@/constants/fonts";
import useTheme from "@/hooks/useTheme";
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const happeningResults = useMemo<UpcomingEvent[]>(() => {
    if (!normalizedQuery) return [];

    return happeningEvents
      .filter(
        (event) =>
          event.title.toLowerCase().includes(normalizedQuery) ||
          event.hosted_by.toLowerCase().includes(normalizedQuery) ||
          event.time.toLowerCase().includes(normalizedQuery),
      )
      .map((event) => ({
        id: event.id,
        title: event.title,
        description: 'Happening now',
        hostedBy: event.hosted_by,
        date: event.time,
        type: event.type,
      }));
  }, [normalizedQuery]);

  const upcomingResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return upcomingEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery) ||
        event.hostedBy.toLowerCase().includes(normalizedQuery) ||
        event.date.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const hasSearchResults = happeningResults.length > 0 || upcomingResults.length > 0;

  const openEvents = (section: 'happening' | 'upcoming') => {
    router.push({ pathname: '/events', params: { section } } as any);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.contentWrapper}>
        <SearchBar
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {isSearching ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Search results</Text>
            </View>

            {hasSearchResults ? (
              <>
                {happeningResults.length > 0 && <UpcomingEventsList events={happeningResults} />}
                {upcomingResults.length > 0 && <UpcomingEventsList events={upcomingResults} />}
              </>
            ) : (
              <EmptyState
                header="No Results Found"
                description={`No events matching "${searchQuery.trim()}"`}
                icon="search-outline"
                showHomeLink={false}
              />
            )}
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Happening now</Text>
              <TouchableOpacity
                accessibilityLabel="See all happening events"
                accessibilityRole="link"
                hitSlop={8}
                onPress={() => openEvents('happening')}
              >
                <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
              </TouchableOpacity>
            </View>
            <EventCardList />
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Upcoming events</Text>
              <TouchableOpacity
                accessibilityLabel="See all upcoming events"
                accessibilityRole="link"
                hitSlop={8}
                onPress={() => openEvents('upcoming')}
              >
                <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
              </TouchableOpacity>
            </View>
            <UpcomingEventsList />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllText: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
  },
});
