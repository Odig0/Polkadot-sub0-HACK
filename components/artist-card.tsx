'use client'

import Link from 'next/link'
import { Artist } from '@/lib/types'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/auction/${artist.id}`}>
      <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-purple-300/50 transition-all duration-300">
          {/* Gradient Avatar Background */}
          <div className="relative h-56 bg-gradient-to-br from-purple-300 via-pink-300 to-orange-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-8xl opacity-30 group-hover:scale-125 transition-transform duration-500 absolute inset-0 flex items-center justify-center">
              {artist.avatar}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="text-white drop-shadow-lg" size={24} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:from-purple-700 group-hover:to-pink-700 transition-all">
              {artist.name}
            </h3>
            <p className="text-sm font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {artist.category}
            </p>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {artist.description}
            </p>

            <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-gradient-to-r from-purple-200 to-pink-200 group-hover:from-purple-100 group-hover:to-pink-100 transition-all">
              <div>
                <p className="text-xs font-semibold text-purple-600">Active Auction</p>
                <p className="font-bold text-purple-900">{artist.activeAuction} items</p>
              </div>
              <div className="text-2xl opacity-40 group-hover:opacity-60 transition-opacity">
                {artist.avatar}
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn">
              View Auction
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
