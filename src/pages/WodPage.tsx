import React from 'react'
import { Construction } from 'lucide-react'

export const WodPage: React.FC = () => {
    return (
        <div className="wod-page safe-area-top">
            <header className="wod-header">
                <h1>WOD</h1>
            </header>

            <div className="wod-content">
                <div className="wod-placeholder">
                    <div className="placeholder-icon">
                        <Construction size={64} />
                    </div>
                    <h2>Ci stiamo lavorando...</h2>
                    <p>Questa sezione sarà disponibile presto!</p>
                </div>
            </div>

            <style>{`
        .wod-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
        }

        .wod-header {
          margin-bottom: 24px;
          padding-top: 8px;
        }

        .wod-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .wod-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wod-placeholder {
          text-align: center;
          padding: 40px;
        }

        .placeholder-icon {
          width: 120px;
          height: 120px;
          background-color: var(--primary);
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: white;
        }

        .wod-placeholder h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 8px;
        }

        .wod-placeholder p {
          font-size: 16px;
          color: var(--gray-500);
        }
      `}</style>
        </div>
    )
}
