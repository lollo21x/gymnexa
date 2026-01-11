import { useState, useEffect } from 'react'

interface PWAStatus {
    isPWA: boolean
    isIOS: boolean
    isAndroid: boolean
    isMobile: boolean
}

export const usePWA = (): PWAStatus => {
    const [status, setStatus] = useState<PWAStatus>({
        isPWA: false,
        isIOS: false,
        isAndroid: false,
        isMobile: false
    })

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
        const isAndroid = /android/i.test(userAgent)
        const isMobile = isIOS || isAndroid
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        const isIOSStandalone = (navigator as any).standalone === true
        const isPWA = isStandalone || isIOSStandalone

        setStatus({
            isPWA,
            isIOS,
            isAndroid,
            isMobile
        })
    }, [])

    return status
}
