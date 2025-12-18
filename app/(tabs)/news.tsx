import MoreNewsCardList from '@/components/MoreNewsCardList';
import NewsCardList from '@/components/NewsCardList';
import SearchBar from '@/components/SearchBar';
import { contentWrapperPadding } from '@/constants/content';
import { l, s } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function news() {

  const { colors } = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.contentWrapper}>
        <SearchBar placeholder="Search news..." onSearch={(text: string) => console.log(`Searching for ${text}`)}/>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Latest news</Text>
            <TouchableOpacity onPress={() => console.log('See all pressed')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>

          <NewsCardList />

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>More news</Text>
          </View>
          <MoreNewsCardList />
      </View>
    </ScrollView>
  )
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
})