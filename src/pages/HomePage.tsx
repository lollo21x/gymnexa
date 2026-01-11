import React from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const HomePage: React.FC = () => {
    const { userProfile } = useAuth()
    const firstName = userProfile?.firstName || 'Utente'

    return (
        <div className="home-page safe-area-top">
            <header className="home-header">
                <div className="greeting">
                    <h1>Ciao, {firstName}</h1>
                </div>
                <button className="notification-btn">
                    <Bell size={24} />
                    <span className="notification-badge">3</span>
                </button>
            </header>

            <div className="home-content">
                <section className="home-section">
                    <div className="section-header">
                        <h2 className="section-title">Allenamenti settimanali</h2>
                        <button className="see-all-btn">
                            Vedi tutti <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="workout-cards">
                        <div className="workout-card">
                            <div className="workout-day">Lunedì</div>
                            <div className="workout-type">Sala Pesi</div>
                            <div className="workout-time">17:30 - 18:30</div>
                        </div>
                        <div className="workout-card">
                            <div className="workout-day">Mercoledì</div>
                            <div className="workout-type">Open</div>
                            <div className="workout-time">18:30 - 19:30</div>
                        </div>
                        <div className="workout-card empty">
                            <div className="empty-text">Nessun allenamento</div>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <div className="section-header">
                        <h2 className="section-title">Prenotazioni</h2>
                        <button className="see-all-btn">
                            Vedi tutte <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="booking-list">
                        <div className="booking-item">
                            <div className="booking-info">
                                <div className="booking-date">Oggi, 17:30</div>
                                <div className="booking-type">Sala Pesi</div>
                            </div>
                            <div className="booking-status confirmed">Confermata</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-info">
                                <div className="booking-date">Domani, 18:30</div>
                                <div className="booking-type">Open</div>
                            </div>
                            <div className="booking-status pending">In attesa</div>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
        .home-page {
          padding: 16px;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-top: 8px;
        }

        .greeting h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .notification-btn {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-700);
        }

        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 18px;
          height: 18px;
          background-color: var(--primary);
          border-radius: 50%;
          font-size: 11px;
          font-weight: 600;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .home-section {
          background-color: white;
          border-radius: 16px;
          padding: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--gray-900);
        }

        .see-all-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: var(--primary);
        }

        .workout-cards {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .workout-card {
          flex-shrink: 0;
          width: 140px;
          padding: 16px;
          background-color: var(--primary);
          border-radius: 12px;
          color: white;
        }

        .workout-card.empty {
          background-color: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-text {
          font-size: 13px;
          color: var(--gray-400);
          text-align: center;
        }

        .workout-day {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .workout-type {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .workout-time {
          font-size: 13px;
          opacity: 0.8;
        }

        .booking-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .booking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: var(--gray-50);
          border-radius: 12px;
        }

        .booking-date {
          font-size: 15px;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 4px;
        }

        .booking-type {
          font-size: 13px;
          color: var(--gray-500);
        }

        .booking-status {
          font-size: 13px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .booking-status.confirmed {
          background-color: #D1FAE5;
          color: #059669;
        }

        .booking-status.pending {
          background-color: #FEF3C7;
          color: #D97706;
        }
      `}</style>
        </div>
    )
}
