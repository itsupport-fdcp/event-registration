import { l, m, s, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Screening {
  id: string;
  title: string;
  director: string;
  rating: string;
  price: string;
  date?: string;
}

export default function ScreeningDetails() {
  const { screeningsId } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();
  console.log(screeningsId);
  const screening = {
    title: 'Sine Sinta: Pag-ibig at pelikula',
    dateRange: 'February 5 - 16, 2025',
    imageSource: require('@/assets/images/logo.png'),
    screenings: [
      {
        id: '1',
        title: 'Goyo',
        director: 'Jerrold Tarog',
        rating: 'R-13',
        price: 'Free',
      },
      {
        id: '2',
        title: 'Heneral Luna',
        director: 'Jerrold Tarog',
        rating: 'R-13',
        price: 'Free',
      },
      {
        id: '3',
        title: 'Mula sa Kung Ano ang Noon',
        director: 'Lav Diaz',
        rating: 'R-16',
        price: '₱100',
      },
      {
        id: '4',
        title: 'Batch 81',
        director: 'Mike de Leon',
        rating: 'R-18',
        price: '₱150',
      },
    ] as Screening[],
  };

  // const getRatingColor = (rating: string) => {
  //   if (rating === 'R-13') return '#4CAF50';
  //   if (rating === 'R-16') return '#FF9800';
  //   if (rating === 'R-18') return '#F44336';
  //   return colors.primary;
  // };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
      <Ionicons name="arrow-back" size={28} color={colors.primary} />
    </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={screening.imageSource}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.primary }]}>{screening.title}</Text>
          <View style={styles.dateRangeContainer}>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <Text style={[styles.dateRange, { color: colors.primary }]}>{screening.dateRange}</Text>
          </View>
          <View style={styles.screeningSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Screenings</Text>
            {screening.screenings.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/screening/details/${item.id}` as any)}
              >
                <View style={[styles.screeningCard, { backgroundColor: colors.tertiary }]}>
                  <View style={styles.screeningImageContainer}>
                    <Image
                      source={screening.imageSource}
                      style={styles.screeningImage}
                      contentFit="cover"
                    />
                  </View>

                  <View style={styles.screeningContent}>
                    <Text style={[styles.screeningTitle, { color: colors.text }]} numberOfLines={1}>
                      {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
                    </Text>
                    <Text style={[styles.director, { color: colors.text }]} numberOfLines={1}>
                      {item.director}
                    </Text>
                    <View style={styles.bottomRow}>
                      <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
                    </View>
                  </View>

                  <View style={[styles.ratingBadge]}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: xl,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  dateRange: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
  screeningSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  screeningCard: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  screeningImageContainer: {
    width: 84,
    height: 84,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1
  },
  screeningImage: {
    width: '100%',
    height: '100%',
  },
  screeningContent: {
    gap: 8,
    flex: 1,
  },
  screeningTitle: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
  director: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  screeningMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  price: {
    fontSize: m,
    fontFamily: 'Poppins-Bold',
  },
});
