'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Lock } from 'lucide-react'
import dynamic from 'next/dynamic'
import Footer from '@/components/footer'

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-100"></div>,
})

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-screen bg-gradient-to-br from-white via-purple-100 to-pink-50 flex items-center justify-center px-4 py-20 overflow-hidden">
          {/* Animated gradient orbs in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-blue-300/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-300/40 to-orange-300/40 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="max-w-5xl w-full relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight text-balance">
                Bid on Your <br />Favorite Artists
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto text-balance font-medium">
                Fair, transparent auctions where everyone pays the same price. Discover digital art, concert tickets, and exclusive creator content on the Polkadot ecosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/artists"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 text-white rounded-full font-bold hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 hover:scale-105 text-lg"
              >
                Explore Artists
                <ArrowRight size={20} />
              </Link>
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-3 border-purple-700 text-purple-700 rounded-full font-bold opacity-50 cursor-not-allowed hover:border-orange-400 transition-colors"
              >
                Create Auction
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-700/10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent mb-8">
                How Uniform-Price Auctions Work
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-transparent border-2 border-purple-300/50 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-700/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-700 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:shadow-lg group-hover:shadow-purple-700/50 transition-all">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-purple-900">Choose an Artist</h3>
                  <p className="text-gray-700">
                    Browse our gallery of talented musicians, visual artists, and digital creators.
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-transparent border-2 border-pink-300/50 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-700/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-orange-400 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:shadow-lg group-hover:shadow-pink-700/50 transition-all">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-pink-900">Place Your Bid</h3>
                  <p className="text-gray-700">
                    Enter your maximum bid. The more you're willing to pay, the better your chances of winning.
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-transparent border-2 border-orange-300/50 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-700/20 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:shadow-lg group-hover:shadow-orange-700/50 transition-all">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Win at Fair Price</h3>
                  <p className="text-gray-700">
                    All winners pay the same clearing price—set by the lowest winning bid. Fair for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4 bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-pink-400/30 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-12 text-center">
              Why Artists Love ArtBid
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white/90 backdrop-blur-sm border-2 border-purple-300/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-purple-700/30 transition-all duration-300 hover:border-purple-500/80 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-700/50 transition-all">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                  Creative Freedom
                </h3>
                <p className="text-gray-700">
                  Set your own terms. Decide how many items to auction and control the bidding process.
                </p>
              </div>
              <div className="group bg-white/90 backdrop-blur-sm border-2 border-pink-300/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-pink-700/30 transition-all duration-300 hover:border-pink-500/80 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-orange-400 rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-pink-700/50 transition-all">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-700 to-orange-600 bg-clip-text text-transparent">
                  Direct Connection
                </h3>
                <p className="text-gray-700">
                  Connect directly with your fans. No middlemen, no hidden fees. Just pure artist-to-fan interaction.
                </p>
              </div>
              <div className="group bg-white/90 backdrop-blur-sm border-2 border-orange-300/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-700/30 transition-all duration-300 hover:border-orange-500/80 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-orange-700/50 transition-all">
                  <Lock className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
                  Blockchain Security
                </h3>
                <p className="text-gray-700">
                  Built on Polkadot and Kusama. Your transactions are secure, transparent, and permanent.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
