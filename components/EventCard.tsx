import { l, m } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EventCardProps {
  id: string;
  time?: string;
  title?: string;
  hosted_by?: string;
  imageSource?: ImageSourcePropType;
  type?: 'event' | 'screening';
}

export default function EventCard({
  id,
  time = "Time",
  title = "Title",
  hosted_by = "Host",
  imageSource,
  type = 'event',
}: EventCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    const route = type === 'screening' ? `/screening/${id}` : `/event/${id}`;
    router.push(route as any);
  };

  return (
    <TouchableOpacity
      accessibilityLabel={`View ${title}`}
      accessibilityRole="link"
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageSource || require('@/assets/images/logo.png')}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      <View style={[styles.labelContainer, { backgroundColor: colors.tertiary }]}>
        <View style={styles.titleRow}>
          {title && (
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
          )}
        </View>
        <View style={styles.titleRow}>
          <Ionicons name="time-outline" size={24} color={colors.text} style={styles.clockIcon} />
          {time && (
            <Text style={[styles.time, { color: colors.text }]}>
              {time}
            </Text>
          )}
        </View>
        {hosted_by && (
          <Text style={[styles.hosted_by, { color: colors.text }]}>
            Hosted by: {hosted_by}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 325,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    padding: 16,
    minHeight: 110,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clockIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: l,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  time: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
  hosted_by: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
});
