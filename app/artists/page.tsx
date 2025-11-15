'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '@/components/footer'
import ArtistCard from '@/components/artist-card'
import EventCard from '@/components/event-card'
import { mockArtists } from '@/lib/mock-data'
import { Event } from '@/lib/types'

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
  loading: () => <div className="h-16 bg-gray-100"></div>,
})

export default function ArtistsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        console.log('Iniciando fetch de eventos...')
        const response = await fetch(
          '/api/events',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        )
        console.log('Response status:', response.status)
        console.log('Response headers:', response.headers)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Eventos obtenidos:', data)
        console.log('Total de eventos:', data.length)
        
        // Take only first 6 events
        const firstSix = data.slice(0, 6)
        console.log('Primeros 6 eventos:', firstSix)
        setEvents(firstSix)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(`Error al cargar los eventos: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Featured Artists Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Featured Artists</h1>
            <p className="text-xl text-muted-foreground">
              Discover talented creators and bid on exclusive opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          {/* Featured Events Section */}
          <div className="mb-12 mt-16">
            <h2 className="text-5xl font-bold text-foreground mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground">
              Explora eventos culturales y artísticos exclusivos
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center">
                  No hay eventos disponibles
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
