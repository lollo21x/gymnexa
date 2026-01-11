import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../services/firebase'
import { getUserProfile } from '../services/database'
import { UserProfile } from '../types/types'

interface AuthContextType {
    user: User | null
    userProfile: UserProfile | null
    loading: boolean
    isConfigured: boolean
    setUserProfile: (profile: UserProfile | null) => void
    reloadProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    isConfigured: false,
    setUserProfile: () => { },
    reloadProfile: async () => { }
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    const loadProfile = async (uid: string) => {
        try {
            const profile = await getUserProfile(uid)
            setUserProfile(profile)
        } catch (error) {
            console.error('Error loading profile:', error)
        }
    }

    const reloadProfile = async () => {
        if (user) {
            await loadProfile(user.uid)
        }
    }

    useEffect(() => {
        if (!isFirebaseConfigured || !auth) {
            setLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)
            if (firebaseUser) {
                await loadProfile(firebaseUser.uid)
            } else {
                setUserProfile(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            userProfile,
            loading,
            isConfigured: isFirebaseConfigured,
            setUserProfile,
            reloadProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}

