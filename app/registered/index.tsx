import EmptyState from '@/components/empty states/EmptyState';
import RegisteredEventsList from '@/components/RegisteredEventsList';
import SearchBar from '@/components/SearchBar';
import { contentWrapperPadding } from '@/constants/content';
import { l, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RegisteredEvent {
  id: string;
  imageSource?: ImageSourcePropType;
  title: string;
  hostedBy: string;
  time: string;
  date: string;
}

export default function RegisteredEvents() {
  const { colors } = useTheme();
  const router = useRouter();
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call when auth is implemented
      // const { user } = useAuth();
      // const response = await fetch(`YOUR_API_URL/users/${user.id}/registered-events`, {
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });
      // const data = await response.json();
      // setRegisteredEvents(data);

      // Mock data for now - simulate network delay
      setTimeout(() => {
        setRegisteredEvents([
          {
            id: '1',
            title: 'Goyo',
            hostedBy: 'Film Society',
            time: '1:00 PM',
            date: 'FEB 5, 2025',
          },
          {
            id: '2',
            title: 'Tech Conference',
            hostedBy: 'Tech Academy',
            time: '9:00 AM',
            date: 'FEB 12, 2025',
          },
          {
            id: '3',
            title: 'Art Workshop',
            hostedBy: 'Art Gallery',
            time: '3:00 PM',
            date: 'FEB 18, 2025',
          },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Failed to fetch registered events:', error);
      setLoading(false);
    }
  };

  const filteredEvents = registeredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.hostedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.contentWrapper}>
        <SearchBar
          placeholder="Search registered events"
          onSearch={(text: string) => setSearchQuery(text)}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : filteredEvents.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                Registered Events
              </Text>
              <RegisteredEventsList events={filteredEvents} />
            </View>
          ) : searchQuery ? (
            <EmptyState
              header="No Results Found"
              description={`No events matching "${searchQuery}"`}
              icon="search-outline"
            />
          ) : (
            <EmptyState
              header="No Registered Events"
              description="You haven't registered for any events yet."
              icon="ticket-outline"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 4,
    paddingLeft: contentWrapperPadding,
    paddingTop: 50,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
});
