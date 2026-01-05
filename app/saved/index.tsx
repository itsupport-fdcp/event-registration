import EmptyState from '@/components/empty states/EmptyState';
import { contentWrapperPadding } from '@/constants/content';
import { l, m, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SavedItems() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>

      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          {/* <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Saved Events</Text>
            <UpcomingEventsList />
          </View> */}
          
          <EmptyState
            header="No Saved Items"
            description="You haven't saved any items yet."
            icon="bookmark-outline"
          />
         
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
    paddingTop: 50,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: xl,
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
});
