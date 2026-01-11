import React, { useState } from 'react'
import { usePWA } from './hooks/usePWA'
import { InstallPrompt } from './components/InstallPrompt'
import { MainLayout } from './layouts/MainLayout'

type AuthScreen = 'login' | 'signup'

const LoginPage: React.FC<{ onSwitchToSignup: () => void; onSkip: () => void }> = ({ onSwitchToSignup, onSkip }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); onSkip(); }}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="La tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Accedi
          </button>
        </form>

        <div className="auth-divider">
          <span>oppure</span>
        </div>

        <button className="btn btn-secondary btn-full google-btn" onClick={onSkip}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
          Accedi con Google
        </button>

        <button className="skip-btn" onClick={onSkip}>
          Continua senza login (Demo)
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
        .auth-form {
          margin-bottom: 24px;
        }
        .input-wrapper {
          position: relative;
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
          margin-bottom: 16px;
        }
        .google-btn img {
          flex-shrink: 0;
        }
        .skip-btn {
          width: 100%;
          padding: 12px;
          color: var(--primary);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
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

const SignupPage: React.FC<{ onSwitchToLogin: () => void; onSkip: () => void }> = ({ onSwitchToLogin, onSkip }) => {
  return (
    <div className="auth-page">
      <div className="auth-container fade-in">
        <div className="auth-logo">
          <div className="logo-circle">
            <span className="logo-text">G</span>
          </div>
        </div>

        <h1 className="auth-title">Crea Account</h1>
        <p className="auth-subtitle">Registrati per iniziare</p>

        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">Nome</label>
            <input type="text" className="input-field" placeholder="Il tuo nome" />
          </div>
          <div className="input-group">
            <label className="input-label">Cognome</label>
            <input type="text" className="input-field" placeholder="Il tuo cognome" />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className="input-field" placeholder="La tua email" />
          </div>

          <button className="btn btn-primary btn-full" onClick={onSkip}>
            Registrati
          </button>
        </div>

        <div className="auth-divider">
          <span>oppure</span>
        </div>

        <button className="btn btn-secondary btn-full google-btn" onClick={onSkip}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
          Registrati con Google
        </button>

        <button className="skip-btn" onClick={onSkip}>
          Continua senza login (Demo)
        </button>

        <p className="auth-switch">
          Hai già un account?{' '}
          <button onClick={onSwitchToLogin} className="auth-link">
            Accedi
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
          max-height: 90vh;
          overflow-y: auto;
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
        .auth-form {
          margin-bottom: 24px;
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
          margin-bottom: 16px;
        }
        .google-btn img {
          flex-shrink: 0;
        }
        .skip-btn {
          width: 100%;
          padding: 12px;
          color: var(--primary);
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
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

const App: React.FC = () => {
  const { isPWA, isMobile, isIOS } = usePWA()
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isMobile && !isPWA) {
    return <InstallPrompt isIOS={isIOS} />
  }

  if (!isLoggedIn) {
    if (authScreen === 'login') {
      return (
        <LoginPage
          onSwitchToSignup={() => setAuthScreen('signup')}
          onSkip={() => setIsLoggedIn(true)}
        />
      )
    } else {
      return (
        <SignupPage
          onSwitchToLogin={() => setAuthScreen('login')}
          onSkip={() => setIsLoggedIn(true)}
        />
      )
    }
  }

  return <MainLayout />
}

export default App
