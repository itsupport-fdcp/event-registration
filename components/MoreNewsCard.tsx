import { s } from "@/constants/fonts";
import useTheme from "@/hooks/useTheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { News } from './NewsCard';




export default function MoreNewsCard({ 
    id = '1',
    date = "Date",
    author = "Author",
    headline = "Headline",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageSource,
    category = 'All',
}: News) {

    const router = useRouter();
    const handlePress = () => {
        router.push(`/news/${id}` as any);
    }
    const { colors } = useTheme();

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
                      <View style={styles.titleDateRow}>
                        <Text style={[styles.type, { color: colors.text }]} numberOfLines={1}>
                          {category}
                        </Text>
                        <Text style={[styles.textMedium, { color: colors.text }]} numberOfLines={1}>
                          {date}
                        </Text>
                      </View>
                    <Text style={[styles.textMedium, { color: colors.text }]} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
            
    )


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
        backgroundColor: '#CCCCCC',
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
    type: {
        fontSize: s,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 2,
    },
    textMedium: {
        fontSize: s,
        fontFamily: 'Poppins-Regular',
        marginBottom: 2,
    },
    titleDateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});