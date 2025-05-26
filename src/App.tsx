// src/App.tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Flowbite, ThemeModeScript } from 'flowbite-react'
import customTheme from './utils/theme/custom-theme'
import router from './routes/Router'
import { DarkModeProvider } from 'src/contexts/DarkModeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <DarkModeProvider>
            <ThemeModeScript />
            <Flowbite theme={{ theme: customTheme }}>
                <ToastContainer position="top-right" />
                <RouterProvider router={router} />
            </Flowbite>
        </DarkModeProvider>
    )
}

export default App
