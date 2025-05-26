// src/hooks/useDarkMode.ts
import { useEffect, useState } from 'react'

export function useDarkMode(): ['light' | 'dark', (t: 'light' | 'dark') => void] {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light'|'dark') || 'light'
    })

    useEffect(() => {
        const root = window.document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    return [theme, setTheme]
}
