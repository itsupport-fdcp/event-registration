import { l, m, s } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface EmptyStateProps {
  compact?: boolean;
  header: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  showHomeLink?: boolean;
}

export default function EmptyState({
    compact = false,
    header,
    description,
    icon,
    showHomeLink = true,
} : EmptyStateProps) {
    const { colors } = useTheme();
    const router = useRouter();

    return (
          
          <View style={[styles.emptyState, compact && styles.compactState]}>

            <Text style={[styles.emptyText, compact && styles.compactText, { color: colors.primary }]}>
              {header}
            </Text>
            <Ionicons name={icon} size={compact ? 64 : 162} color={colors.primary} />
            <Text style={[styles.emptySubtext, compact && styles.compactSubtext, { color: colors.primary }]}>
              {description}
            </Text>
            {showHomeLink && (
              <TouchableOpacity onPress={() => router.push('/')} hitSlop={8} accessibilityRole="link">
                <Text style={[styles.emptySubtext, { color: colors.text }]}>Go to Home page?</Text>
              </TouchableOpacity>
            )}
          </View>
         
    );
}

const styles = StyleSheet.create({
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    compactState: {
        minWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
      emptyText: {
        fontSize: l,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 16,
      },
      emptySubtext: {
        fontSize: m,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 8,
        textAlign: 'center',
      },
      compactText: {
        fontSize: m,
        marginTop: 8,
      },
      compactSubtext: {
        fontSize: s,
        fontFamily: 'Poppins-Regular',
      },
});
