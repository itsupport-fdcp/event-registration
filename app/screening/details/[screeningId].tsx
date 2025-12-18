import { l, m, s, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DateTimeSession {
  id: string;
  date: string;
  time: string;
  location: string;
}

export default function ScreeningDetailsPage() {
  const { screeningId } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState('Iloilo');

  const screening = {
    title: 'Gitling',
    imageSource: require('@/assets/images/logo.png'),
    locations: ['Iloilo', 'Davao', 'Negros', 'Manila', 'Cebu'],
    sessions: [
      { id: '1', date: 'February 6, 2025', time: '3:00 PM', location: 'Iloilo' },
      { id: '2', date: 'February 7, 2025', time: '3:00 PM', location: 'Iloilo' },
      { id: '3', date: 'February 13, 2025', time: '3:00 PM', location: 'Iloilo' },
      { id: '4', date: 'February 8, 2025', time: '2:00 PM', location: 'Davao' },
      { id: '5', date: 'February 9, 2025', time: '5:00 PM', location: 'Davao' },
      { id: '6', date: 'February 10, 2025', time: '1:00 PM', location: 'Negros' },
      { id: '7', date: 'February 11, 2025', time: '4:00 PM', location: 'Negros' },
      { id: '8', date: 'February 12, 2025', time: '6:00 PM', location: 'Manila' },
      { id: '9', date: 'February 14, 2025', time: '3:30 PM', location: 'Manila' },
      { id: '10', date: 'February 15, 2025', time: '2:30 PM', location: 'Cebu' },
    ] as DateTimeSession[],
    mapLocation: 'Cinema venue location',
  };

  const filteredSessions = screening.sessions.filter(
    session => session.location === selectedLocation
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={screening.imageSource}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.primary }]}>{screening.title}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.locationScrollView}
            contentContainerStyle={styles.locationTags}
          >
            {screening.locations.map((location, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedLocation(location)}
              >
                <LinearGradient
                  colors={selectedLocation === location ? ['#580076', '#E200A9'] : [colors.tertiary, colors.tertiary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.locationChip}
                >
                  <Text style={[
                    styles.locationText,
                    { color: selectedLocation === location ? '#FFFFFF' : colors.text }
                  ]}>
                    {location}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sessionsSection}>
            {filteredSessions.map((session) => (
              <LinearGradient
                key={session.id}
                colors={['#580076', '#E200A9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sessionCard}
              >
                <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                  <Text style={styles.sessionTime}>{session.time}</Text>
                </View>
              </LinearGradient>
            ))}
          </View>
          <View style={styles.mapSection}>
            <Text style={[styles.locationLabel, { color: colors.primary }]}>Location</Text>
            <View style={[styles.mapPreview, { backgroundColor: colors.input_bg }]}>
              <Ionicons name="map-outline" size={40} color={colors.text} />
              <Text style={[styles.mapText, { color: colors.text }]}>Map Preview</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  heroContainer: {
    width: '100%',
    height: 400,
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
    marginBottom: 16,
  },
  locationScrollView: {
    marginBottom: 24,
  },
  locationTags: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  locationChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  locationText: {
    fontSize: s,
    fontFamily: 'Poppins-SemiBold',
  },
  sessionsSection: {
    gap: 12,
    marginBottom: 24,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDate: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  mapSection: {
    marginTop: 8,
  },
  locationLabel: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  mapPreview: {
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
});
