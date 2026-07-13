import MoreNewsCardList from '@/components/MoreNewsCardList';
import { l, m, medjoLargeLang, s } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NewsDetails() {
  const { newsId } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();
  console.log('News ID:', newsId);

  const news = {
    id: newsId,
    headline: 'FDCP AND FDCP CINEMATHEQUE MANILA CELEBRATE EUROPEAN FILM WITH FREE SCREENINGS AND FESTIVE ACTIVITIES',
    category: 'Film Philippines',
    date: 'November 19, 2025',
    imageSource: require('@/assets/images/logo.png'),
    content: `The Film Development Council of the Philippines (FDCP) and FDCP Cinematheque Manila are thrilled to announce the European Film Festival 2025, a celebration of the finest in European cinema. This year's festival brings together award-winning films from across the continent, showcasing diverse stories and artistic excellence.

The festival will feature screenings of critically acclaimed films, including works from renowned directors and emerging filmmakers. Attendees will have the opportunity to experience the richness of European culture through the lens of cinema.

In addition to film screenings, the festival will host panel discussions with filmmakers, actors, and industry professionals. These sessions will provide insights into the creative process and the future of European cinema.

The FDCP is committed to promoting film appreciation and education in the Philippines. This festival is part of our ongoing efforts to bring world-class cinema to Filipino audiences and foster cultural exchange through the power of film.`,
    author: 'FDCP Communications Team',
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.heroImageContainer}>
          <Image
            source={news.imageSource}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>
        <View style={styles.content}>
          <LinearGradient
              colors={['#580076', '#E200A9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryTag}
          >
              <Text style={[
              styles.typeText,
              { color: '#FFFFFF'}
              ]}>
              {news.category}
              </Text>
          </LinearGradient>
          <Text style={[styles.date, { color: colors.secondary }]}>
            {news.date}
          </Text>
          <View style={styles.headlineContainer}>
            <Text style={[styles.headline, { color: colors.primary }]}>
              {news.headline}
            </Text>
          </View>
          <Text style={[styles.bodyText, { color: colors.text }]}>
            {news.content}
          </Text>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>More news</Text>
          <MoreNewsCardList />
        </View>



      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImageContainer: {
    width: '100%',
    height: 300,
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: s,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  date: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
  },
  headlineContainer: {
    marginBottom: 20,
  },
  headline: {
    fontSize: medjoLargeLang,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 28,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    marginBottom: 20,
  },
  author: {
    fontSize: s,
    fontFamily: 'Poppins-Medium',
    marginTop: 8,
  },

  typeText: {
    fontSize: s,
    fontFamily: 'Poppins-SemiBold',
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    padding: 4,
  },
});
