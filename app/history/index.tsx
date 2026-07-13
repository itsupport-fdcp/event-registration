import EmptyState from '@/components/empty states/EmptyState';
import RegisteredEventsList, { type RegisteredEvent } from '@/components/RegisteredEventsList';
import { contentWrapperPadding } from '@/constants/content';
import { l, s } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Preview records until the authenticated history endpoint is available.
const sampleHistory: RegisteredEvent[] = [
  {
    id: '1',
    title: 'Goyo',
    hostedBy: 'Film Society',
    time: '1:00 PM',
    date: 'FEB 5, 2025',
  },
  {
    id: '2',
    title: 'European Film Festival',
    hostedBy: 'FDCP Cinematheque',
    time: '6:30 PM',
    date: 'NOV 19, 2025',
  },
  {
    id: '3',
    title: 'Filmmaking Workshop',
    hostedBy: 'Film Philippines',
    time: '10:00 AM',
    date: 'DEC 3, 2025',
  },
];

export default function History() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {sampleHistory.length > 0 ? (
          <>
            <Text style={[styles.title, { color: colors.primary }]}>Previously attended</Text>
            <Text style={[styles.description, { color: colors.secondary }]}>
              Events and screenings you attended are listed here.
            </Text>
            <RegisteredEventsList events={sampleHistory} variant="history" />
          </>
        ) : (
          <EmptyState
            header="No History Yet"
            description="Events you have attended will appear here."
            icon="time-outline"
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginLeft: contentWrapperPadding - 4,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: contentWrapperPadding,
  },
  title: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: s,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
});
