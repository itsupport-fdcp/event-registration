import { createHeaderStyles } from '@/assets/styles/header.styles';
import useTheme from '@/hooks/useTheme';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { useSegments } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ROUTE_LABELS: Record<string, string> = {
  news: 'News',
  screening: 'Screenings',
  profile: 'Profile',
  saved: 'Saved',
  '(tabs)': 'Look for events',
  '[screeningsId]': 'Screenings',
  '[eventId]': 'Event Details',
  '[screeningId]': 'Screening Details',
  '[newsId]': 'News Details',
  '+not-found': 'Not Found',
};

export default function Header({ title }: { title?: string }) {
  const { colors } = useTheme();
  const headerColors = createHeaderStyles(colors);
  const today = new Date();
  const segments = useSegments();

  const lastSegment = segments?.length ? segments[segments.length - 1] : 'Home';
  console.log(lastSegment);
  const derived = ROUTE_LABELS[lastSegment] ??
    lastSegment.replace(/[-_]/g, ' ').replace(/(^|\s)\w/g, (c) => c.toUpperCase());
  const label = title ?? derived ?? 'App';

  return (
    <View style={headerColors.container}>
      <Image
        onLoad={() => { console.log('Image loaded'); }}
        source={require('@/assets/images/logo.png')}
        style={{ width: 100, height: 100 }}
      />
      <View style={headerColors.titleContainer}>
        <Text style={headerColors.header}>{label}</Text>
        <Text style={headerColors.subHeader}>{format(today, 'EEEE, MMMM d, yyyy')}</Text>
      </View>
    </View>
  );
}

