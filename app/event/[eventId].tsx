import { l, m, s, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();
  console.log(eventId);
  const event = {
    title: 'Event name',
    host: 'Host Name',
    date: 'Thurs, 1:00 PM - 3:00 PM',
    location: 'SM MOA, Pasay City, Metro Manila',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageSource: require('@/assets/images/logo.png'),
    attendeeCount: 45,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={event.imageSource}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.primary }]}>Hosted by</Text>
              <Text style={[styles.infoText, { color: colors.text }]}>{event.host}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.primary }]}>Date & Time</Text>
              <Text style={[styles.infoText, { color: colors.text }]}>{event.date}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.primary }]}>Location</Text>
              <Text style={[styles.infoText, { color: colors.text }]}>{event.location}</Text>
            </View>
          </View>
          <View style={[styles.mapPreview, { backgroundColor: colors.input_bg }]}>
            <Ionicons name="map-outline" size={40} color={colors.text} />
            <Text style={[styles.mapText, { color: colors.text }]}>Map Preview</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.primary }]}>Attendees</Text>
              <Text style={[styles.infoText, { color: colors.text }]}>{event.attendeeCount} people joined</Text>
            </View>
          </View>
          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About this event</Text>
            <Text style={[styles.description, { color: colors.text }]}>{event.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.actionBar, { backgroundColor: colors.tertiary }]}>
        <TouchableOpacity style={styles.saveButton}>
          <LinearGradient
            colors={['#CC8500', '#FFCC00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.secondaryButtonGradient}
          >
            <Ionicons name="bookmark-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rsvpButton}>
          <LinearGradient
            colors={['#580076', '#E200A9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButtonGradient}
          >
            <Text style={styles.buttonText}>RSVP Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: s,
    fontFamily: 'Poppins-SemiBold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  infoText: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
  mapPreview: {
    height: 150,
    borderRadius: 12,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  descriptionSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  saveButton: {
    flex: 1,
  },
  rsvpButton: {
    flex: 2,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  secondaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  buttonText: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});
