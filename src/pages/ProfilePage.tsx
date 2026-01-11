import React, { useState, useRef } from 'react'
import { Camera, LogOut, ChevronRight, Upload } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { updateUserProfile } from '../services/database'
import { uploadProfilePhoto, uploadAthleticDocument } from '../services/storage'
import { signOut } from '../services/auth'

export const ProfilePage: React.FC = () => {
    const { userProfile, reloadProfile } = useAuth()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const docInputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        email: userProfile?.email || '',
        gender: userProfile?.gender || '',
        birthDate: userProfile?.birthDate || '',
        birthPlace: userProfile?.birthPlace || '',
        fiscalCode: userProfile?.fiscalCode || '',
        phone: userProfile?.phone || '',
        street: userProfile?.address?.street || '',
        number: userProfile?.address?.number || '',
        country: userProfile?.address?.country || 'Italia',
        city: userProfile?.address?.city || '',
        postalCode: userProfile?.address?.postalCode || ''
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !userProfile) return

        setLoading(true)
        try {
            const photoUrl = await uploadProfilePhoto(userProfile.uid, e.target.files[0])
            await updateUserProfile(userProfile.uid, { photoUrl })
            await reloadProfile()
        } catch (err) {
            console.error('Error uploading photo:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0] || !userProfile) return

        setLoading(true)
        try {
            const docUrl = await uploadAthleticDocument(userProfile.uid, e.target.files[0])
            await updateUserProfile(userProfile.uid, { athleticDocumentUrl: docUrl })
            await reloadProfile()
        } catch (err) {
            console.error('Error uploading document:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!userProfile) return

        setLoading(true)
        try {
            await updateUserProfile(userProfile.uid, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender as 'male' | 'female' | 'other',
                birthDate: formData.birthDate,
                birthPlace: formData.birthPlace,
                fiscalCode: formData.fiscalCode,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    number: formData.number,
                    country: formData.country,
                    city: formData.city,
                    postalCode: formData.postalCode
                }
            })
            await reloadProfile()
            setIsEditing(false)
        } catch (err) {
            console.error('Error saving profile:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await signOut()
    }

    const getGenderLabel = (gender: string): string => {
        switch (gender) {
            case 'male': return 'Maschio'
            case 'female': return 'Femmina'
            case 'other': return 'Altro'
            default: return '-'
        }
    }

    return (
        <div className="profile-page safe-area-top">
            <header className="profile-header">
                <h1>Profilo</h1>
                {!isEditing ? (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        Modifica
                    </button>
                ) : (
                    <button className="save-btn" onClick={handleSave} disabled={loading}>
                        {loading ? 'Salvo...' : 'Salva'}
                    </button>
                )}
            </header>

            <div className="profile-content">
                <div className="avatar-section">
                    <div className="avatar" onClick={() => fileInputRef.current?.click()}>
                        {userProfile?.photoUrl ? (
                            <img src={userProfile.photoUrl} alt="Profile" />
                        ) : (
                            <span className="avatar-initials">
                                {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                            </span>
                        )}
                        <div className="avatar-overlay">
                            <Camera size={24} />
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden-input"
                    />
                    <div className="user-name">
                        {userProfile?.firstName} {userProfile?.lastName}
                    </div>
                    <div className="user-email">{userProfile?.email}</div>
                </div>

                <div className="profile-section">
                    <h3 className="section-label">Informazioni Personali</h3>

                    {isEditing ? (
                        <>
                            <div className="edit-row">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.firstName}
                                    onChange={(e) => updateField('firstName', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Cognome</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.lastName}
                                    onChange={(e) => updateField('lastName', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Sesso</label>
                                <select
                                    className="edit-input"
                                    value={formData.gender}
                                    onChange={(e) => updateField('gender', e.target.value)}
                                >
                                    <option value="">Seleziona</option>
                                    <option value="male">Maschio</option>
                                    <option value="female">Femmina</option>
                                    <option value="other">Altro</option>
                                </select>
                            </div>
                            <div className="edit-row">
                                <label>Data di nascita</label>
                                <input
                                    type="date"
                                    className="edit-input"
                                    value={formData.birthDate}
                                    onChange={(e) => updateField('birthDate', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Luogo di nascita</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.birthPlace}
                                    onChange={(e) => updateField('birthPlace', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Codice Fiscale</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.fiscalCode}
                                    onChange={(e) => updateField('fiscalCode', e.target.value.toUpperCase())}
                                    maxLength={16}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Cellulare</label>
                                <input
                                    type="tel"
                                    className="edit-input"
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="info-row">
                                <span className="info-label">Nome</span>
                                <span className="info-value">{userProfile?.firstName || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Cognome</span>
                                <span className="info-value">{userProfile?.lastName || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Sesso</span>
                                <span className="info-value">{getGenderLabel(userProfile?.gender || '')}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email</span>
                                <span className="info-value">{userProfile?.email || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Data di nascita</span>
                                <span className="info-value">{userProfile?.birthDate || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Luogo di nascita</span>
                                <span className="info-value">{userProfile?.birthPlace || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Codice Fiscale</span>
                                <span className="info-value">{userProfile?.fiscalCode || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Cellulare</span>
                                <span className="info-value">{userProfile?.phone || '-'}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-section">
                    <h3 className="section-label">Indirizzo</h3>

                    {isEditing ? (
                        <>
                            <div className="edit-row">
                                <label>Via</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.street}
                                    onChange={(e) => updateField('street', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Civico</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.number}
                                    onChange={(e) => updateField('number', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>Comune</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.city}
                                    onChange={(e) => updateField('city', e.target.value)}
                                />
                            </div>
                            <div className="edit-row">
                                <label>CAP</label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={formData.postalCode}
                                    onChange={(e) => updateField('postalCode', e.target.value)}
                                    maxLength={5}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="info-row">
                                <span className="info-label">Via</span>
                                <span className="info-value">{userProfile?.address?.street || '-'}, {userProfile?.address?.number || ''}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Comune</span>
                                <span className="info-value">{userProfile?.address?.city || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">CAP</span>
                                <span className="info-value">{userProfile?.address?.postalCode || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Nazione</span>
                                <span className="info-value">{userProfile?.address?.country || '-'}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-section">
                    <h3 className="section-label">Documenti</h3>
                    <button
                        className="doc-upload-btn"
                        onClick={() => docInputRef.current?.click()}
                    >
                        <div className="doc-info">
                            <Upload size={20} />
                            <span>Documento Atletico</span>
                        </div>
                        <ChevronRight size={20} className="doc-chevron" />
                    </button>
                    <input
                        ref={docInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocUpload}
                        className="hidden-input"
                    />
                    {userProfile?.athleticDocumentUrl && (
                        <div className="doc-status">Documento caricato ✓</div>
                    )}
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Esci</span>
                </button>
            </div>

            <style>{`
        .profile-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
          padding-bottom: 100px;
          overflow-y: auto;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-top: 8px;
        }

        .profile-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .edit-btn, .save-btn {
          font-size: 16px;
          font-weight: 600;
          color: var(--primary);
        }

        .profile-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .avatar-section {
          text-align: center;
          padding: 24px;
          background-color: white;
          border-radius: 16px;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: var(--primary);
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-initials {
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .avatar-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          color: white;
        }

        .avatar:hover .avatar-overlay {
          opacity: 1;
        }

        .user-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 4px;
        }

        .user-email {
          font-size: 14px;
          color: var(--gray-500);
        }

        .profile-section {
          background-color: white;
          border-radius: 16px;
          padding: 16px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-500);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-100);
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 15px;
          color: var(--gray-500);
        }

        .info-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--gray-900);
        }

        .edit-row {
          margin-bottom: 12px;
        }

        .edit-row label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--gray-500);
          margin-bottom: 6px;
        }

        .edit-input {
          width: 100%;
          padding: 12px;
          background-color: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 10px;
          font-size: 15px;
          color: var(--gray-900);
        }

        .edit-input:focus {
          border-color: var(--primary);
        }

        .doc-upload-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: var(--gray-50);
          border-radius: 12px;
        }

        .doc-info {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--gray-700);
        }

        .doc-chevron {
          color: var(--gray-400);
        }

        .doc-status {
          font-size: 13px;
          color: var(--success);
          margin-top: 8px;
          text-align: center;
        }

        .hidden-input {
          display: none;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px;
          background-color: #FEE2E2;
          color: #DC2626;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          margin-top: 8px;
        }
      `}</style>
        </div>
    )
}
