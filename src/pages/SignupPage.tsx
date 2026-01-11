import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar, FileText, Upload, ChevronDown } from 'lucide-react'
import { signUpWithEmail, signInWithGoogle } from '../services/auth'
import { createUserProfile } from '../services/database'
import { uploadAthleticDocument } from '../services/storage'
import { UserProfile } from '../types/types'

interface SignupPageProps {
    onSwitchToLogin: () => void
    onGoogleSignupNeedsBirthDate: (uid: string, email: string) => void
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin, onGoogleSignupNeedsBirthDate }) => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        gender: '',
        birthPlace: '',
        fiscalCode: '',
        phone: '',
        street: '',
        number: '',
        country: 'Italia',
        city: '',
        postalCode: '',
        password: '',
        confirmPassword: ''
    })
    const [athleticDocument, setAthleticDocument] = useState<File | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAthleticDocument(e.target.files[0])
        }
    }

    const validateStep1 = () => {
        if (!formData.firstName || !formData.lastName || !formData.email) {
            setError('Compila tutti i campi obbligatori')
            return false
        }
        if (!formData.email.includes('@')) {
            setError('Email non valida')
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (!formData.birthDate || !formData.gender || !formData.birthPlace || !formData.fiscalCode || !formData.phone) {
            setError('Compila tutti i campi obbligatori')
            return false
        }
        return true
    }

    const validateStep3 = () => {
        if (!formData.street || !formData.number || !formData.city || !formData.postalCode) {
            setError('Compila tutti i campi obbligatori')
            return false
        }
        return true
    }

    const validateStep4 = () => {
        if (!athleticDocument) {
            setError('Carica il documento atletico')
            return false
        }
        if (!formData.password || formData.password.length < 6) {
            setError('La password deve essere di almeno 6 caratteri')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Le password non coincidono')
            return false
        }
        return true
    }

    const nextStep = () => {
        setError(null)
        let valid = false
        if (step === 1) valid = validateStep1()
        else if (step === 2) valid = validateStep2()
        else if (step === 3) valid = validateStep3()

        if (valid) setStep(step + 1)
    }

    const prevStep = () => {
        setError(null)
        setStep(step - 1)
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!validateStep4()) return

        setLoading(true)
        try {
            const userCredential = await signUpWithEmail(formData.email, formData.password)
            const uid = userCredential.uid

            let documentUrl = ''
            if (athleticDocument) {
                documentUrl = await uploadAthleticDocument(uid, athleticDocument)
            }

            const profile: UserProfile = {
                uid,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
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
        } catch (err: any) {
            setError(getErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        setError(null)
        setLoading(true)
        try {
            const user = await signInWithGoogle()
            onGoogleSignupNeedsBirthDate(user.uid, user.email || '')
        } catch (err: any) {
            setError(getErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case 'auth/email-already-in-use':
                return 'Email già registrata'
            case 'auth/invalid-email':
                return 'Email non valida'
            case 'auth/weak-password':
                return 'Password troppo debole'
            default:
                return 'Errore durante la registrazione'
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container signup-container fade-in">
                <div className="auth-logo">
                    <div className="logo-circle">
                        <span className="logo-text">G</span>
                    </div>
                </div>

                <h1 className="auth-title">Crea Account</h1>
                <p className="auth-subtitle">Passo {step} di 4</p>

                <div className="step-indicator">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className={`step-dot ${s <= step ? 'active' : ''}`} />
                    ))}
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="auth-form">
                    {step === 1 && (
                        <div className="form-step slide-up">
                            <div className="input-group">
                                <label className="input-label">Nome *</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="input-field with-icon"
                                        placeholder="Il tuo nome"
                                        value={formData.firstName}
                                        onChange={(e) => updateField('firstName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Cognome *</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="input-field with-icon"
                                        placeholder="Il tuo cognome"
                                        value={formData.lastName}
                                        onChange={(e) => updateField('lastName', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email *</label>
                                <div className="input-wrapper">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        className="input-field with-icon"
                                        placeholder="La tua email"
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step slide-up">
                            <div className="input-group">
                                <label className="input-label">Data di nascita *</label>
                                <div className="input-wrapper">
                                    <Calendar size={20} className="input-icon" />
                                    <input
                                        type="date"
                                        className="input-field with-icon"
                                        value={formData.birthDate}
                                        onChange={(e) => updateField('birthDate', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Sesso *</label>
                                <div className="input-wrapper">
                                    <select
                                        className="input-field select-field"
                                        value={formData.gender}
                                        onChange={(e) => updateField('gender', e.target.value)}
                                    >
                                        <option value="">Seleziona</option>
                                        <option value="male">Maschio</option>
                                        <option value="female">Femmina</option>
                                        <option value="other">Altro</option>
                                    </select>
                                    <ChevronDown size={20} className="select-icon" />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Luogo di nascita *</label>
                                <div className="input-wrapper">
                                    <MapPin size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="input-field with-icon"
                                        placeholder="Città"
                                        value={formData.birthPlace}
                                        onChange={(e) => updateField('birthPlace', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Codice Fiscale *</label>
                                <div className="input-wrapper">
                                    <FileText size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="input-field with-icon"
                                        placeholder="RSSMRA85M01H501Z"
                                        value={formData.fiscalCode}
                                        onChange={(e) => updateField('fiscalCode', e.target.value.toUpperCase())}
                                        maxLength={16}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Cellulare *</label>
                                <div className="input-wrapper">
                                    <Phone size={20} className="input-icon" />
                                    <input
                                        type="tel"
                                        className="input-field with-icon"
                                        placeholder="+39 333 1234567"
                                        value={formData.phone}
                                        onChange={(e) => updateField('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step slide-up">
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
                                <label className="input-label">Nazione</label>
                                <div className="input-wrapper">
                                    <select
                                        className="input-field select-field"
                                        value={formData.country}
                                        onChange={(e) => updateField('country', e.target.value)}
                                    >
                                        <option value="Italia">Italia</option>
                                    </select>
                                    <ChevronDown size={20} className="select-icon" />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Comune *</label>
                                <div className="input-wrapper">
                                    <MapPin size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        className="input-field with-icon"
                                        placeholder="Roma"
                                        value={formData.city}
                                        onChange={(e) => updateField('city', e.target.value)}
                                    />
                                </div>
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

                    {step === 4 && (
                        <div className="form-step slide-up">
                            <div className="input-group">
                                <label className="input-label">Documento Atletico/Sportivo *</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        id="athleticDoc"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleDocumentChange}
                                        className="file-input"
                                    />
                                    <label htmlFor="athleticDoc" className="file-label">
                                        <Upload size={24} />
                                        <span>{athleticDocument ? athleticDocument.name : 'Carica documento'}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Password *</label>
                                <div className="input-wrapper">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input-field with-icon"
                                        placeholder="Minimo 6 caratteri"
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Conferma Password *</label>
                                <div className="input-wrapper">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input-field with-icon"
                                        placeholder="Ripeti la password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                                    />
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
                        {step < 4 ? (
                            <button type="button" className="btn btn-primary flex-grow" onClick={nextStep}>
                                Avanti
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary flex-grow" disabled={loading}>
                                {loading ? 'Registrazione...' : 'Registrati'}
                            </button>
                        )}
                    </div>
                </form>

                {step === 1 && (
                    <>
                        <div className="auth-divider">
                            <span>oppure</span>
                        </div>

                        <button
                            className="btn btn-secondary btn-full google-btn"
                            onClick={handleGoogleSignup}
                            disabled={loading}
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                            Registrati con Google
                        </button>
                    </>
                )}

                <p className="auth-switch">
                    Hai già un account?{' '}
                    <button onClick={onSwitchToLogin} className="auth-link">
                        Accedi
                    </button>
                </p>
            </div>

            <style>{`
        .signup-container {
          max-height: 90vh;
          overflow-y: auto;
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

        .form-step {
          min-height: 280px;
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .flex-grow {
          flex: 1;
        }

        .select-field {
          appearance: none;
          padding-right: 40px;
        }

        .select-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
          pointer-events: none;
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
          padding: 24px;
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

        .auth-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
          background: linear-gradient(135deg, var(--secondary) 0%, #2A2F52 100%);
        }

        .auth-container {
          max-width: 400px;
          width: 100%;
          background-color: white;
          border-radius: 24px;
          padding: 32px;
        }

        .auth-logo {
          text-align: center;
          margin-bottom: 24px;
        }

        .logo-circle {
          width: 72px;
          height: 72px;
          background-color: var(--primary);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .logo-text {
          font-size: 36px;
          font-weight: 700;
          color: white;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
          text-align: center;
          margin-bottom: 8px;
        }

        .auth-subtitle {
          font-size: 15px;
          color: var(--gray-500);
          text-align: center;
          margin-bottom: 16px;
        }

        .auth-error {
          background-color: #FEE2E2;
          color: #DC2626;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 16px;
          text-align: center;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .input-field.with-icon {
          padding-left: 44px;
          padding-right: 44px;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
          padding: 4px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: var(--gray-200);
        }

        .auth-divider span {
          padding: 0 16px;
          font-size: 14px;
          color: var(--gray-500);
        }

        .google-btn {
          margin-bottom: 24px;
        }

        .google-btn img {
          flex-shrink: 0;
        }

        .auth-switch {
          text-align: center;
          font-size: 14px;
          color: var(--gray-600);
        }

        .auth-link {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
        </div>
    )
}
