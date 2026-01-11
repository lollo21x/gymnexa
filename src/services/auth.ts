import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    User
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
}

export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result.user
}

export const signInWithGoogle = async (): Promise<User> => {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
}

export const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth)
}
