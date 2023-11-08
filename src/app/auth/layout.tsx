import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Topbar from '@/components/layout/Topbar'
import LeftSidebar from '@/components/layout/LeftSidebar'
import Bottombar from '@/components/layout/Bottombar'
import RightSidebar from '@/components/layout/RightSidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-dark-1'>
        {children}
      </body>
    </html>
  )
}
