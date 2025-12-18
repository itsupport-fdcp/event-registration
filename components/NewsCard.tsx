import { l, m, s } from "@/constants/fonts";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";





export interface News {
    id?: string;
    date?: string;
    author?: string;
    headline?: string;
    description?: string;
    imageSource?: ImageSourcePropType;
    category?: 'All' | 'Safe Filming' | 'Film Philippines' | 'Philippine Film Archive';
}

export default function NewsCard({
    date = "Date",
    author = "Author",
    headline = "Headline",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSource,
    category,
} : News) {



    const { colors } = useTheme();

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>  
                <Image
                source={imageSource || require('@/assets/images/logo.png')}
                style={styles.image}
                contentFit="cover"
                />
            </View>
            <View style={[styles.labelContainer, { backgroundColor: colors.tertiary }]}>
                <View style={styles.titleRow}>
                {headline && (
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                        {headline}
                    </Text>
                )}
                </View>
                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={24} color={colors.text} style={styles.calendarIcon} />
                    <Text style={[styles.mediumText, { color: colors.text }]}>
                        {date}
                    </Text>
                </View>

                <View style={styles.titleRow}>
                    {author && (
                        <Text style={[styles.mediumText, { color: colors.text }]}>
                        {author}
                        </Text>
                    )}
                </View>
                {description && (
                    <Text style={[styles.smallText, { color: colors.text }]} numberOfLines={3} ellipsizeMode="tail">
                        {description}
                    </Text>
                )}
            </View>
        </View>
    )



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
        height: 190,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,

    },
    title: {
        fontSize: l,
        fontFamily: 'Poppins-Medium',
        flex: 1,
    },
    calendarIcon: {
        marginRight: 8,
    },
    mediumText: {
        fontSize: m,
        fontFamily: 'Poppins-Medium',
    },
    smallText: {
        fontSize: s,
        fontFamily: 'Poppins-Regular',
  },
  dateRow: {
    flexDirection: 'row',
    marginBottom: 4,
  }
})