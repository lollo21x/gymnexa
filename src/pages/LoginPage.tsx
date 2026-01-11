import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { signInWithEmail, signInWithGoogle } from '../services/auth'

interface LoginPageProps {
    onSwitchToSignup: () => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await signInWithEmail(email, password)
        } catch (err: any) {
            setError(getErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError(null)
        setLoading(true)
        try {
            await signInWithGoogle()
        } catch (err: any) {
            setError(getErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Email non valida'
            case 'auth/user-not-found':
                return 'Utente non trovato'
            case 'auth/wrong-password':
                return 'Password errata'
            case 'auth/invalid-credential':
                return 'Credenziali non valide'
            default:
                return 'Errore durante il login'
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container fade-in">
                <div className="auth-logo">
                    <div className="logo-circle">
                        <span className="logo-text">G</span>
                    </div>
                </div>

                <h1 className="auth-title">Bentornato</h1>
                <p className="auth-subtitle">Accedi al tuo account</p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                className="input-field with-icon"
                                placeholder="La tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input-field with-icon"
                                placeholder="La tua password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Accesso...' : 'Accedi'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>oppure</span>
                </div>

                <button
                    className="btn btn-secondary btn-full google-btn"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                    Accedi con Google
                </button>

                <p className="auth-switch">
                    Non hai un account?{' '}
                    <button onClick={onSwitchToSignup} className="auth-link">
                        Registrati
                    </button>
                </p>
            </div>

            <style>{`
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
          margin-bottom: 24px;
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
