'use client'

import { Bid } from '@/lib/types'
import { Trophy, Lock } from 'lucide-react'

interface BidsTableProps {
  bids: Bid[]
  unitsAvailable: number
}

// Función para ocultar parcialmente dirección de wallet
function maskWalletAddress(address: string): string {
  if (!address || address.length < 10) return '0x****'
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export default function BidsTable({ bids, unitsAvailable }: BidsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Dirección de Wallet</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground text-center flex items-center gap-2 justify-center"><Lock size={14} /> Monto</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bids.map((bid, index) => {
              const isWinner = index < unitsAvailable
              const isClearingPrice = index === unitsAvailable - 1
              const isOutOfRange = index >= unitsAvailable

              return (
                <tr
                  key={bid.id}
                  className={`
                    ${isWinner ? 'bg-primary/5' : 'hover:bg-secondary/50'}
                    ${isClearingPrice ? 'border-t-2 border-primary' : ''}
                    transition-colors
                  `}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{bid.rank}</span>
                      {isWinner && <Trophy size={16} className="text-primary" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-secondary px-3 py-1 rounded font-mono text-foreground">
                      {maskWalletAddress(bid.bidder)}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 bg-muted rounded text-sm text-muted-foreground font-semibold">
                      Privado
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {isWinner && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {isClearingPrice ? 'Menor Precio Elegido' : 'Ganador'}
                      </span>
                    )}
                    {isOutOfRange && (
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-semibold">
                        Fuera del Rango
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
