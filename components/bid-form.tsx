'use client'

import { useState } from 'react'
import { useWallet } from '@/lib/wallet-context'
import { createBidEntryAction } from '@/lib/arkiv-actions'
import { TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

interface BidFormProps {
  auctionId: string
  currentHighestBid?: number
  minimumBidIncrement?: number
  onBidSubmit?: (amount: number) => void
  currentBid?: number | null
}

type BidStatus = 'idle' | 'loading' | 'success' | 'error'

export default function BidForm({
  auctionId,
  currentHighestBid = 0,
  minimumBidIncrement = 100,
  onBidSubmit,
  currentBid,
}: BidFormProps) {
  const { isConnected, account } = useWallet()
  const [bidAmount, setBidAmount] = useState<string>('')
  const [status, setStatus] = useState<BidStatus>('idle')
  const [message, setMessage] = useState<string>('')
  const [successData, setSuccessData] = useState<any>(null)

  const minBid = currentHighestBid + minimumBidIncrement
  const isValidBid = bidAmount && Number(bidAmount) >= minBid

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected || !account) {
      setStatus('error')
      setMessage('Por favor conecta tu wallet de Polkadot primero')
      return
    }

    if (!isValidBid) {
      setStatus('error')
      setMessage(`La puja debe ser al menos ${minBid}`)
      return
    }

    try {
      setStatus('loading')
      setMessage('Registrando puja en Arkiv...')

      const bidValue = Number(bidAmount)

      // Registrar en Arkiv
      const result = await createBidEntryAction({
        auctionId,
        bidderWallet: account.address,
        bidAmount: bidValue,
        bidTimestamp: new Date().toISOString(),
        isWinner: false,
      })

      if (result.success) {
        setStatus('success')
        setMessage(`¡Puja registrada! ID: ${result.data?.id?.substring(0, 8)}...`)
        setSuccessData(result.data)

        // Llamar callback si existe
        if (onBidSubmit) {
          onBidSubmit(bidValue)
        }

        // Resetear
        setTimeout(() => {
          setBidAmount('')
          setStatus('idle')
          setMessage('')
          setSuccessData(null)
        }, 3000)
      } else {
        setStatus('error')
        setMessage(result.error || 'Error al registrar la puja')
      }
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  return (
    <div className="bg-white border-2 border-purple-200/60 rounded-2xl p-8 sticky top-24 shadow-xl shadow-purple-500/10 backdrop-blur-sm">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <TrendingUp size={24} className="text-purple-600" />
        Hacer una Puja
      </h3>

      {/* Mostrar si no está conectado */}
      {!isConnected || !account ? (
        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-yellow-800">Conecta tu wallet de Polkadot</p>
            <p className="text-sm text-yellow-700">Necesitarás conectar para hacer una puja</p>
          </div>
        </div>
      ) : (
        <>
          {/* Info de la wallet */}
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 font-semibold">Conectado como:</p>
            <p className="font-mono text-sm font-bold text-green-900 break-all">{account.address}</p>
          </div>

          {/* Información de la puja */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700 font-semibold text-sm">Puja Actual:</span>
              <span className="text-xl font-bold text-purple-600">
                ${currentHighestBid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700 font-semibold text-sm">Incremento Mín:</span>
              <span className="text-lg font-bold text-blue-600">${minimumBidIncrement}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-semibold text-sm">Tu Mín. Puja:</span>
              <span className="text-lg font-bold text-green-600">${minBid.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}

      {status && message && (
        <div
          className={`mb-4 p-4 border-2 rounded-lg flex items-center gap-3 ${
            status === 'success'
              ? 'bg-green-50 border-green-200'
              : status === 'error'
                ? 'bg-red-50 border-red-200'
                : 'bg-blue-50 border-blue-200'
          }`}
        >
          {status === 'loading' && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          )}
          {status === 'success' && <CheckCircle className="text-green-600 flex-shrink-0" size={20} />}
          {status === 'error' && <AlertCircle className="text-red-600 flex-shrink-0" size={20} />}
          <p
            className={`text-sm font-semibold ${
              status === 'success'
                ? 'text-green-800'
                : status === 'error'
                  ? 'text-red-800'
                  : 'text-blue-800'
            }`}
          >
            {message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmitBid} className="space-y-4">
        <div>
          <label htmlFor="bid" className="block text-sm font-bold text-purple-900 mb-2">
            Monto de Puja (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-lg font-bold text-purple-600">$</span>
            <input
              id="bid"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={String(minBid)}
              min={minBid}
              step={minimumBidIncrement}
              disabled={!isConnected || !account || status === 'loading'}
              className="w-full pl-8 pr-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          {bidAmount && !isValidBid && (
            <p className="text-xs text-red-600 mt-2 font-semibold">
              Mínimo: ${minBid.toLocaleString()}
            </p>
          )}
          <p className="text-xs text-gray-600 mt-2">Se guardará en Arkiv con tu dirección de wallet</p>
        </div>

        <button
          type="submit"
          disabled={!isValidBid || status === 'loading' || !isConnected || !account}
          className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 duration-300"
        >
          {status === 'loading' ? 'Registrando...' : 'Pujar'}
          <ArrowRight size={16} />
        </button>
      </form>

      {currentBid && (
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200/60 rounded-lg">
          <p className="text-xs font-bold text-purple-600">Tu Puja Actual</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            ${currentBid.toLocaleString()}
          </p>
        </div>
      )}

      {successData && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-semibold text-green-700">✓ Registrada en Arkiv</p>
          <p className="text-xs font-mono text-green-800 break-all mt-1">{successData.id}</p>
        </div>
      )}
    </div>
  )
}
