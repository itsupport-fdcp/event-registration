import React from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';
import UpcomingEventCard from './UpcomingEventCard';

interface UpcomingEvent {
  id: string;
  imageSource?: ImageSourcePropType;
  title: string;
  description: string;
  hostedBy: string;
  date: string;
  attendeeCount?: number;
  type?: 'event' | 'screening';
}

interface UpcomingEventsListProps {
  events?: UpcomingEvent[];
}

const defaultEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Movie Screening',
    description: 'Join us for an exclusive movie screening event',
    hostedBy: 'Film Society',
    date: 'Dec 15 - Mar 31, 2025',
    attendeeCount: 23,
    type: 'screening',
  },
  {
    id: '2',
    title: 'Tech Workshop',
    description: 'Learn the latest web development technologies',
    hostedBy: 'Tech Academy',
    date: 'Dec 18, 2025',
    type: 'event',
  },
  {
    id: '3',
    title: 'Art Exhibition',
    description: 'Explore contemporary art from local artists',
    hostedBy: 'Art Gallery',
    date: 'Dec 20, 2025',
    attendeeCount: 45,
    type: 'event',
  },
  {
    id: '4',
    title: 'Music Concert',
    description: 'Live performance by renowned musicians',
    hostedBy: 'Music Hall',
    date: 'Dec 22, 2025',
    attendeeCount: 12,
    type: 'event',
  },
];

export default function UpcomingEventsList({ events = defaultEvents }: UpcomingEventsListProps) {
  return (
    <FlatList
      data={events}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UpcomingEventCard
          id={item.id}
          imageSource={item.imageSource}
          title={item.title}
          description={item.description}
          hostedBy={item.hostedBy}
          date={item.date}
          attendeeCount={item.attendeeCount}
          type={item.type}
        />
      )}
      scrollEnabled={false}
    />
  );
}
