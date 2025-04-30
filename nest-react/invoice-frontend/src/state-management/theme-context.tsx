'use client'

import { createContext, ReactNode, useContext, useState } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState<Theme>('light');

    const changeTheme = () => {
        setTheme(previousTheme => (previousTheme === 'light' ? 'dark' : 'light'));
    };

    return <ThemeContext.Provider value={{theme, changeTheme}}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error('useTheme error');
    }
    return context;
}