'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BidForm from '@/components/bid-form'
import BidsTable from '@/components/bids-table'
import { mockArtists, mockBids } from '@/lib/mock-data'
import { Clock, Users } from 'lucide-react'

export default function AuctionPage({ params }: { params: { id: string } }) {
  const artist = mockArtists.find(a => a.id === params.id) || mockArtists[0]
  const [bids, setBids] = useState(mockBids)
  const [userBid, setUserBid] = useState<number | null>(null)

  const unitsAvailable = 10
  const clearingPrice = bids[unitsAvailable - 1]?.amount || 0

  const handleBidSubmit = (amount: number) => {
    setUserBid(amount)
    // In a real app, this would submit to a blockchain
    const newBid = {
      id: bids.length + 1,
      rank: bids.length + 1,
      bidder: 'You',
      amount,
      isWinner: amount >= clearingPrice,
    }
    setBids([newBid, ...bids].sort((a, b) => b.amount - a.amount))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Artist Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="text-8xl opacity-40">{artist.avatar}</div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {artist.name}
                </h1>
                <p className="text-primary font-semibold text-lg mb-3">{artist.category}</p>
                <p className="text-muted-foreground text-lg mb-6">{artist.description}</p>

                {/* Auction Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Units Available</p>
                    <p className="text-2xl font-bold text-foreground">{unitsAvailable}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Total Bids</p>
                    <p className="text-2xl font-bold text-foreground">{bids.length}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Time Remaining</p>
                    <p className="text-2xl font-bold text-foreground">2d 14h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bidding Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Bid Form */}
            <div className="lg:col-span-1">
              <BidForm onBidSubmit={handleBidSubmit} currentBid={userBid} />
            </div>

            {/* Auction Info */}
            <div className="lg:col-span-2">
              {/* How It Works */}
              <div className="bg-card border border-border rounded-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Uniform-Price Auction Explained
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    ✓ There are <strong className="text-foreground">{unitsAvailable} units</strong> available in this auction.
                  </p>
                  <p>
                    ✓ All bids are ranked from highest to lowest. The top {unitsAvailable} bidders win.
                  </p>
                  <p>
                    ✓ <strong className="text-foreground">Everyone pays the same price</strong>: the amount bid by the {unitsAvailable}th highest bidder.
                  </p>
                  <p>
                    ✓ Current clearing price: <strong className="text-primary text-lg">${clearingPrice.toLocaleString()}</strong>
                  </p>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm text-foreground">
                <strong>Future:</strong> This auction will integrate with smart contracts on Moonbeam/Moonriver (Polkadot/Kusama). Bids will be stored on-chain with full transparency.
              </div>
            </div>
          </div>

          {/* Bids Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Top Bids</h2>
            <BidsTable bids={bids} unitsAvailable={unitsAvailable} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
