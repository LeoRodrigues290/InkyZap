// src/contexts/DarkModeContext.tsx
import React, { createContext, useContext } from 'react'
import { useDarkMode } from 'src/hooks/useDarkMode'

type Theme = 'light' | 'dark'

interface DarkModeContextValue {
    theme: Theme
    setTheme: (t: Theme) => void
}

const DarkModeContext = createContext<DarkModeContextValue>({
    theme: 'light',
    setTheme: () => {},
})

export const DarkModeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [theme, setTheme] = useDarkMode()
    return (
        <DarkModeContext.Provider value={{ theme, setTheme }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useTheme = () => useContext(DarkModeContext)
