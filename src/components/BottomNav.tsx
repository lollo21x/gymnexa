import React from 'react'
import { Home, Calendar, Dumbbell, User } from 'lucide-react'

export type TabType = 'home' | 'bookings' | 'wod' | 'profile'

interface BottomNavProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'home', label: 'Home', icon: <Home size={24} /> },
        { id: 'bookings', label: 'Prenotazioni', icon: <Calendar size={24} /> },
        { id: 'wod', label: 'WOD', icon: <Dumbbell size={24} /> },
        { id: 'profile', label: 'Profilo', icon: <User size={24} /> }
    ]

    return (
        <nav className="bottom-nav safe-area-bottom">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <div className="nav-icon">{tab.icon}</div>
                    <span className="nav-label">{tab.label}</span>
                </button>
            ))}

            <style>{`
        .bottom-nav {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: white;
          border-top: 1px solid var(--gray-200);
          padding: 8px 0;
          padding-bottom: max(8px, env(safe-area-inset-bottom));
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          border-radius: 12px;
          transition: all 0.2s ease;
          color: var(--gray-400);
        }

        .nav-item.active {
          color: var(--primary);
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-label {
          font-size: 11px;
          font-weight: 500;
        }
      `}</style>
        </nav>
    )
}
