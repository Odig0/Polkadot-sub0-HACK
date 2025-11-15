'use client'

import { useWallet } from '@/lib/wallet-context'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function WalletConnect() {
  const { isConnected, account, accounts, isLoading, error, connect, disconnect, switchAccount } =
    useWallet()
  const [showDropdown, setShowDropdown] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
        <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
        <span className="text-sm text-purple-700">Conectando...</span>
      </div>
    )
  }

  if (error) {
    return (
      <button
        onClick={connect}
        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold"
      >
        <Wallet size={18} />
        <span>{error}</span>
      </button>
    )
  }

  if (!isConnected || !account) {
    return (
      <button
        onClick={connect}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
      >
        <Wallet size={18} />
        <span>Conectar Wallet</span>
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
      >
        <Wallet size={18} />
        <span>{account.name}</span>
        <span className="text-xs opacity-75">{formatAddress(account.address)}</span>
        {accounts.length > 1 && <ChevronDown size={16} />}
      </button>

      {/* Dropdown de cuentas */}
      {showDropdown && accounts.length > 1 && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-purple-200 z-50">
          <div className="p-3 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-3">Cambiar cuenta:</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {accounts.map((acc) => (
                <button
                  key={acc.address}
                  onClick={() => {
                    switchAccount(acc.address)
                    setShowDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    acc.address === account.address
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <p className="font-semibold">{acc.name}</p>
                  <p className="text-xs text-gray-600">{formatAddress(acc.address)}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              disconnect()
              setShowDropdown(false)
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold border-t border-gray-200"
          >
            <LogOut size={16} />
            <span>Desconectar</span>
          </button>
        </div>
      )}

      {/* Botón de desconectar si solo hay una cuenta */}
      {accounts.length === 1 && showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-purple-200 z-50">
          <button
            onClick={() => {
              disconnect()
              setShowDropdown(false)
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
          >
            <LogOut size={16} />
            <span>Desconectar</span>
          </button>
        </div>
      )}
    </div>
  )
}
