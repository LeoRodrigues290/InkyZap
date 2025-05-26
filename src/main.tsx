import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './css/globals.css'
import App from './App.tsx'
import Spinner from './views/spinner/Spinner.tsx'

// auto-register do Service Worker gerado pelo VitePWA
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onRegistered(r) {
        // opcional: console.log('SW registrado', r)
    },
    onNeedRefresh() {
        // aqui você pode disparar um toast ou banner avisando que há nova versão
    },
    onOfflineReady() {
        console.log('Aplicação pronta para uso offline')
    }
})

createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<Spinner />}>
        <App />
    </Suspense>
)
