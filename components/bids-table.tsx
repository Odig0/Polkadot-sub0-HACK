'use client'

import { Bid } from '@/lib/types'
import { Trophy } from 'lucide-react'

interface BidsTableProps {
  bids: Bid[]
  unitsAvailable: number
}

export default function BidsTable({ bids, unitsAvailable }: BidsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Bidder</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Bid Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
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
                  <td className="px-6 py-4 text-foreground font-medium">{bid.bidder}</td>
                  <td className="px-6 py-4 text-lg font-bold text-foreground">
                    ${bid.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {isWinner && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {isClearingPrice ? 'Clearing Price' : 'Winner'}
                      </span>
                    )}
                    {isOutOfRange && (
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-semibold">
                        Out of Range
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
