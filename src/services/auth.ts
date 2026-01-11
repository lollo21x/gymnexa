import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    User
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
    if (!auth) throw new Error('Firebase not configured')
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
}

export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
    if (!auth) throw new Error('Firebase not configured')
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result.user
}

export const signInWithGoogle = async (): Promise<User> => {
    if (!auth || !googleProvider) throw new Error('Firebase not configured')
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
}

export const signOut = async (): Promise<void> => {
    if (!auth) return
    await firebaseSignOut(auth)
}
