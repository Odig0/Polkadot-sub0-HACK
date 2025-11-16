'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  account: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    // Check if wallet is already connected from localStorage
    const savedAccount = localStorage.getItem('polkadot_account')
    if (savedAccount) {
      setAccount(savedAccount)
      setIsConnected(true)
    }
  }, [])

  const connect = async () => {
    try {
      // In a real implementation, this would connect to Polkadot wallet
      const mockAccount = `0x${Math.random().toString(16).slice(2, 42)}`
      localStorage.setItem('polkadot_account', mockAccount)
      setAccount(mockAccount)
      setIsConnected(true)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnect = () => {
    localStorage.removeItem('polkadot_account')
    setAccount(null)
    setIsConnected(false)
  }

  return (
    <WalletContext.Provider value={{ isConnected, account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
