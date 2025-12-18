import { contentWrapperPadding } from '@/constants/content';
import { l, m, xl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { colors } = useTheme();
  const router = useRouter();

  const menuItems = [
    { icon: 'bookmark-outline', label: 'Saved', action: () => router.push('../saved') },
    { icon: 'calendar-outline', label: 'Registered Events', action: () => console.log('Registered Events pressed') },
    { icon: 'create-outline', label: 'Edit Profile', action: () => console.log('Edit Profile pressed'), hasDropdown: true },
    { icon: 'time-outline', label: 'History', action: () => console.log('History pressed') },
    { icon: 'trash-outline', label: 'Clear credentials', action: () => console.log('Clear credentials pressed'), isDestructive: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentWrapper}>
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.tertiary }]}>
            <Ionicons name="person" size={60} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.primary }]}>Lorem Ipsum</Text>
            <Text style={[styles.userEmail, { color: colors.secondary }]}>loremipsum@email.com</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.isDestructive ? '#FF4444' : colors.primary}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    { color: item.isDestructive ? '#FF4444' : colors.primary }
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              {item.hasDropdown && (
                <Ionicons name="chevron-down" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  pageTitle: {
    fontSize: xl,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
  menuContainer: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
});
