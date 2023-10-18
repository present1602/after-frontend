import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'

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
