export interface UserProfile {
    uid: string
    email: string
    firstName: string
    lastName: string
    birthDate: string
    gender: 'male' | 'female' | 'other'
    birthPlace: string
    fiscalCode: string
    phone: string
    address: {
        street: string
        number: string
        country: string
        city: string
        postalCode: string
    }
    athleticDocumentUrl?: string
    photoUrl?: string
    createdAt: string
    updatedAt: string
}

export interface Booking {
    id: string
    odayuteil: string
    date: string
    timeSlot: string
    type: 'sala_pesi' | 'open'
    createdAt: string
}

export interface TimeSlot {
    id: string
    label: string
    startTime: string
    endTime: string
}

export const TIME_SLOTS: TimeSlot[] = [
    { id: '1', label: '9:30 - 10:30', startTime: '09:30', endTime: '10:30' },
    { id: '2', label: '10:30 - 11:30', startTime: '10:30', endTime: '11:30' },
    { id: '3', label: '11:30 - 12:30', startTime: '11:30', endTime: '12:30' },
    { id: '4', label: '12:30 - 13:30', startTime: '12:30', endTime: '13:30' },
    { id: '5', label: '13:30 - 14:30', startTime: '13:30', endTime: '14:30' },
    { id: '6', label: '14:30 - 15:30', startTime: '14:30', endTime: '15:30' },
    { id: '7', label: '15:30 - 16:30', startTime: '15:30', endTime: '16:30' },
    { id: '8', label: '16:30 - 17:30', startTime: '16:30', endTime: '17:30' },
    { id: '9', label: '17:30 - 18:30', startTime: '17:30', endTime: '18:30' },
    { id: '10', label: '18:30 - 19:30', startTime: '18:30', endTime: '19:30' },
    { id: '11', label: '19:30 - 20:30', startTime: '19:30', endTime: '20:30' }
]

export interface Notification {
    id: string
    title: string
    message: string
    read: boolean
    createdAt: string
}
