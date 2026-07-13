import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import EmptyState from './empty states/EmptyState';
import type { News } from './NewsCard';
import NewsCard from './NewsCard';

interface NewsCardListProps {
  news?: News[];
  horizontal?: boolean;
}

export const defaultNews: News[] = [
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


export default function NewsCardList({
  news = defaultNews,
  horizontal = true,
}: NewsCardListProps) {
  return (
      <FlatList
        data={news}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id || ''}
        ListEmptyComponent={
          <EmptyState
            compact
            header="No Latest News"
            description="There are no latest news stories right now."
            icon="newspaper-outline"
            showHomeLink={false}
          />
        }
        renderItem={({ item }) => (
          <View style={horizontal ? styles.horizontalCardWrapper : styles.verticalCardWrapper}>
            <NewsCard
              id={item.id}
              date={item.date}
              author={item.author}
              headline={item.headline}
              description={item.description}
              imageSource={item.imageSource}
              category={item.category}
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
