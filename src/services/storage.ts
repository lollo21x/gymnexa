import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export const uploadProfilePhoto = async (uid: string, file: File): Promise<string> => {
    if (!storage) return ''
    const storageRef = ref(storage, `profile-photos/${uid}/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl
}

export const uploadAthleticDocument = async (uid: string, file: File): Promise<string> => {
    if (!storage) return ''
    const storageRef = ref(storage, `athletic-documents/${uid}/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl
}
