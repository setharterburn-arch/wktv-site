import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'WKTV - Watch Anywhere | Stream 10,000+ Channels',
  description: '10,000+ channels, movies, sports, and live TV. Stream anywhere in the USA on any device.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-black`}>
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white text-center py-2 px-4 text-sm font-medium">
          🎁 <span className="font-bold">FREE 24-Hour Trial!</span> Try before you buy — no credit card required.
        </div>
        {children}
      </body>
    </html>
  )
}
