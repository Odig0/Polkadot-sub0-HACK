'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative min-h-screen bg-gradient-to-br from-white via-purple-100 to-pink-50 px-4 py-20">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-blue-300/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-pink-300/40 to-orange-300/40 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 font-semibold mb-8 transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-12 leading-tight text-balance">
              How It Works
            </h1>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-700/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-purple-900 mb-4">Choose an Artist</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Browse our gallery of talented musicians, visual artists, photographers, and digital creators. Each artist profile shows their work, bio, and current auctions.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>View artist portfolios and past work</li>
                      <li>Check out active and upcoming auctions</li>
                      <li>Learn about each creator's story</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-700/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-400 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-pink-900 mb-4">Place Your Bid</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      Enter your maximum bid amount. Your bid represents the highest price you're willing to pay for that item.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Set your maximum bid price</li>
                      <li>Bid multiple times if you wish</li>
                      <li>Your highest bid is what counts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/95 backdrop-blur-sm border-2 border-orange-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-700/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-orange-900 mb-4">Win at Fair Price</h2>
                    <p className="text-lg text-gray-700 mb-4">
                      All winners pay the same price—the clearing price set by the lowest winning bid. This uniform-price auction mechanism ensures fairness for everyone.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Top bidders win the items</li>
                      <li>All winners pay the clearing price</li>
                      <li>No one pays more than necessary</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why Uniform Price Auctions */}
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-2 border-purple-300/60 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Why Uniform-Price Auctions?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-pink-700">Fair for Everyone</h3>
                    <p className="text-gray-700">
                      No one overpays. All winners pay the lowest winning bid, creating a fair and transparent bidding environment.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-orange-700">Artists Get Paid Fairly</h3>
                    <p className="text-gray-700">
                      Artists receive fair market value for their work. The clearing price ensures sustainable pricing for creator content.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-700">Transparent Process</h3>
                    <p className="text-gray-700">
                      All bids are visible, and the final price is determined algorithmically. No hidden fees or surprises.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-pink-700">Incentivizes Honest Bidding</h3>
                    <p className="text-gray-700">
                      Bidders are encouraged to bid their true maximum value, knowing they'll pay a fair price.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4 justify-center">
              <Link
                href="/artists"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 text-white rounded-full font-bold hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 hover:scale-105"
              >
                Explore Artists
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
