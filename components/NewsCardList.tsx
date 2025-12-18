import { s } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { News } from './NewsCard';
import NewsCard from './NewsCard';

interface NewsCardListProps {
  news?: News[];
}

const defaultNews: News[] = [
  {
    id: '1',
    date: '12/10/2024',
    author: 'John Doe',
    headline: 'Tech Conference 2024 Recap',
    description: 'An amazing gathering of tech enthusiasts sharing innovative ideas and networking opportunities.',
    category: 'Film Philippines',
  },
  {
    id: '2',
    date: '12/08/2024',
    author: 'Jane Smith',
    headline: 'New Features Released',
    description: 'We are excited to announce several new features that will enhance your experience.',
    category: 'Film Philippines',
  },
  {
    id: '3',
    date: '12/05/2024',
    author: 'Mike Johnson',
    headline: 'Important System Maintenance',
    description: 'Scheduled maintenance will occur this weekend. Please plan accordingly.',
    category: 'Philippine Film Archive',
  },
  {
    id: '4',
    date: '12/03/2024',
    author: 'Sarah Williams',
    headline: 'Workshop: Design Thinking',
    description: 'Join us for an interactive workshop on design thinking and user experience.',
    category: 'Safe Filming',
  },
];


export default function NewsCardList({ news = defaultNews }: NewsCardListProps) {
  const { colors } = useTheme();


  return (
      <FlatList
        data={news}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <NewsCard
              date={item.date}
              author={item.author}
              headline={item.headline}
              description={item.description}
              imageSource={item.imageSource}
              category={item.category}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
  );
}

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: s,
    fontFamily: 'Poppins-Medium',
  },
  listContainer: {
    paddingRight: 24,
  },
  cardWrapper: {
    width: 300,
    marginRight: 16,
  },
});
