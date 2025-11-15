'use client'

import { useEffect, useState } from 'react'
import { AuctionBidEntry } from '@/lib/types'
import { getBidderBidsAction } from '@/lib/arkiv-actions'
import { TrendingUp, Award, Clock } from 'lucide-react'

interface BidderBidsProps {
  walletAddress: string
}

export default function BidderBids({ walletAddress }: BidderBidsProps) {
  const [bids, setBids] = useState<AuctionBidEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true)
        const result = await getBidderBidsAction(walletAddress)

        if (!result.success) {
          setError(result.error || 'Failed to fetch bids')
          return
        }

        setBids(result.data || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (walletAddress) {
      fetchBids()
    }
  }, [walletAddress])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  if (bids.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No tienes pujas realizadas</p>
      </div>
    )
  }

  const winnerBids = bids.filter((bid) => bid.isWinner)
  const activeBids = bids.filter((bid) => !bid.isWinner)

  return (
    <div className="space-y-8">
      {/* Pujas Ganadoras */}
      {winnerBids.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-purple-900">Pujas Ganadoras</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winnerBids.map((bid) => (
              <div
                key={bid.id}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-yellow-500" size={20} />
                  <span className="font-bold text-yellow-700">¡GANADOR!</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Monto de Puja</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${bid.bidAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{new Date(bid.bidTimestamp).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                {bid.entryHash && (
                  <div className="p-2 bg-white rounded text-xs">
                    <p className="font-mono text-gray-600 break-all">Hash: {bid.entryHash}</p>
                  </div>
                )}

                <button className="w-full mt-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Reclamar Premio
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pujas Activas */}
      {activeBids.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500" size={24} />
            <h2 className="text-2xl font-bold text-purple-900">Pujas Activas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBids.map((bid) => (
              <div
                key={bid.id}
                className="bg-white rounded-lg border-2 border-blue-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="text-blue-500" size={20} />
                  <span className="font-semibold text-blue-700">Puja Activa</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Monto de Puja</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${bid.bidAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{new Date(bid.bidTimestamp).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                {bid.entryHash && (
                  <div className="p-2 bg-gray-50 rounded text-xs">
                    <p className="font-mono text-gray-600 break-all">Hash: {bid.entryHash}</p>
                  </div>
                )}

                <button className="w-full mt-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
