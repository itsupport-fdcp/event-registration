import { s } from "@/constants/fonts";
import useTheme from "@/hooks/useTheme";
import { format } from 'date-fns';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MoreNewsCard from "./MoreNewsCard";
import type { News } from './NewsCard';

const today = new Date();

const defaultNews: News[] = [
  {
    id: '1',
    date: format(today, 'MMM d, 2025'),
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
    date: format(today, 'MMM d, 2025'),
    author: 'Mike Johnson',
    headline: 'Important System Maintenance',
    description: 'Scheduled maintenance will occur this weekend. Please plan accordingly.',
    category: 'Philippine Film Archive',
  },
  {
    id: '4',
    date: format(today, 'MMM d, 2025'),
    author: 'Sarah Williams',
    headline: 'Workshop: Design Thinking',
    description: 'Join us for an interactive workshop on design thinking and user experience.',
    category: 'Safe Filming',
  },
];


interface MoreNewsCardListProps {
    news?: News[];
}

export default function MoreNewsCardList({
    news = defaultNews,
}: MoreNewsCardListProps  ) {


    const newsTypes: ('Film Philippines' | 'Safe Filming' | 'Philippine Film Archive' | 'All')[] = ['All', 'Film Philippines', 'Safe Filming', 'Philippine Film Archive'];
    const { colors } = useTheme();
    const [newsType, setNewsType] = useState<'Film Philippines' | 'Safe Filming' | 'Philippine Film Archive' | 'All'>('All');

    const filteredNews = newsType === 'All' ? news : news.filter(item => item.category === newsType);

    return (
        <View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.typeScrollView}
                contentContainerStyle={styles.typeTags}
            >
                {
                    newsTypes.map((type, index) => (

                        <TouchableOpacity
                            key={index}
                            onPress={() => setNewsType(type)}
                        >
                            <LinearGradient
                                colors={newsType === type ? ['#580076', '#E200A9'] : [colors.tertiary, colors.tertiary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.typeChip}
                            >
                                <Text style={[
                                styles.typeText,
                                { color: newsType === type ? '#FFFFFF' : colors.text }
                                ]}>
                                {type}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <FlatList
                data={filteredNews}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item) => item.id || ''}
                renderItem={({item}) => (
                    <MoreNewsCard
                        id={item.id}
                        date={item.date}
                        author={item.author}
                        headline={item.headline}
                        description={item.description}
                        imageSource={item.imageSource}
                        category={item.category}
                    />
                )}
            />
        </View>

    );
    }

const styles = StyleSheet.create({
    typeScrollView: {
        marginBottom: 24,
    },
    typeTags: {
        flexDirection: 'row',
        gap: 8,
        paddingRight: 16,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    typeText: {
        fontSize: s,
        fontFamily: 'Poppins-SemiBold',
    },
});