'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface BidFormProps {
  onBidSubmit: (amount: number) => void
  currentBid: number | null
}

export default function BidForm({ onBidSubmit, currentBid }: BidFormProps) {
  const [bidAmount, setBidAmount] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(bidAmount)
    if (amount > 0) {
      onBidSubmit(amount)
      setSubmitted(true)
      setBidAmount('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="bg-white border-2 border-purple-200/60 rounded-2xl p-8 sticky top-24 shadow-xl shadow-purple-500/10 backdrop-blur-sm">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-6">
        Place Your Bid
      </h3>

      {submitted && (
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg text-sm font-bold text-purple-700">
          ✓ Bid submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bid" className="block text-sm font-bold text-purple-900 mb-2">
            Maximum Bid (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-lg font-bold text-purple-600">$</span>
            <input
              id="bid"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 font-medium transition-all"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 font-medium">
            Enter your maximum bid. Higher bids have better chances of winning.
          </p>
        </div>

        <button
          type="submit"
          disabled={!bidAmount}
          className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 duration-300"
        >
          Place Bid
          <ArrowRight size={16} />
        </button>
      </form>

      {currentBid && (
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200/60 rounded-lg">
          <p className="text-xs font-bold text-purple-600">Your Current Bid</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            ${currentBid.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
