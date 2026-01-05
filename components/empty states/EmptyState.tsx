import { l, m } from '@/constants/fonts';
import useTheme from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface EmptySavesProps {
  header: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}

export default function EmptyState({
    header,
    description,
    icon,
} : EmptySavesProps) {
    const { colors } = useTheme();
    const router = useRouter();

    return (
          
          <View style={styles.emptyState}>

            <Text style={[styles.emptyText, { color: colors.primary }]}>
              {header}
            </Text>
            <Ionicons name={icon} size={162} color={colors.primary} />
            <Text style={[styles.emptySubtext, { color: colors.primary }]}>
              {description}
            </Text>
            <TouchableOpacity onPress={() => router.push('/')} hitSlop={8} accessibilityRole="link">
              <Text style={[styles.emptySubtext, { color: colors.text }]}>Go to Home page?</Text>
            </TouchableOpacity>
          </View>
         
    );
}

const styles = StyleSheet.create({
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
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
});