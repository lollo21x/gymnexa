import React, { useState } from 'react'
import { BottomNav, TabType } from '../components/BottomNav'
import { HomePage } from '../pages/HomePage'
import { BookingsPage } from '../pages/BookingsPage'
import { WodPage } from '../pages/WodPage'
import { ProfilePage } from '../pages/ProfilePage'

export const MainLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('home')

    const renderPage = () => {
        switch (activeTab) {
            case 'home':
                return <HomePage />
            case 'bookings':
                return <BookingsPage />
            case 'wod':
                return <WodPage />
            case 'profile':
                return <ProfilePage />
            default:
                return <HomePage />
        }
    }

    return (
        <div className="main-layout">
            <div className="page-content">
                {renderPage()}
            </div>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

            <style>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          height: 100%;
          background-color: var(--gray-50);
        }

        .page-content {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
        </div>
    )
}
