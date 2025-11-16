'use client'

import { useState, useEffect, Suspense } from 'react'
import { ReverseAuction } from '@/lib/types'
import { reverseAuctionService } from '@/lib/reverse-auction-service'
import { useWallet } from '@/lib/wallet-context'
import { arkivService } from '@/lib/arkiv-service'

interface ReverseAuctionFormProps {
  auction: ReverseAuction
  onStakingSuccess?: () => void
}

function ReverseAuctionFormContent({ auction, onStakingSuccess }: ReverseAuctionFormProps) {
  const { account } = useWallet()
  const [stakeAmount, setStakeAmount] = useState('')
  const [currentPrice, setCurrentPrice] = useState(auction.startPrice)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userStake, setUserStake] = useState<any>(null)

  // Actualizar precio actual cada segundo
  useEffect(() => {
    const updatePrice = () => {
      const price = reverseAuctionService.calculateCurrentPrice(auction)
      setCurrentPrice(price)
    }

    updatePrice()
    const interval = setInterval(updatePrice, 1000)

    return () => clearInterval(interval)
  }, [auction])

  // Obtener stake actual del usuario
  useEffect(() => {
    if (!account) return

    const stake = reverseAuctionService.getUserStakeInAuction(auction.id, account.address)
    setUserStake(stake)
  }, [account, auction.id])

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!account) {
      setError('Debes conectar tu wallet primero')
      return
    }

    const amount = parseFloat(stakeAmount)
    if (isNaN(amount) || amount <= 0) {
      setError('Ingresa una cantidad válida')
      return
    }

    if (amount < currentPrice) {
      setError(`Debes stakear al menos $${currentPrice.toFixed(2)} (precio actual)`)
      return
    }

    try {
      setLoading(true)

      // Registrar el stake
      const stake = reverseAuctionService.stakeInAuction(
        auction.id,
        account.address,
        amount
      )

      // Guardar en Arkiv (manteniendo la integración existente)
      try {
        await arkivService.createBidEntry({
          auctionId: auction.id,
          bidder: account.address,
          amount,
          timestamp: Date.now(),
          bidType: 'reverse_auction_stake',
        } as any)
      } catch (err) {
        console.log('Arkiv fallback:', err)
        // Continuar sin Arkiv, ya está en localStorage
      }

      setUserStake(stake)
      setStakeAmount('')
      setSuccess(`¡Puja registrada! Tu stake: $${amount.toFixed(2)}`)
      
      onStakingSuccess?.()

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la puja')
    } finally {
      setLoading(false)
    }
  }

  if (auction.status !== 'active') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-400 font-semibold">
          Esta subasta ha finalizado
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleStake} className="space-y-4">
      {/* Precio Actual */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Precio Actual (Dutch Auction)</p>
        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
          ${currentPrice.toFixed(2)}
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
          El precio disminuye desde ${auction.startPrice.toFixed(2)} hasta ${auction.endPrice.toFixed(2)} en 10 horas
        </p>
      </div>

      {/* Información de Tu Puja Anterior */}
      {userStake && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3">
          <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">
            Tu Puja Anterior
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Cantidad: <span className="font-bold">${userStake.stakedAmount.toFixed(2)}</span>
          </p>
        </div>
      )}

      {/* Input de Cantidad */}
      <div>
        <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cantidad a Stakear
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            id="stakeAmount"
            type="number"
            min={currentPrice}
            step="0.01"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder={currentPrice.toFixed(2)}
            disabled={loading}
            className="w-full pl-7 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Mínimo: ${currentPrice.toFixed(2)}
        </p>
      </div>

      {/* Botón Enviar */}
      <button
        type="submit"
        disabled={loading || !account}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Procesando...
          </span>
        ) : !account ? (
          'Conecta tu Wallet'
        ) : (
          'Stakear y Pujar'
        )}
      </button>

      {/* Mensajes */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm">
          ✓ Puja registrada exitosamente (anónima)
        </div>
      )}

      {/* Aviso de Anonimidad y Privacidad */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <span className="font-semibold block mb-1">🔐 Anonimidad Total Garantizada</span>
          • Se registra tu dirección de wallet (enmascarada: 0x1234...5678)
          <br />
          • El monto que staqueaste <strong>no aparece en público</strong>
          <br />
          • En la tabla se verá "Privado" en lugar del monto
          <br />
          • Otros usuarios no sabrán cuánto pujaste
          <br />
          • Solo se ve que eres participante anónimo
        </p>
      </div>
    </form>
  )
}

export default function ReverseAuctionForm(props: ReverseAuctionFormProps) {
  return (
    <Suspense fallback={
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    }>
      <ReverseAuctionFormContent {...props} />
    </Suspense>
  )
}
