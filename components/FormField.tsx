import { m, s, xs } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FormFieldProps
  extends Pick<
    TextInputProps,
    'autoCapitalize' | 'autoComplete' | 'inputMode' | 'maxLength' | 'textContentType'
  > {
  error?: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onBlur: () => void;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
}

export default function FormField({
  error,
  icon,
  keyboardType,
  label,
  onBlur,
  onChangeText,
  placeholder,
  value,
  ...inputProps
}: FormFieldProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.input_bg, borderColor: error ? '#FF5A5F' : colors.primary },
        ]}
      >
        <Ionicons name={icon} size={20} color={error ? '#FF5A5F' : colors.tertiary} />
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          keyboardType={keyboardType}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#686868"
          style={[styles.input, { color: colors.tertiary }]}
          value={value}
        />
        {error ? <Ionicons name="alert-circle" size={20} color="#FF5A5F" /> : null}
      </View>
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="information-circle-outline" size={14} color="#FF5A5F" />
          <Text accessibilityLiveRegion="polite" style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: s,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 4,
  },
  errorText: {
    flex: 1,
    color: '#FF5A5F',
    fontSize: xs,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
});
