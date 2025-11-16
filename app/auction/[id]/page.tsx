'use client'

import { useState, Suspense, useEffect } from 'react'
import { use } from 'react'
import dynamic from 'next/dynamic'
import Footer from '@/components/footer'
import BidsTable from '@/components/bids-table'
import AuctionTimer from '@/components/auction-timer'
import ReverseAuctionForm from '@/components/reverse-auction-form'
import UserStakeDisplay from '@/components/user-stake-display'
import { mockArtists, mockBids } from '@/lib/mock-data'
import { ReverseAuction } from '@/lib/types'
import { reverseAuctionService } from '@/lib/reverse-auction-service'
import { Clock, Users } from 'lucide-react'

// Importar dinámicamente Header y BidForm para evitar SSR issues con useWallet
const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-100"></div>,
})

const BidForm = dynamic(() => import('@/components/bid-form'), {
  ssr: false,
  loading: () => (
    <div className="bg-white border-2 border-purple-200/60 rounded-2xl p-8 sticky top-24 shadow-xl shadow-purple-500/10 backdrop-blur-sm animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-6 w-1/2"></div>
      <div className="space-y-3">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  ),
})

// Componente wrapper que usa useWallet
function UserStakeDisplayWrapper({ auctionId }: { auctionId: string }) {
  const { useWallet } = require('@/lib/wallet-context')
  const { account } = useWallet()
  
  if (!account) return null
  
  return (
    <UserStakeDisplay 
      auctionId={auctionId}
      userWallet={account.address}
    />
  )
}

export default function AuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const artist = mockArtists.find(a => a.id === id) || mockArtists[0]
  const [bids, setBids] = useState(mockBids)
  const [userBid, setUserBid] = useState<number | null>(null)
  const [reverseAuction, setReverseAuction] = useState<ReverseAuction | null>(null)
  const [auctionRefresh, setAuctionRefresh] = useState(0)

  // Inicializar o recuperar subasta inversa
  useEffect(() => {
    // Crear una subasta inversa demo para este evento
    let auction = reverseAuctionService.getAuction(`auction_${id}`)
    
    if (!auction) {
      auction = reverseAuctionService.createAuction(
        id,
        artist.name,
        250, // Precio inicial
        50   // Precio mínimo
      )
    }
    
    setReverseAuction(auction)

    // Actualizar cada segundo
    const interval = setInterval(() => {
      setAuctionRefresh(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [id, artist.name])

  // Actualizar precio de la subasta
  useEffect(() => {
    if (!reverseAuction) return
    
    const updated = reverseAuctionService.getAuction(reverseAuction.id)
    if (updated) {
      setReverseAuction(updated)
    }
  }, [auctionRefresh, reverseAuction?.id])

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

  const handleStakingSuccess = () => {
    // Actualizar la subasta
    if (reverseAuction) {
      const updated = reverseAuctionService.getAuction(reverseAuction.id)
      if (updated) {
        setReverseAuction(updated)
      }
    }
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
                    <p className="text-2xl font-bold text-foreground">
                      {(bids.length + (reverseAuction?.totalBids || 0))}
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Time Remaining</p>
                    {reverseAuction ? (
                      <AuctionTimer auction={reverseAuction} />
                    ) : (
                      <p className="text-2xl font-bold text-foreground">-</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bidding Section - Reverse Auction */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Reverse Auction Form */}
            <div className="lg:col-span-1">
              {reverseAuction ? (
                <div className="space-y-4">
                  <ReverseAuctionForm 
                    auction={reverseAuction} 
                    onStakingSuccess={handleStakingSuccess}
                  />
                  
                  {/* User Stake Display - se renderiza por el usuario */}
                  <Suspense fallback={null}>
                    <UserStakeDisplayWrapper auctionId={reverseAuction.id} />
                  </Suspense>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 animate-pulse">
                  <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              )}
            </div>

            {/* Auction Info */}
            <div className="lg:col-span-2">
              {/* Dutch Auction Info */}
              <div className="bg-card border border-border rounded-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  🔄 Subasta Inversa Anónima (Dutch Auction)
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    ✓ El precio comienza en <strong className="text-foreground">${reverseAuction?.startPrice.toFixed(2)}</strong> y disminuye hasta <strong className="text-foreground">${reverseAuction?.endPrice.toFixed(2)}</strong>
                  </p>
                  <p>
                    ✓ El precio se reduce automáticamente durante <strong className="text-foreground">10 horas</strong>.
                  </p>
                  <p>
                    ✓ Para pujar, debes <strong className="text-foreground">stakear</strong> al menos el precio actual.
                  </p>
                  <p>
                    ✓ Participantes aparecen como <strong className="text-foreground">direcciones de wallet anónimas</strong> (0x1234...5678).
                  </p>
                  <p>
                    ✓ Los montos pujados son <strong className="text-foreground">completamente privados</strong> - nunca se muestran públicamente.
                  </p>
                  <p>
                    ✓ Total de participantes anónimos: <strong className="text-primary text-lg">{reverseAuction?.totalBids || 0}</strong>
                  </p>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4 text-sm text-foreground">
                <strong>🔐 Anonimidad Garantizada:</strong> Esta es una subasta inversa completamente anónima. Las identidades de los pujadores aparecen como direcciones de wallet enmascaradas. Los montos nunca se muestran. Máxima privacidad garantizada.
              </div>
            </div>
          </div>

          {/* Traditional Auction Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">🔐 Registro Anónimo de Pujas</h2>
            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-sm text-blue-900 dark:text-blue-100">
              <strong>ℹ️ Información Pública Anónima:</strong> Los pujadores aparecen como direcciones de wallet parcialmente enmascaradas. Los montos se muestran como "Privado" para garantizar la máxima anonimidad. El precio más bajo elegido se marca como "Menor Precio Elegido".
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <BidForm onBidSubmit={handleBidSubmit} currentBid={userBid} />
              </div>
              <div className="lg:col-span-2">
                <BidsTable bids={bids} unitsAvailable={unitsAvailable} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
