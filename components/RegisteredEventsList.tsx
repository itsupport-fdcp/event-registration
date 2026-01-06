import React from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';
import RegisteredEventCard from './RegisteredEventCard';

interface RegisteredEvent {
  id: string;
  imageSource?: ImageSourcePropType;
  title: string;
  hostedBy: string;
  time: string;
  date: string;
}

interface RegisteredEventsListProps {
  events?: RegisteredEvent[];
}

const defaultEvents: RegisteredEvent[] = [
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
];

export default function RegisteredEventsList({ events = defaultEvents }: RegisteredEventsListProps) {
  return (
    <FlatList
      data={events}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RegisteredEventCard
          id={item.id}
          imageSource={item.imageSource}
          title={item.title}
          hostedBy={item.hostedBy}
          time={item.time}
          date={item.date}
        />
      )}
      scrollEnabled={false}
    />
  );
}
