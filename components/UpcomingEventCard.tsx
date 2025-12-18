import { m, xs } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UpcomingEventCardProps {
  id?: string;
  imageSource?: ImageSourcePropType;
  title?: string;
  description?: string;
  hostedBy?: string;
  date?: string;
  attendeeCount?: number;
  type?: 'event' | 'screening';
}

export default function UpcomingEventCard({
  id = "1",
  imageSource,
  title = "Event Title",
  description = "Event description",
  hostedBy = "Host Name",
  date = "",
  attendeeCount,
  type = "event",
}: UpcomingEventCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    const route = type === 'screening' ? `/screening/${id}` : `/event/${id}`;
    router.push(route as any);
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
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
            <Text style={[styles.description, { color: colors.text }]} numberOfLines={1}>
              {description}
            </Text>
            <Text style={[styles.metadata, { color: colors.text }]} numberOfLines={1}>
              Hosted by: {hostedBy}
            </Text>
          </View>
          <View style={styles.ctaContainer}>
            <LinearGradient
              colors={['#580076', '#E200A9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Ionicons name="people" size={14} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText} numberOfLines={1}>
                {attendeeCount ? `${attendeeCount} joined` : 'Join first!'}
              </Text>
            </LinearGradient>
            <LinearGradient
              colors={['#CC8500', '#FFCC00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.secondaryButton}
            >
              <Text style={styles.buttonText} numberOfLines={1}>{date}</Text>
            </LinearGradient>

          </View>
        </View>
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
    padding: 8,
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
    justifyContent: 'space-between',
  },
  textContent: {
    marginBottom: 8,
  },
  title: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  description: {
    fontSize: xs,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  metadata: {
    fontSize: xs,
    fontFamily: 'Poppins-Regular',
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    fontSize: xs,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    flexShrink: 1,
  },
});
