import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { TIME_SLOTS } from '../types/types'

type BookingType = 'sala_pesi' | 'open' | null

interface DayBookings {
    [slotId: string]: BookingType
}

export const BookingsPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [bookings, setBookings] = useState<DayBookings>({})

    const formatDate = (date: Date): string => {
        const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
        const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
        return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
    }

    const prevDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() - 1)
        setCurrentDate(newDate)
        setBookings({})
    }

    const nextDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + 1)
        setCurrentDate(newDate)
        setBookings({})
    }

    const isToday = (date: Date): boolean => {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    const handleSlotSelect = (slotId: string, type: BookingType) => {
        setBookings(prev => ({
            ...prev,
            [slotId]: prev[slotId] === type ? null : type
        }))
    }

    const hasBookings = Object.values(bookings).some(v => v !== null)

    const handleConfirm = () => {
        console.log('Prenotazioni:', bookings)
    }

    return (
        <div className="bookings-page safe-area-top">
            <header className="bookings-header">
                <h1>Prenotazioni</h1>
            </header>

            <div className="date-selector">
                <button className="date-nav" onClick={prevDay}>
                    <ChevronLeft size={24} />
                </button>
                <div className="date-display">
                    <span className={`date-text ${isToday(currentDate) ? 'today' : ''}`}>
                        {isToday(currentDate) ? 'Oggi' : formatDate(currentDate)}
                    </span>
                    {isToday(currentDate) && (
                        <span className="date-full">{formatDate(currentDate)}</span>
                    )}
                </div>
                <button className="date-nav" onClick={nextDay}>
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="slots-container">
                <div className="slots-header">
                    <div className="slot-time-header">Orario</div>
                    <div className="slot-type-header">Sala Pesi</div>
                    <div className="slot-type-header">Open</div>
                </div>

                <div className="slots-list">
                    {TIME_SLOTS.map(slot => (
                        <div key={slot.id} className="slot-row">
                            <div className="slot-time">{slot.label}</div>
                            <button
                                className={`slot-btn ${bookings[slot.id] === 'sala_pesi' ? 'selected' : ''}`}
                                onClick={() => handleSlotSelect(slot.id, 'sala_pesi')}
                            >
                                {bookings[slot.id] === 'sala_pesi' && <Check size={18} />}
                            </button>
                            <button
                                className={`slot-btn ${bookings[slot.id] === 'open' ? 'selected' : ''}`}
                                onClick={() => handleSlotSelect(slot.id, 'open')}
                            >
                                {bookings[slot.id] === 'open' && <Check size={18} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {hasBookings && (
                <div className="confirm-container">
                    <button className="btn btn-primary btn-full" onClick={handleConfirm}>
                        Conferma Prenotazioni
                    </button>
                </div>
            )}

            <style>{`
        .bookings-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
        }

        .bookings-header {
          margin-bottom: 24px;
          padding-top: 8px;
        }

        .bookings-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .date-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: white;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .date-nav {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-700);
        }

        .date-display {
          text-align: center;
        }

        .date-text {
          font-size: 18px;
          font-weight: 600;
          color: var(--gray-900);
        }

        .date-text.today {
          color: var(--primary);
        }

        .date-full {
          display: block;
          font-size: 14px;
          color: var(--gray-500);
          margin-top: 4px;
        }

        .slots-container {
          flex: 1;
          background-color: white;
          border-radius: 16px;
          padding: 16px;
          overflow-y: auto;
        }

        .slots-header {
          display: grid;
          grid-template-columns: 1fr 80px 80px;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 12px;
        }

        .slot-time-header {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-500);
        }

        .slot-type-header {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-500);
          text-align: center;
        }

        .slots-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .slot-row {
          display: grid;
          grid-template-columns: 1fr 80px 80px;
          gap: 12px;
          align-items: center;
          padding: 8px 0;
        }

        .slot-time {
          font-size: 15px;
          font-weight: 500;
          color: var(--gray-700);
        }

        .slot-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: all 0.2s ease;
          color: white;
        }

        .slot-btn.selected {
          background-color: var(--primary);
        }

        .confirm-container {
          padding: 16px 0;
          padding-bottom: max(16px, env(safe-area-inset-bottom));
        }
      `}</style>
        </div>
    )
}
