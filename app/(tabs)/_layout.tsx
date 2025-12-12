
import EventIcon from '@/assets/images/events-icon.svg';
import NewsIcon from '@/assets/images/news-icon.svg';
import ProfileIcon from '@/assets/images/profile-icon.svg';
import { xs } from '@/constants/font_constants';
import useTheme from '@/hooks/useTheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabMuted,
        tabBarStyle: {
          backgroundColor: colors.tertiary,
          borderTopColor: colors.primary,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: xs,
        },
        sceneStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
        <Tabs.Screen 
          name="index" 
          options={{
            title: 'Home',
            tabBarIcon: ({color, size}) => (
              <EventIcon width={size} height={size} fill={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'News',
            tabBarIcon: ({ color, size }) => (
              <NewsIcon width={size} height={size} fill={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon width={size} height={size} fill={color} />
            ),
          }}
        />
    </Tabs>
  )
}


