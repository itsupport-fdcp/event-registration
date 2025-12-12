import { createContext, ReactNode, useContext } from "react";


export interface ColorScheme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    tertiary: string;
    tabMuted: string;
}



const darkColors: ColorScheme = {
    background: '#0E0E0E',
    text: '#FFFFFFFF',
    primary: '#FFC41D',
    secondary: '#FFE6A1',
    tertiary: '#2A2A2A',
    tabMuted: '#957723',
};


interface ThemeContextType {
    colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const colors = darkColors;


    return (
        <ThemeContext.Provider value={{ colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () => {    
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default useTheme;

