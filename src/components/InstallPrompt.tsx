import React from 'react'
import { Share, Plus, MoreVertical } from 'lucide-react'

interface InstallPromptProps {
    isIOS: boolean
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ isIOS }) => {
    return (
        <div className="install-prompt">
            <div className="install-content fade-in">
                <div className="install-logo">
                    <div className="logo-circle">
                        <span className="logo-text">G</span>
                    </div>
                </div>

                <h1 className="install-title">GymNexa</h1>
                <p className="install-subtitle">Installa l'app per continuare</p>

                <div className="install-steps">
                    {isIOS ? (
                        <>
                            <div className="install-step">
                                <div className="step-icon">
                                    <Share size={24} />
                                </div>
                                <div className="step-text">
                                    <strong>Passo 1</strong>
                                    <p>Tocca l'icona di condivisione nella barra in basso</p>
                                </div>
                            </div>
                            <div className="install-step">
                                <div className="step-icon">
                                    <Plus size={24} />
                                </div>
                                <div className="step-text">
                                    <strong>Passo 2</strong>
                                    <p>Scorri e tocca "Aggiungi a Home"</p>
                                </div>
                            </div>
                            <div className="install-step">
                                <div className="step-icon confirm-icon">✓</div>
                                <div className="step-text">
                                    <strong>Passo 3</strong>
                                    <p>Tocca "Aggiungi" in alto a destra</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="install-step">
                                <div className="step-icon">
                                    <MoreVertical size={24} />
                                </div>
                                <div className="step-text">
                                    <strong>Passo 1</strong>
                                    <p>Tocca il menu (⋮) in alto a destra</p>
                                </div>
                            </div>
                            <div className="install-step">
                                <div className="step-icon">
                                    <Plus size={24} />
                                </div>
                                <div className="step-text">
                                    <strong>Passo 2</strong>
                                    <p>Tocca "Installa app" o "Aggiungi a schermata Home"</p>
                                </div>
                            </div>
                            <div className="install-step">
                                <div className="step-icon confirm-icon">✓</div>
                                <div className="step-text">
                                    <strong>Passo 3</strong>
                                    <p>Conferma toccando "Installa"</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="install-note">
                    <p>Dopo l'installazione, apri l'app dalla schermata Home</p>
                </div>
            </div>

            <style>{`
        .install-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
          background: linear-gradient(135deg, var(--secondary) 0%, #2A2F52 100%);
        }

        .install-content {
          max-width: 380px;
          width: 100%;
          text-align: center;
        }

        .install-logo {
          margin-bottom: 24px;
        }

        .logo-circle {
          width: 100px;
          height: 100px;
          background-color: var(--primary);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .logo-text {
          font-size: 48px;
          font-weight: 700;
          color: white;
        }

        .install-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .install-subtitle {
          font-size: 16px;
          color: var(--gray-300);
          margin-bottom: 40px;
        }

        .install-steps {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .install-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .install-step:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .install-step:first-child {
          padding-top: 0;
        }

        .step-icon {
          width: 44px;
          height: 44px;
          background-color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .confirm-icon {
          font-size: 20px;
        }

        .step-text strong {
          display: block;
          font-size: 14px;
          color: white;
          margin-bottom: 4px;
        }

        .step-text p {
          font-size: 14px;
          color: var(--gray-300);
          margin: 0;
          line-height: 1.4;
        }

        .install-note {
          padding: 16px;
          background-color: rgba(96, 99, 252, 0.2);
          border-radius: 12px;
        }

        .install-note p {
          font-size: 14px;
          color: var(--gray-200);
          margin: 0;
        }
      `}</style>
        </div>
    )
}
