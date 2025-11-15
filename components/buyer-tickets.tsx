'use client'

import { useEffect, useState } from 'react'
import { TicketEntry } from '@/lib/types'
import { getBuyerTicketsAction } from '@/lib/arkiv-actions'
import { Calendar, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react'

interface BuyerTicketsProps {
  walletAddress: string
}

export default function BuyerTickets({ walletAddress }: BuyerTicketsProps) {
  const [tickets, setTickets] = useState<TicketEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const result = await getBuyerTicketsAction(walletAddress)

        if (!result.success) {
          setError(result.error || 'Failed to fetch tickets')
          return
        }

        setTickets(result.data || [])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (walletAddress) {
      fetchTickets()
    }
  }, [walletAddress])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'used':
        return <CheckCircle className="text-blue-600" size={20} />
      case 'revoked':
        return <XCircle className="text-red-600" size={20} />
      default:
        return <Clock className="text-yellow-600" size={20} />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      used: 'Utilizada',
      revoked: 'Revocada',
    }
    return labels[status] || status
  }

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

  if (tickets.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No tienes entradas compradas</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white rounded-lg border-2 border-purple-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-900 line-clamp-2">
              {ticket.eventTitle}
            </h3>
            {getStatusIcon(ticket.status)}
          </div>

          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tipo:</span>
              <span className="capitalize bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {ticket.ticketType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-purple-600" />
              <span>{new Date(ticket.purchaseDate).toLocaleDateString('es-ES')}</span>
            </div>
            <div>
              <span className="font-semibold">Cantidad:</span> {ticket.quantity}
            </div>
            <div>
              <span className="font-semibold">Precio Total:</span> ${ticket.totalPrice}
            </div>
            <div>
              <span className="font-semibold">Estado:</span>{' '}
              <span className="text-purple-600">{getStatusLabel(ticket.status)}</span>
            </div>
          </div>

          {ticket.transactionHash && (
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-xs font-mono text-gray-600 break-all">
                Tx: {ticket.transactionHash}
              </p>
            </div>
          )}

          <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Ver Detalles
          </button>
        </div>
      ))}
    </div>
  )
}
