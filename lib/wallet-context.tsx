'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface WalletAccount {
  address: string
  name: string
  type: string
}

interface WalletContextType {
  isConnected: boolean
  account: WalletAccount | null
  accounts: WalletAccount[]
  isLoading: boolean
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  switchAccount: (address: string) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<WalletAccount | null>(null)
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Auto-connect cuando el componente está montado
  useEffect(() => {
    setIsMounted(true)
    autoConnect()
  }, [])

  const autoConnect = async () => {
    if (typeof window === 'undefined') return

    try {
      const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp')

      const extensions = await web3Enable('ArtBid-Polkadot')
      if (extensions.length === 0) {
        console.log('No Polkadot extension found')
        return
      }

      const allAccounts = await web3Accounts()
      if (allAccounts.length > 0) {
        const formattedAccounts: WalletAccount[] = allAccounts.map((acc) => ({
          address: acc.address,
          name: acc.meta.name || 'Unknown',
          type: acc.type || 'unknown',
        }))

        setAccounts(formattedAccounts)
        setAccount(formattedAccounts[0])
        setIsConnected(true)
        console.log('Auto-connected to Polkadot wallet')
      }
    } catch (err) {
      console.error('Auto-connect failed:', err)
    }
  }

  const connect = async () => {
    if (typeof window === 'undefined') {
      setError('No hay acceso a la ventana del navegador')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp')

      const extensions = await web3Enable('ArtBid-Polkadot')

      if (extensions.length === 0) {
        throw new Error('Polkadot extension no encontrada. Por favor instala Polkadot.js')
      }

      const allAccounts = await web3Accounts()

      if (allAccounts.length === 0) {
        throw new Error('No hay cuentas disponibles en la extensión de Polkadot')
      }

      const formattedAccounts: WalletAccount[] = allAccounts.map((acc) => ({
        address: acc.address,
        name: acc.meta.name || 'Unknown',
        type: acc.type || 'unknown',
      }))

      setAccounts(formattedAccounts)
      setAccount(formattedAccounts[0])
      setIsConnected(true)
      console.log('Conectado a wallet:', formattedAccounts[0])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('Connection error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAccount(null)
    setAccounts([])
    setError(null)
    console.log('Desconectado de wallet')
  }

  const switchAccount = (address: string) => {
    const selected = accounts.find((acc) => acc.address === address)
    if (selected) {
      setAccount(selected)
      console.log('Cuenta cambiada a:', selected)
    }
  }

  if (!isMounted) {
    return <>{children}</>
  }

  const value: WalletContextType = {
    isConnected,
    account,
    accounts,
    isLoading,
    error,
    connect,
    disconnect,
    switchAccount,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
