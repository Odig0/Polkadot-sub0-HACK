'use client'

import { WalletProvider } from '@/lib/wallet-context'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </WalletProvider>
  )
}
