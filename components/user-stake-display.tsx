'use client'

import { useEffect, useState } from 'react'
import { UserStake } from '@/lib/types'
import { reverseAuctionService } from '@/lib/reverse-auction-service'

interface UserStakeDisplayProps {
  auctionId: string
  userWallet: string | undefined
}

export default function UserStakeDisplay({ auctionId, userWallet }: UserStakeDisplayProps) {
  const [stake, setStake] = useState<UserStake | null>(null)

  useEffect(() => {
    if (!userWallet) return

    const userStake = reverseAuctionService.getUserStakeInAuction(auctionId, userWallet)
    setStake(userStake)

    // Actualizar cada 5 segundos
    const interval = setInterval(() => {
      const updatedStake = reverseAuctionService.getUserStakeInAuction(auctionId, userWallet)
      setStake(updatedStake)
    }, 5000)

    return () => clearInterval(interval)
  }, [auctionId, userWallet])

  if (!stake) {
    return null
  }

  const stakedDate = new Date(stake.stakingTime).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  // Enmascarar la dirección del wallet
  const maskedWallet = userWallet 
    ? `${userWallet.substring(0, 6)}...${userWallet.substring(userWallet.length - 4)}`
    : 'Anónimo'

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Tu Información Privada (Anónima)
        </h3>
        {stake.isWinner && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
            ¡GANADOR!
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Dirección de Wallet:
          </span>
          <code className="text-xs bg-gray-800 text-gray-100 px-2 py-1 rounded font-mono">
            {maskedWallet}
          </code>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Fecha:
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stakedDate}
          </span>
        </div>

        {stake.isWinner && stake.winningPrice !== undefined && (
          <div className="flex justify-between items-center pt-2 border-t border-purple-200 dark:border-purple-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Precio Final:
            </span>
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              ${stake.winningPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 p-2 bg-white/50 dark:bg-black/20 rounded text-xs text-gray-600 dark:text-gray-400">
        <p>
          🔐 <strong>Anonimidad Garantizada:</strong>
          <br />
          • Tu dirección de wallet aparece parcialmente enmascarada (0x1234...5678)
          <br />
          • El monto que staqueaste <strong>NUNCA</strong> se mostrará públicamente
          <br />
          • Otros usuarios solo verán que hiciste una puja, no cuánto
          <br />
          • Información completamente privada
        </p>
      </div>
    </div>
  )
}
