import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { createUserProfile } from '../services/database'
import { uploadAthleticDocument } from '../services/storage'
import { UserProfile } from '../types/types'

interface GoogleBirthDateModalProps {
    uid: string
    email: string
    displayName: string | null
    onComplete: () => void
}

export const GoogleBirthDateModal: React.FC<GoogleBirthDateModalProps> = ({
    uid,
    email,
    displayName,
    onComplete
}) => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        birthDate: '',
        gender: '',
        birthPlace: '',
        fiscalCode: '',
        phone: '',
        street: '',
        number: '',
        country: 'Italia',
        city: '',
        postalCode: ''
    })
    const [athleticDocument, setAthleticDocument] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const names = displayName?.split(' ') || ['', '']
    const firstName = names[0] || ''
    const lastName = names.slice(1).join(' ') || ''

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAthleticDocument(e.target.files[0])
        }
    }

    const validateStep1 = () => {
        if (!formData.birthDate || !formData.gender || !formData.birthPlace || !formData.fiscalCode || !formData.phone) {
            setError('Compila tutti i campi obbligatori')
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (!formData.street || !formData.number || !formData.city || !formData.postalCode) {
            setError('Compila tutti i campi obbligatori')
            return false
        }
        return true
    }

    const validateStep3 = () => {
        if (!athleticDocument) {
            setError('Carica il documento atletico')
            return false
        }
        return true
    }

    const nextStep = () => {
        setError(null)
        let valid = false
        if (step === 1) valid = validateStep1()
        else if (step === 2) valid = validateStep2()

        if (valid) setStep(step + 1)
    }

    const prevStep = () => {
        setError(null)
        setStep(step - 1)
    }

    const handleComplete = async () => {
        setError(null)
        if (!validateStep3()) return

        setLoading(true)
        try {
            let documentUrl = ''
            if (athleticDocument) {
                documentUrl = await uploadAthleticDocument(uid, athleticDocument)
            }

            const profile: UserProfile = {
                uid,
                email,
                firstName,
                lastName,
                birthDate: formData.birthDate,
                gender: formData.gender as 'male' | 'female' | 'other',
                birthPlace: formData.birthPlace,
                fiscalCode: formData.fiscalCode.toUpperCase(),
                phone: formData.phone,
                address: {
                    street: formData.street,
                    number: formData.number,
                    country: formData.country,
                    city: formData.city,
                    postalCode: formData.postalCode
                },
                athleticDocumentUrl: documentUrl,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            await createUserProfile(profile)
            onComplete()
        } catch (err: any) {
            setError('Errore durante il salvataggio')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <div className="modal-header">
                    <h2>Completa il profilo</h2>
                    <p>Passo {step} di 3</p>
                </div>

                <div className="step-indicator">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`step-dot ${s <= step ? 'active' : ''}`} />
                    ))}
                </div>

                {error && (
                    <div className="form-error">{error}</div>
                )}

                {step === 1 && (
                    <div className="form-step">
                        <div className="input-group">
                            <label className="input-label">Data di nascita *</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.birthDate}
                                onChange={(e) => updateField('birthDate', e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Sesso *</label>
                            <select
                                className="input-field"
                                value={formData.gender}
                                onChange={(e) => updateField('gender', e.target.value)}
                            >
                                <option value="">Seleziona</option>
                                <option value="male">Maschio</option>
                                <option value="female">Femmina</option>
                                <option value="other">Altro</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Luogo di nascita *</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Città"
                                value={formData.birthPlace}
                                onChange={(e) => updateField('birthPlace', e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Codice Fiscale *</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="RSSMRA85M01H501Z"
                                value={formData.fiscalCode}
                                onChange={(e) => updateField('fiscalCode', e.target.value.toUpperCase())}
                                maxLength={16}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Cellulare *</label>
                            <input
                                type="tel"
                                className="input-field"
                                placeholder="+39 333 1234567"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <div className="input-row">
                            <div className="input-group flex-grow">
                                <label className="input-label">Via *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Via Roma"
                                    value={formData.street}
                                    onChange={(e) => updateField('street', e.target.value)}
                                />
                            </div>
                            <div className="input-group" style={{ width: '100px' }}>
                                <label className="input-label">Civico *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="10"
                                    value={formData.number}
                                    onChange={(e) => updateField('number', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Comune *</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Roma"
                                value={formData.city}
                                onChange={(e) => updateField('city', e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">CAP *</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="00100"
                                value={formData.postalCode}
                                onChange={(e) => updateField('postalCode', e.target.value)}
                                maxLength={5}
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step">
                        <div className="input-group">
                            <label className="input-label">Documento Atletico/Sportivo *</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    id="athleticDocGoogle"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleDocumentChange}
                                    className="file-input"
                                />
                                <label htmlFor="athleticDocGoogle" className="file-label">
                                    <Upload size={24} />
                                    <span>{athleticDocument ? athleticDocument.name : 'Carica documento'}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {step > 1 && (
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                            Indietro
                        </button>
                    )}
                    {step < 3 ? (
                        <button type="button" className="btn btn-primary flex-grow" onClick={nextStep}>
                            Avanti
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary flex-grow"
                            onClick={handleComplete}
                            disabled={loading}
                        >
                            {loading ? 'Salvataggio...' : 'Completa'}
                        </button>
                    )}
                </div>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 24px;
          padding: 32px;
          max-width: 400px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 8px;
        }

        .modal-header p {
          font-size: 15px;
          color: var(--gray-500);
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        .step-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--gray-200);
          transition: background-color 0.2s ease;
        }

        .step-dot.active {
          background-color: var(--primary);
        }

        .form-error {
          background-color: #FEE2E2;
          color: #DC2626;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 16px;
          text-align: center;
        }

        .form-step {
          min-height: 200px;
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .flex-grow {
          flex: 1;
        }

        .file-upload {
          margin-bottom: 0;
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 32px;
          border: 2px dashed var(--gray-300);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--gray-500);
          text-align: center;
        }

        .file-label:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
      `}</style>
        </div>
    )
}
