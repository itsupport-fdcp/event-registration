import { m, xl } from '@/constants/font_constants';
import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createHeaderStyles = (colors: ColorScheme) => {   

    const styles = StyleSheet.create({  

            container: {
                height: 80,
                flexDirection: 'row',
            },
            header: {
                color: colors.primary,
                fontSize: xl,
                fontFamily: 'Poppins-SemiBold',
            },
            subHeader: {    
                fontFamily: 'Poppins-Regular',
                color: colors.secondary,
                fontSize: m
            },
            titleContainer: {
                flex: 1,
                justifyContent: 'center',
            }

    });

    return styles;


}