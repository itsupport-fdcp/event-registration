import QRCode from '@/components/QRCode';
import { contentWrapperPadding } from '@/constants/content';
import { l, m, xl, xxl } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RegistrationDetails {
  id: string;
  eventTitle: string;
  eventDescription: string;
  hostedBy: string;
  time: string;
  date: string;
  location: string;
  registrationCode: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function RegisteredEventDetail() {
  const { registrationId } = useLocalSearchParams();
  const { colors } = useTheme();
  const router = useRouter();
  const [registration, setRegistration] = useState<RegistrationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationDetails();
  }, [registrationId]);

  const fetchRegistrationDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`YOUR_API_URL/registrations/${registrationId}`, {
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });
      // const data = await response.json();

      // Mock data for now
      const mockRegistration: RegistrationDetails = {
        id: registrationId as string,
        eventTitle: 'Goyo',
        eventDescription: 'A historical biographical film',
        hostedBy: 'Film Society',
        time: '1:00 PM',
        date: 'FEB 5, 2025',
        location: 'Main Auditorium, Building A',
        registrationCode: `ZOFGK-${registrationId}`,
        status: 'confirmed',
      };

      // Simulate network delay
      setTimeout(() => {
        setRegistration(mockRegistration);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch registration details:', error);
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!registration) return;

    try {
      await Share.share({
        message: `My registration for ${registration.eventTitle}\nCode: ${registration.registrationCode}\nDate: ${registration.date} at ${registration.time}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCancelRegistration = () => {
    // TODO: Implement cancellation logic
    console.log('Cancel registration');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!registration) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Registration not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Your Ticket</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {/* QR Code Card */}
          <View style={styles.qrCard}>
            <Text style={styles.qrCardTitle}>Scan QR code</Text>
            <Text style={styles.qrCardSubtext}>show this code at the selected service point.</Text>

            <View style={styles.qrCodeContainer}>
              <QRCode
                value={registration.registrationCode}
                size={200}
                backgroundColor="#FFFFFF"
                color="#000000"
              />
            </View>

            <Text style={styles.orText}>or enter code manually</Text>

            <LinearGradient
              colors={['#580076', '#E200A9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.codeButton}
            >
              <Text style={styles.codeButtonText}>{registration.registrationCode}</Text>
            </LinearGradient>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download-outline" size={24} color="#000000" />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Ionicons name="copy-outline" size={24} color="#000000" />
                <Text style={styles.actionText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.eventTitle}>{registration.eventTitle}</Text>

            <View style={styles.detailRow}>
              <Ionicons name="people" size={20} color="#666666" />
              <Text style={styles.detailText}>Hosted by: {registration.hostedBy}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color="#666666" />
              <Text style={styles.detailText}>{registration.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#666666" />
              <Text style={styles.detailText}>{registration.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="location" size={20} color="#666666" />
              <Text style={styles.detailText}>{registration.location}</Text>
            </View>
          </View>

          {/* Cancel Button */}
          {registration.status === 'confirmed' && (
            <TouchableOpacity
              onPress={handleCancelRegistration}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel Registration</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: l,
    fontFamily: 'Poppins-SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: contentWrapperPadding,
    paddingVertical: 12,
    paddingTop: 50,
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: xl,
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    flex: 1,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
    gap: 16,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  qrCardTitle: {
    fontSize: xl,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    marginBottom: 8,
  },
  qrCardSubtext: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  qrCodeContainer: {
    marginBottom: 24,
  },
  orText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  codeButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 24,
  },
  codeButtonText: {
    fontSize: l,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 40,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  eventTitle: {
    fontSize: xxl,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  detailText: {
    fontSize: m,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
  },
});
