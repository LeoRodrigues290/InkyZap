import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
    appId: import.meta.env.VITE_FIREBASE_APP_ID!
}

const app = initializeApp(cfg)
export const auth = getAuth(app)
export const db = getFirestore(app)

// 📦 Habilita cache offline (IndexedDB) do Firestore
enableIndexedDbPersistence(db).catch(err =>
    console.warn("Cache offline não ativado:", err.code)
)
