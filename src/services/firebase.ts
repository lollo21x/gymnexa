import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBeyqNSkncoIDkCCzgqez-FWy3eV9yl3TA",
    authDomain: "gymnexa-669e9.firebaseapp.com",
    projectId: "gymnexa-669e9",
    storageBucket: "gymnexa-669e9.firebasestorage.app",
    messagingSenderId: "788832055620",
    appId: "1:788832055620:web:c026912f2c9e0f3bef2711",
    measurementId: "G-Y1NES0TQ48"
};

export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY"

let app: FirebaseApp | null = null
let auth: Auth | null = null
let googleProvider: GoogleAuthProvider | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

if (isFirebaseConfigured) {
    try {
        app = initializeApp(firebaseConfig)
        auth = getAuth(app)
        googleProvider = new GoogleAuthProvider()
        db = getFirestore(app)
        storage = getStorage(app)
    } catch (error) {
        console.error('Firebase initialization error:', error)
    }
}

export { auth, googleProvider, db, storage }

