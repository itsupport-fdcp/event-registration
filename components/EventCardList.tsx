import React from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import EventCard from './EventCard';

interface Event {
  id: string;
  time: string;
  title: string;
  hosted_by: string;
  imageSource?: ImageSourcePropType;
}

interface EventCardListProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
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

export default function EventCardList({ events = defaultEvents }: EventCardListProps) {
  return (
    <FlatList
      data={events}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <EventCard
            time={item.time}
            title={item.title}
            hosted_by={item.hosted_by}
            imageSource={item.imageSource}
          />
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingRight: 24,
  },
  cardWrapper: {
    width: 300,
    marginRight: 16,
  },
});
