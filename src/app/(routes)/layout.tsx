import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'
import AuthProvider from '../context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '애프터',
  description: 'COMMUNITY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className='flex'> {/* flex h-screen? */}
            <Topbar />
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-screen-sm'>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </AuthProvider>
      </body>
    </html>
  )
}
