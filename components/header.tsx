'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import WalletConnect from './wallet-connect'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-300/50 shadow-lg shadow-purple-700/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-500 bg-clip-text text-transparent hidden sm:inline">ArtBid</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/artists" className="text-foreground hover:text-purple-700 transition-colors font-medium">
            Artists
          </Link>
          <Link href="/how-it-works" className="text-foreground hover:text-purple-700 transition-colors font-medium">
            How It Works
          </Link>
          <Link href="/about" className="text-foreground hover:text-purple-700 transition-colors font-medium">
            About
          </Link>
        </nav>

        <div className="hidden md:block">
          <WalletConnect />
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-300/50 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-4">
            <Link href="/artists" className="block text-foreground hover:text-purple-700 transition-colors font-medium">
              Artists
            </Link>
            <Link href="/how-it-works" className="block text-foreground hover:text-purple-700 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/about" className="block text-foreground hover:text-purple-700 transition-colors font-medium">
              About
            </Link>
            <div className="pt-2">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
