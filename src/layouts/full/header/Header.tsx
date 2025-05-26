// src/layouts/full/header/Header.tsx
import React, { useState, useEffect } from 'react'
import { Navbar, Drawer } from 'flowbite-react'
import { Icon } from '@iconify/react'
import Search from 'src/components/shared/Search'
import Notification from './notification'
import Profile from './Profile'
import MobileSidebar from '../sidebar/MobileSidebar'
import { useTheme } from 'src/contexts/DarkModeContext'

const Header: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false)
    const { theme, setTheme }     = useTheme()
    const [open, setOpen]         = useState(false)

    useEffect(() => {
        const onScroll = () => setIsSticky(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <header
                className={`
          sticky top-0 z-50 transition-colors
          ${isSticky ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}
        `}
            >
                <Navbar fluid className="px-6 py-3">
                    <div className="flex items-center w-full">
                        {/* botão mobile */}
                        <button
                            onClick={() => setOpen(true)}
                            className="p-2 mr-4 text-gray-700 dark:text-gray-300 md:hidden rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <Icon icon="mdi:menu" width={24} />
                        </button>

                        {/* busca */}
                        <div className="flex-1"><Search /></div>

                        {/* notificações, tema, perfil */}
                        <div className="flex items-center space-x-4">
                                                        <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:opacity-90 transition"
                                aria-label="Toggle dark mode"
                            >
                                {theme === 'dark'
                                    ? <Icon icon="mdi:white-balance-sunny" width={20} />
                                    : <Icon icon="mdi:weather-night"    width={20} />
                                }
                            </button>

                            <Profile />
                        </div>
                    </div>
                </Navbar>
            </header>

            <Drawer open={open} onClose={() => setOpen(false)} className="w-64">
                <Drawer.Items>
                    <MobileSidebar />
                </Drawer.Items>
            </Drawer>
        </>
    )
}

export default Header
