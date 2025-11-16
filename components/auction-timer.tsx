'use client'

import { useState, useEffect } from 'react'
import { ReverseAuction } from '@/lib/types'
import { reverseAuctionService } from '@/lib/reverse-auction-service'

interface AuctionTimerProps {
  auction: ReverseAuction
  onAuctionEnd?: () => void
}

export default function AuctionTimer({ auction, onAuctionEnd }: AuctionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('10:00:00')
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const remaining = reverseAuctionService.getTimeRemaining(auction)
      const formatted = reverseAuctionService.formatTimeRemaining(remaining)
      setTimeRemaining(formatted)

      if (remaining <= 0) {
        setIsEnded(true)
        onAuctionEnd?.()
      }
    }

    // Actualizar inmediatamente
    updateTimer()

    // Actualizar cada segundo
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [auction, onAuctionEnd])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isEnded ? 'Subasta Finalizada' : 'Tiempo Restante'}
      </div>
      <div className={`text-3xl font-bold font-mono ${
        isEnded 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-blue-600 dark:text-blue-400'
      }`}>
        {timeRemaining}
      </div>
    </div>
  )
}
