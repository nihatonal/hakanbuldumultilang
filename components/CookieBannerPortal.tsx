// components/CookieBannerPortal.tsx
'use client'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'

export default function CookieBannerPortal() {
    const [visible, setVisible] = useState(false)
    const [mounted, setMounted] = useState(false)
    // const t = useTranlation()

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')
        if (!consent) setVisible(true)
        setMounted(true)
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookie_consent', 'true')
        setVisible(false)
    }

    if (!mounted || !visible) return null

    return ReactDOM.createPortal(
        <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white text-sm p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-left">
                    Bu web sitesi çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz.
                </p>
                <div className="flex items-center gap-4 justify-center md:justify-end">
                    <Link href="/cerez-politikasi" className="underline text-blue-300 hover:text-blue-200">
                        Çerez Politikası
                    </Link>
                    <button
                        onClick={acceptCookies}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Kabul Et
                    </button>
                </div>
            </div>
        </div>,
        document.body // İşte burası: portal direkt body içine render eder
    )
}
