import { m, xs } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RegisteredEventCardProps {
  id?: string;
  imageSource?: ImageSourcePropType;
  title?: string;
  hostedBy?: string;
  time?: string;
  date?: string;
}

export default function RegisteredEventCard({
  id = "1",
  imageSource,
  title = "Event Title",
  hostedBy = "Host Name",
  time = "1:00 PM",
  date = "FEB 5, 2025",
}: RegisteredEventCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the registered event QR display page
    router.push({
      pathname: '/registered/[registrationId]',
      params: { registrationId: id }
    } as any);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: colors.tertiary }]}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource || require('@/assets/images/logo.png')}
            style={styles.image}
            contentFit="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContent}>
            <Text style={[styles.time, { color: colors.text }]} numberOfLines={1}>
              {time}
            </Text>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.metadata, { color: colors.text }]} numberOfLines={1}>
              hosted by: {hostedBy}
            </Text>
            <Text style={[styles.helperText, { color: colors.text, opacity: 0.6 }]} numberOfLines={1}>
              Tap to view QR
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={['#CC8500', '#FFCC00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.dateChip}
        >
          <Text style={styles.dateText} numberOfLines={1}>{date}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 12,
    padding: 12,
    position: 'relative',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  textContent: {
    gap: 2,
  },
  time: {
    fontSize: m,
    fontFamily: 'Poppins-Bold',
  },
  title: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
  metadata: {
    fontSize: xs,
    fontFamily: 'Poppins-Regular',
  },
  helperText: {
    fontSize: xs,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  dateChip: {
    position: 'absolute',
    right: 12,
    top: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    fontSize: xs,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});
