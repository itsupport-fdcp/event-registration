import { l, m } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({
  placeholder = "Search events...",
  onSearch,
  value: controlledValue,
  onChangeText
}: SearchBarProps) {
  const { colors } = useTheme();
  const [internalValue, setInternalValue] = useState('');

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChangeText = (text: string) => {
    if (controlledValue === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
    onSearch?.(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.input_bg }]}>
      <Ionicons
        name="search"
        size={l}
        color={colors.tertiary}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.tertiary }]}
        placeholder={placeholder}
        placeholderTextColor={colors.tertiary}
        value={value}
        onChangeText={handleChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 45,
    shadowColor: '#000',
    marginTop: 14,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: m,
    fontFamily: 'Poppins-Regular',
  },
});
