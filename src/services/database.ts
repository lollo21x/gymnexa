import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'
import { UserProfile, Booking } from '../types/types'

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data() as UserProfile
    }
    return null
}

export const createUserProfile = async (profile: UserProfile): Promise<void> => {
    const docRef = doc(db, 'users', profile.uid)
    await setDoc(docRef, profile)
}

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() })
}

export const getUserBookings = async (uid: string, date?: string): Promise<Booking[]> => {
    const bookingsRef = collection(db, 'bookings')
    let q
    if (date) {
        q = query(bookingsRef, where('userId', '==', uid), where('date', '==', date))
    } else {
        q = query(bookingsRef, where('userId', '==', uid))
    }
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking))
}

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<string> => {
    const bookingsRef = collection(db, 'bookings')
    const docRef = await addDoc(bookingsRef, booking)
    return docRef.id
}

export const deleteBooking = async (bookingId: string): Promise<void> => {
    const docRef = doc(db, 'bookings', bookingId)
    await deleteDoc(docRef)
}
