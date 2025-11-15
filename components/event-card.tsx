'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Event } from '@/lib/types'
import { Calendar, MapPin, Ticket } from 'lucide-react'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const startDate = new Date(event.starts_at)
  const formattedDate = startDate.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const imageUrl = event.cover_url

  console.log('EventCard - Event:', event.title, 'Image URL:', imageUrl)

  const proxyImageUrl = imageUrl ? `/api/proxy-image?url=${encodeURIComponent(imageUrl)}` : null

  return (
    <Link href={`/auction/${event.id}`}>
      <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        <div className="relative bg-white rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-purple-300/50 transition-all duration-300">
          {/* Event Image */}
          <div className="relative h-56 bg-gradient-to-br from-purple-300 via-pink-300 to-orange-200 overflow-hidden">
            {proxyImageUrl && !imageError ? (
              <>
                <img
                  src={proxyImageUrl}
                  alt={event.title}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.error(`Failed to load image: ${imageUrl}`)
                    setImageError(true)
                  }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-300 to-orange-200 animate-pulse" />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-300 via-pink-300 to-orange-200 flex items-center justify-center">
                <Ticket className="text-white/50" size={64} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Free/Paid Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {event.is_free ? 'GRATIS' : `$${event.base_ticket_price}`}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:from-purple-700 group-hover:to-pink-700 transition-all line-clamp-2">
              {event.title}
            </h3>
            
            <p className="text-sm font-semibold text-muted-foreground mb-3 line-clamp-1">
              {event.event_name}
            </p>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-600" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-600" />
                <span className="line-clamp-1">{event.event_location_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket size={16} className="text-purple-600" />
                <span>{event.capacity} personas · {event.tickets_sold} vendidas</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
