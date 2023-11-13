import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Topbar from '@/components/layout/Topbar'
import LeftSidebar from '@/components/layout/LeftSidebar'
import Bottombar from '@/components/layout/Bottombar'
import RightSidebar from '@/components/layout/RightSidebar'
import AuthProvider from '../context/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '애프터',
  description: 'COMMUNITY',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <main className='flex'>
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
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
