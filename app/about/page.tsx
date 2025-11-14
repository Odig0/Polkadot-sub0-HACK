'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function About() {
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

            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight text-balance">
              About ArtBid
            </h1>

            <div className="space-y-8">
              <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-700/10">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  ArtBid is reimagining how artists connect with fans and monetize their work. We believe that creators deserve fair compensation, transparent processes, and direct access to their audience. By leveraging blockchain technology on Polkadot and Kusama, we've built a platform that puts artists first.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our uniform-price auction model ensures that both artists and collectors win. Artists get predictable, fair pricing for their work, while collectors participate in transparent auctions without worrying about overpaying.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-700/10">
                <h2 className="text-3xl font-bold text-pink-900 mb-6">Why Blockchain?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Polkadot and Kusama provide the perfect infrastructure for our platform:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex gap-4">
                    <span className="text-pink-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span><strong>Transparency:</strong> Every transaction is recorded on an immutable ledger, ensuring fairness and trust.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-pink-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span><strong>Security:</strong> Blockchain technology protects both artists and collectors from fraud.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-pink-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span><strong>Speed:</strong> Fast, low-cost transactions enable global participation.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-pink-600 font-bold text-xl flex-shrink-0">✓</span>
                    <span><strong>Ownership:</strong> Artists and collectors truly own their digital assets.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/95 backdrop-blur-sm border-2 border-orange-300/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-700/10">
                <h2 className="text-3xl font-bold text-orange-900 mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-orange-700">Artist-First</h3>
                    <p className="text-gray-700">
                      Everything we build is designed with creators in mind. Fair compensation and creative control are non-negotiable.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-pink-700">Transparency</h3>
                    <p className="text-gray-700">
                      No hidden fees, no opaque algorithms. You see exactly what's happening at every step.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-purple-700">Accessibility</h3>
                    <p className="text-gray-700">
                      Whether you're a famous artist or emerging creator, everyone deserves access to a fair marketplace.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-orange-700">Innovation</h3>
                    <p className="text-gray-700">
                      We continuously improve our platform and explore new ways to serve artists and collectors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 border-2 border-purple-300/60 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-purple-900 mb-4">Get Started</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ready to discover amazing artists or showcase your work? Join ArtBid and be part of the future of creator economy.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/artists"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 text-white rounded-full font-bold hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 hover:scale-105"
                  >
                    Explore Artists
                  </Link>
                  <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-700 text-purple-700 rounded-full font-bold hover:border-purple-800 transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
