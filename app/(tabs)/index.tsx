import EventCardList from '@/components/EventCardList';
import SearchBar from "@/components/SearchBar";
import UpcomingEventsList from '@/components/UpcomingEventsList';
import { contentWrapperPadding } from '@/constants/content';
import { l, s } from "@/constants/fonts";
import useTheme from "@/hooks/useTheme";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.contentWrapper}>
        <SearchBar placeholder="Search events..." onSearch={(text: string) => console.log(`Searching for ${text}`)}/>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Happening now</Text>
          <TouchableOpacity onPress={() => console.log('See all pressed')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
          </TouchableOpacity>
        </View>
        <EventCardList />
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Upcoming events</Text>
        </View>
        <UpcomingEventsList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllText: {
    fontSize: s,
    fontFamily: 'Poppins-Regular',
  },
});
