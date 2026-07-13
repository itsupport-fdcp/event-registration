import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import { contentWrapperPadding } from '@/constants/content';
import { l, m, s, xs } from '@/constants/fonts';
import { useAuth } from '@/contexts/AuthContext';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { Fragment, useRef, useState } from 'react';
import {
  Animated,
  Alert,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProfileFormValues {
  lastName: string;
  firstName: string;
  contactNumber: string;
  emailAddress: string;
}

type ProfileField = keyof ProfileFormValues;
type ProfileErrors = Partial<Record<ProfileField, string>>;

const existingProfile: ProfileFormValues = {
  lastName: 'Ipsum',
  firstName: 'Lorem',
  contactNumber: '',
  emailAddress: 'loremipsum@email.com',
};

const validateField = (field: ProfileField, value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return 'This field is required.';

  if ((field === 'firstName' || field === 'lastName') && !/^[A-Za-zÀ-ÖØ-öø-ÿÑñ' -]+$/.test(trimmedValue)) {
    return 'Use letters, spaces, apostrophes, or hyphens only.';
  }

  if (field === 'contactNumber') {
    const normalizedNumber = trimmedValue.replace(/[\s()-]/g, '');
    if (!/^\+?\d{10,15}$/.test(normalizedNumber)) {
      return 'Enter a valid contact number with 10 to 15 digits.';
    }
  }

  if (field === 'emailAddress' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return 'Enter a valid email address.';
  }

  return undefined;
};

export default function Profile() {
  const { colors } = useTheme();
  const { clearCredentials } = useAuth();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState(existingProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ProfileField, boolean>>>({});
  const [submitError, setSubmitError] = useState('');
  const chevronProgress = useRef(new Animated.Value(0)).current;

  const menuItems = [
    { icon: 'bookmark-outline', label: 'Saved', action: () => router.push('../saved') },
    { icon: 'calendar-outline', label: 'Registered Events', action: () => router.push('../registered') },
    { icon: 'create-outline', label: 'Edit Profile', action: () => toggleEdit(), hasDropdown: true },
    { icon: 'time-outline', label: 'History', action: () => router.push('/history' as any) },
    { icon: 'trash-outline', label: 'Clear credentials', action: () => handleClearCredentials(), isDestructive: true },
  ];

  const handleClearCredentials = () => {
    Alert.alert(
      'Clear credentials?',
      'This will clear your current session and return you to Home. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearCredentials();
            router.replace('/');
          },
        },
      ],
    );
  };

  const toggleEdit = () => {
    const nextOpenState = !isEditOpen;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsEditOpen(nextOpenState);
    Animated.timing(chevronProgress, {
      duration: 220,
      toValue: nextOpenState ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const updateField = (field: ProfileField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitError('');

    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    }
  };

  const blurField = (field: ProfileField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, form[field]) }));
  };

  const handleSave = () => {
    const fields = Object.keys(form) as ProfileField[];
    const nextErrors = fields.reduce<ProfileErrors>((result, field) => {
      const error = validateField(field, form[field]);
      if (error) result[field] = error;
      return result;
    }, {});

    setTouched(fields.reduce((result, field) => ({ ...result, [field]: true }), {}));
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitError('Please correct the highlighted fields before saving.');
      return;
    }

    setSubmitError('Profile updates are unavailable right now. Please try again later.');
  };

  const chevronRotation = chevronProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.tertiary }]}>
            <Ionicons name="person" size={60} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.primary }]}>
              {existingProfile.firstName} {existingProfile.lastName}
            </Text>
            <Text style={[styles.userEmail, { color: colors.secondary }]}>
              {existingProfile.emailAddress}
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Fragment key={item.label}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={item.hasDropdown ? { expanded: isEditOpen } : undefined}
                activeOpacity={0.7}
                onPress={item.action}
                style={styles.menuItem}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as React.ComponentProps<typeof Ionicons>['name']}
                    size={24}
                    color={item.isDestructive ? '#FF5A5F' : colors.primary}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      { color: item.isDestructive ? '#FF5A5F' : colors.primary },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.hasDropdown ? (
                  <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
                    <Ionicons name="chevron-down" size={20} color={colors.primary} />
                  </Animated.View>
                ) : null}
              </TouchableOpacity>

              {item.hasDropdown && isEditOpen ? (
                <View style={[styles.formCard, { backgroundColor: colors.tertiary }]}>
                  <Text style={[styles.formTitle, { color: colors.text }]}>Personal information</Text>
                  <Text style={[styles.formDescription, { color: colors.secondary }]}>
                    Update the details associated with your account.
                  </Text>

                  <FormField
                    autoCapitalize="words"
                    autoComplete="family-name"
                    error={errors.lastName}
                    icon="person-outline"
                    label="Last Name"
                    onBlur={() => blurField('lastName')}
                    onChangeText={(value) => updateField('lastName', value)}
                    placeholder="Enter your last name"
                    textContentType="familyName"
                    value={form.lastName}
                  />
                  <FormField
                    autoCapitalize="words"
                    autoComplete="given-name"
                    error={errors.firstName}
                    icon="person-outline"
                    label="First Name"
                    onBlur={() => blurField('firstName')}
                    onChangeText={(value) => updateField('firstName', value)}
                    placeholder="Enter your first name"
                    textContentType="givenName"
                    value={form.firstName}
                  />
                  <FormField
                    autoComplete="tel"
                    error={errors.contactNumber}
                    icon="call-outline"
                    inputMode="tel"
                    keyboardType="phone-pad"
                    label="Contact Number"
                    maxLength={18}
                    onBlur={() => blurField('contactNumber')}
                    onChangeText={(value) => updateField('contactNumber', value)}
                    placeholder="Enter your contact number"
                    textContentType="telephoneNumber"
                    value={form.contactNumber}
                  />
                  <FormField
                    autoCapitalize="none"
                    autoComplete="email"
                    error={errors.emailAddress}
                    icon="mail-outline"
                    inputMode="email"
                    keyboardType="email-address"
                    label="Email Address"
                    onBlur={() => blurField('emailAddress')}
                    onChangeText={(value) => updateField('emailAddress', value)}
                    placeholder="Enter your email address"
                    textContentType="emailAddress"
                    value={form.emailAddress}
                  />

                  {submitError ? (
                    <View style={styles.submitError}>
                      <Ionicons name="alert-circle-outline" size={18} color="#FF5A5F" />
                      <Text accessibilityLiveRegion="polite" style={styles.submitErrorText}>
                        {submitError}
                      </Text>
                    </View>
                  ) : null}

                  <PrimaryButton icon="save-outline" onPress={handleSave} title="Save Changes" />
                </View>
              ) : null}
            </Fragment>
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
  scrollContent: {
    paddingBottom: 32,
  },
  contentWrapper: {
    padding: contentWrapperPadding,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
    minWidth: 0,
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
    minHeight: 56,
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
  formCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  formTitle: {
    fontSize: m,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  formDescription: {
    fontSize: s,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  submitError: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 90, 95, 0.12)',
    padding: 12,
    marginBottom: 16,
  },
  submitErrorText: {
    flex: 1,
    color: '#FF5A5F',
    fontSize: xs,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
});
