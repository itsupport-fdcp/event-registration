import React from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import EmptyState from './empty states/EmptyState';
import EventCard from './EventCard';

export interface Event {
  id: string;
  time: string;
  title: string;
  hosted_by: string;
  imageSource?: ImageSourcePropType;
  type?: 'event' | 'screening';
}

interface EventCardListProps {
  events?: Event[];
  horizontal?: boolean;
}

export const defaultEvents: Event[] = [
  {
    id: '1',
    time: '2 hours ago',
    title: 'Tech Conference 2024',
    hosted_by: 'Tech Community',
  },
  {
    id: '2',
    time: '2:00 PM - 4:00 PM',
    title: 'Design Workshop',
    hosted_by: 'Creative Studio',
  },
  {
    id: '3',
    time: '6:00 PM - 8:00 PM',
    title: 'Networking Event',
    hosted_by: 'Business Hub',
  },
  {
    id: '4',
    time: '9:00 AM - 11:00 AM',
    title: 'Startup Pitch',
    hosted_by: 'Innovation Lab',
  },
];

export default function EventCardList({
  events = defaultEvents,
  horizontal = true,
}: EventCardListProps) {
  return (
    <FlatList
      data={events}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <EmptyState
          compact
          header="No Events Happening"
          description="There are no events happening right now."
          icon="calendar-outline"
          showHomeLink={false}
        />
      }
      renderItem={({ item }) => (
        <View style={horizontal ? styles.horizontalCardWrapper : styles.verticalCardWrapper}>
          <EventCard
            id={item.id}
            time={item.time}
            title={item.title}
            hosted_by={item.hosted_by}
            imageSource={item.imageSource}
            type={item.type}
          />
        </View>
      )}
      contentContainerStyle={horizontal ? styles.horizontalListContainer : undefined}
      scrollEnabled={horizontal}
    />
  );
}

const styles = StyleSheet.create({
  horizontalListContainer: {
    paddingRight: 24,
  },
  horizontalCardWrapper: {
    width: 300,
    marginRight: 16,
  },
  verticalCardWrapper: {
    marginBottom: 16,
  },
});
